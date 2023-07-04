import moment from "moment";
import * as _ from "lodash";
import {
  IsInstance,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  validate,
  ValidateNested,
} from "class-validator";

import { cloneModelObject } from "../helpers/cloneModelObject";
import { ValidationError } from "../helpers/errorTypes";
import { ISODate, unixTimestamp } from "next-shared/src/types/dateTypes";
import {
  ChecklistCMSTask,
  ISerializedChecklistCMSTask,
} from "./ChecklistCMSTask";
import { BaseTask, ISerializedBaseTask } from "./BaseTask";
import { ISerializable } from "../types/ISerializable";
import { NextLocation } from "./NextLocation";
import { currentUnixTimestamp } from "../helpers/currentUnixTimestamp";

export interface ISerializedChecklistTask extends ISerializedBaseTask {
  id: number;
  cmsTaskId: string;
  cmsTask: ISerializedChecklistCMSTask;
  comment: string | null;
  locationId: string;
  weight: number;
  date: string;
  startDate: number;
  updatedAt: unixTimestamp;
  createdAt: unixTimestamp;
}

export class ChecklistTask extends BaseTask implements ISerializable {
  @IsInt()
  @IsNotEmpty()
  public id: number;

  @IsString()
  @IsNotEmpty()
  public cmsTaskId: string;

  @IsInstance(ChecklistCMSTask)
  @IsNotEmpty()
  @ValidateNested()
  public cmsTask: ChecklistCMSTask;

  @IsString()
  @IsOptional()
  public comment: string;

  @IsString()
  @IsNotEmpty()
  public locationId: string;

  @IsString()
  @IsNotEmpty()
  public date: ISODate;

  @IsNumber()
  @IsNotEmpty()
  public weight: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  public startDate: unixTimestamp;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  public updatedAt: unixTimestamp;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  public createdAt: unixTimestamp;

  /**
   * Returns a human readable label stating when the task is due.
   */
  public getDueLabel(): string {
    if (this.cmsTask.frequency.slug === "daily") {
      return `${this.cmsTask.timeOfDay.title} - due at ${moment
        .unix(this.dueDate)
        .format("h:mm a")}`;
    }
    const d1 = moment.unix(this.dueDate);
    const d2 = moment();
    if (d1.diff(d2) < 0) {
      const label = moment.duration(d2.diff(d1)).humanize();
      return `Overdue by ${label}`;
    }
    const label = moment.duration(d1.diff(d2)).humanize();
    return `Due in ${label}`;
  }

  /**
   * Common check.
   */
  public isDailyTask(): boolean {
    return !!(
      this.cmsTask.frequency && this.cmsTask.frequency.slug === "daily"
    );
  }

  public static unserialize(task: ISerializedChecklistTask): ChecklistTask {
    const newTask = new ChecklistTask();

    newTask.id = task.id;
    newTask.cmsTaskId = task.cmsTaskId;
    newTask.cmsTask = ChecklistCMSTask.unserialize(task.cmsTask);
    newTask.title = task.title;
    newTask.type = task.type;
    newTask.completed = task.completed;
    newTask.value = task.value;
    newTask.comment = task.comment;
    newTask.imageKey = task.imageKey;
    newTask.imageTmpUrl = task.imageTmpUrl;
    newTask.locationId = task.locationId;
    newTask.weight = task.weight;
    newTask.dueDate = task.dueDate;
    newTask.date = task.date;
    newTask.startDate = task.startDate;
    newTask.wasLate = task.wasLate;
    newTask.completedAt = task.completedAt;
    newTask.createdAt = task.createdAt;
    newTask.updatedAt = task.updatedAt;
    let colorCue = _.get(newTask, "cmsTask.category.style");
    if (colorCue) {
      colorCue = _.kebabCase(colorCue);
    }
    newTask.colorCue = colorCue;
    newTask.iconOverride = task.iconOverride;
    newTask.highlight = task.highlight;

    return newTask;
  }

  public serialize(): ISerializedChecklistTask {
    return {
      id: this.id,
      cmsTaskId: this.cmsTaskId,
      cmsTask: this.cmsTask.serialize(),
      title: this.title,
      type: this.type,
      date: this.date,
      completed: this.completed,
      value: this.value,
      comment: this.comment,
      imageKey: this.imageKey,
      imageTmpUrl: this.imageTmpUrl,
      locationId: this.locationId,
      weight: this.weight,
      dueDate: this.dueDate,
      startDate: this.startDate,
      wasLate: this.wasLate,
      updatedAt: this.updatedAt,
      createdAt: this.createdAt,
      completedAt: this.completedAt,
      colorCue: this.colorCue,
      iconOverride: this.iconOverride,
      highlight: this.highlight,
    };
  }

  public get validValue(): boolean {
    let { value } = this;

    const {
      type,
      cmsTask: { minValue, maxValue },
    } = this;

    // TODO:: numeric values are never converted to the proper type
    //  before they reach the client. need to fix this
    if (type === "numeric") {
      value = parseFloat(value as string);
    }

    if (typeof value !== "number") {
      return true;
    }

    return !(
      (minValue !== null && value < minValue) ||
      (maxValue !== null && value > maxValue)
    );
  }

  public clone(): ChecklistTask {
    return cloneModelObject(this);
  }

  public async validate() {
    const isInvalid = await validate(this, {
      validationError: { target: false },
    });
    if (isInvalid.length > 0) {
      throw new ValidationError(isInvalid);
    }
  }

  public filterSensitiveData(): this {
    return cloneModelObject(this);
  }

  public doesMatchFrequency(freq: string): boolean {
    return this.cmsTask.frequency.slug === freq;
  }

  public isOutstanding(): boolean {
    return this.completed === null;
  }

  /**
   * A checklist task is due today if the operational day for this point in time is the same as the operational day for the time the task is due
   */
  public dueToday(location: NextLocation): boolean {
    const currentOperationalDay = location.getOperationalDay(
      currentUnixTimestamp(),
    );
    const dueOperationalDay = location.getOperationalDay(this.dueDate);
    return currentOperationalDay === dueOperationalDay;
  }

  public setValue(value: any): void {
    super.setValue(value);

    // override some default behaviours
    switch (this.type) {
      case "numeric":
        {
          const numValue = parseFloat(value);
          const { minValue, maxValue } = this.cmsTask;

          if (minValue !== null && numValue <= minValue) {
            this.completed = false;
          }
          if (maxValue !== null && numValue >= maxValue) {
            this.completed = false;
          }
        }
        break;
    }
  }
}
