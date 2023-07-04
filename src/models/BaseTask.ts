import {
  IsBoolean,
  IsString,
  IsNumber,
  IsOptional,
  IsNotEmpty,
  IsPositive,
} from "class-validator";

import { IBaseTaskType } from "../types/IBaseTaskType";
import { IRelatedArticle } from "../types/IRelatedArticle";
import { unixTimestamp } from "next-shared/src/types/dateTypes";
import { cloneModelObject } from "../helpers/cloneModelObject";
import { currentUnixTimestamp } from "../helpers/currentUnixTimestamp";

export interface ISerializedBaseTask {
  id?: number;
  title: string;
  type: IBaseTaskType;
  dueDate: number;
  relatedArticle?: IRelatedArticle;
  completed?: boolean | null;
  completedAt?: unixTimestamp | null;
  value?: string | number | boolean;
  imageKey?: string | null;
  imageTmpUrl?: string;
  colorCue?: string;
  wasLate?: boolean;
  /** Used to override the icon used in the task component checkbox */
  iconOverride?: string;
  /** Whether to highlight a task in the view as important. The completion
   *  state will determine the color used.
   *    - warning if incomplete
   *    - success if complete and successful
   *    - danger if  complete and unsuccessful
   */
  highlight?: boolean;
}

export class BaseTask {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public type: IBaseTaskType;

  @IsOptional()
  public relatedArticle: IRelatedArticle;

  @IsNumber()
  @IsNotEmpty()
  public dueDate: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  public completedAt: number | null;

  @IsBoolean()
  @IsNotEmpty()
  public completed: boolean | null;

  // TODO: make sure value is one of the given type
  //  need to make this conditional
  @IsOptional()
  public value: string | number | boolean;

  @IsString()
  @IsOptional()
  public imageKey: string | null;

  @IsString()
  @IsOptional()
  public imageTmpUrl?: string;

  @IsBoolean()
  @IsNotEmpty()
  public wasLate: boolean;

  @IsString()
  @IsOptional()
  public colorCue: string;

  @IsString()
  @IsOptional()
  public iconOverride: string = null;

  @IsBoolean()
  @IsOptional()
  public highlight: boolean = false;

  public isOverdue(): boolean {
    return !this.completed && currentUnixTimestamp() > this.dueDate;
  }

  public setValue(v: any) {
    if (v === null) {
      // clearing the input
      this.completedAt = null;
      this.wasLate = null;
    } else {
      this.completedAt = currentUnixTimestamp();
      this.wasLate = this.dueDate < currentUnixTimestamp();
    }

    switch (this.type) {
      case "boolean":
        this.completed =
          (typeof v === "boolean" && v === true) ||
          (typeof v === "string" && v === "true");
        this.value = v;
        break;
      case "numeric":
      case "temperature":
        this.value = v;
        this.completed = true;
        break;
      case "image":
        this.imageKey = v;
        this.completed = true;
        break;
    }
  }

  public resetValue() {
    this.completedAt = null;
    this.wasLate = null;
    this.completedAt = null;
    this.value = null;
    this.imageKey = null;
  }

  public clone(): BaseTask {
    return cloneModelObject(this);
  }

  public static unserialize(task: ISerializedBaseTask): BaseTask {
    const newTask = new BaseTask();
    newTask.title = task.title;
    newTask.type = task.type;
    newTask.dueDate = task.dueDate;
    newTask.completed = task.completed;
    newTask.completedAt = task.completedAt;
    newTask.relatedArticle = task.relatedArticle;
    newTask.value = task.value;
    newTask.imageKey = task.imageKey;
    newTask.imageTmpUrl = task.imageTmpUrl;
    newTask.wasLate = task.wasLate;
    newTask.colorCue = task.colorCue;
    newTask.iconOverride = task.iconOverride;
    newTask.highlight = task.highlight;
    return newTask;
  }

  public serialize(): ISerializedBaseTask {
    return {
      title: this.title,
      type: this.type,
      dueDate: this.dueDate,
      completed: this.completed,
      relatedArticle: this.relatedArticle,
      value: this.value,
      imageKey: this.imageKey,
      imageTmpUrl: this.imageTmpUrl,
      wasLate: this.wasLate,
      completedAt: this.completedAt,
      colorCue: this.colorCue,
      iconOverride: this.iconOverride,
      highlight: this.highlight,
    };
  }
}
