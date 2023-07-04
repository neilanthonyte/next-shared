import {
  IsArray,
  IsInstance,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  validate,
} from "class-validator";
import moment from "moment-timezone";

import { unixTimestamp } from "next-shared/src/types/dateTypes";

import { ISerializable } from "../types/ISerializable";
import { cloneModelObject } from "../helpers/cloneModelObject";
import { ValidationError } from "../helpers/errorTypes";
import { ISerializedTimeOfDay, TimeOfDay } from "./TimeOfDay";
import { ILocationFeatures } from "../types/ILocationFeatures";
import { IRelatedArticle } from "../types/IRelatedArticle";
import { IBaseTaskType } from "../types/IBaseTaskType";
import { ChecklistTask } from "./ChecklistTask";
import { NextLocation } from "./NextLocation";
import {
  IChecklistCmsTaskFrequency,
  TChecklistCmsTaskFrequency,
} from "../types/TChecklistCmsTaskFrequency";
import { IChecklistCmsTaskCategory } from "../types/IChecklistCmsTaskCategory";

export interface ISerializedChecklistCMSTask {
  title: string;
  weight: number;
  id: string;
  type: IBaseTaskType;
  relatedArticle: IRelatedArticle;
  locationFeatures: ILocationFeatures[];
  timeOfDay: ISerializedTimeOfDay;
  frequency: IChecklistCmsTaskFrequency;
  category: IChecklistCmsTaskCategory;
  minValue: number | null;
  maxValue: number | null;
}

export class ChecklistCMSTask implements ISerializable {
  @IsString()
  @IsNotEmpty()
  public id: string;

  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public type: IBaseTaskType;

  @IsOptional()
  public relatedArticle: { title: string; slug: string; anchor?: string };

  @IsInstance(TimeOfDay)
  @IsNotEmpty()
  public timeOfDay: TimeOfDay;

  @IsArray()
  @IsNotEmpty()
  locationFeatures: ILocationFeatures[];

  @IsNotEmpty()
  public frequency: IChecklistCmsTaskFrequency;

  @IsNotEmpty()
  public category: IChecklistCmsTaskCategory;

  @IsNumber()
  @IsOptional()
  public minValue: number | null;

  @IsNumber()
  @IsOptional()
  public maxValue: number | null;

  @IsNumber()
  @IsNotEmpty()
  public weight: number;

  public static unserialize(
    checklistCMSTask: ISerializedChecklistCMSTask,
  ): ChecklistCMSTask {
    const newChecklistCmsTask = new ChecklistCMSTask();

    newChecklistCmsTask.id = checklistCMSTask.id;
    newChecklistCmsTask.title = checklistCMSTask.title;
    newChecklistCmsTask.weight = checklistCMSTask.weight;
    newChecklistCmsTask.type = checklistCMSTask.type;
    newChecklistCmsTask.relatedArticle = checklistCMSTask.relatedArticle;
    newChecklistCmsTask.locationFeatures = checklistCMSTask.locationFeatures;
    newChecklistCmsTask.timeOfDay = TimeOfDay.unserialize(
      checklistCMSTask.timeOfDay,
    );
    newChecklistCmsTask.frequency = checklistCMSTask.frequency;
    newChecklistCmsTask.category = checklistCMSTask.category;
    newChecklistCmsTask.minValue = checklistCMSTask.minValue;
    newChecklistCmsTask.maxValue = checklistCMSTask.maxValue;

    return newChecklistCmsTask;
  }

  public serialize(): ISerializedChecklistCMSTask {
    return {
      id: this.id,
      title: this.title,
      type: this.type,
      relatedArticle: this.relatedArticle,
      locationFeatures: this.locationFeatures,
      timeOfDay: this.timeOfDay,
      frequency: this.frequency,
      category: this.category,
      minValue: this.minValue,
      maxValue: this.maxValue,
      weight: this.weight,
    };
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

  public isRestrictedByLocationFeatures(): boolean {
    return (
      Array.isArray(this.locationFeatures) && this.locationFeatures.length > 0
    );
  }

  /**
   * A CMS task is valid for features when all of them belong to the given
   * location set
   */
  public hasLocationFeatures(locationFeatureSlugs: string[]): boolean {
    if (
      !Array.isArray(this.locationFeatures) ||
      !Array.isArray(locationFeatureSlugs)
    ) {
      return false;
    }

    const taskLocationFeatureSlugs = this.locationFeatures.map(
      (taskLocationFeatures: ILocationFeatures) => taskLocationFeatures.slug,
    );

    return taskLocationFeatureSlugs.some((taskLocationFeatureSlug: string) =>
      locationFeatureSlugs.includes(taskLocationFeatureSlug),
    );
  }

  /**
   * Based on the cms task data, create a new checklist task model
   */
  public convertToChecklistTask = (
    location: NextLocation,
    timestamp: unixTimestamp,
  ): ChecklistTask => {
    const {
      timezone: { timeZoneId },
    } = location;

    const {
      frequency: { slug },
    } = this;

    const checklistTask = new ChecklistTask();

    const operationalDay = location.getOperationalDay(timestamp);

    // just in case we are given a closed day by accident we don't build the
    // task
    if (operationalDay === null) {
      return null;
    }

    // need to find the start and end times for this task based on the operational hours on the given day
    const { openingTime: openingTimestamp, closingTime: closingTimestamp } =
      location.getOpeningTimesForDate(timestamp);

    const dates = this.timeOfDay.getStartEndTimeDates(
      openingTimestamp,
      closingTimestamp,
      timeZoneId,
    );
    const { startTime } = dates;
    let { endTime } = dates;

    // TODO: need to reinstate this once we can set a rollover period for a
    //  location. Otherwise if times goes over or under default rollover the
    //  task won't be created
    // if (slug === TChecklistCmsTaskFrequency.Daily) {
    //   const startTimeOperationalDay = location.getOperationalDay(startTime);
    //   if (startTimeOperationalDay !== operationalDay) {
    //     console.warn(
    //       `${locationName} - task start time does not land on the same operational day for CMS task: ${id} / ${title}`
    //     );
    //     return null;
    //   }
    //   const endTimeOperationalDay = location.getOperationalDay(endTime);
    //   if (endTimeOperationalDay !== operationalDay) {
    //     console.warn(
    //       `${locationName} - task end time does not land on the same operational day for CMS task: ${id} / ${title}`
    //     );
    //     return null;
    //   }
    // }

    if (slug !== TChecklistCmsTaskFrequency.Daily) {
      // set the end time range based on the frequency for non-daily tasks
      endTime = TimeOfDay.calcFrequencyAddition(
        slug,
        closingTimestamp,
        timeZoneId,
      );

      // the problem is that the end time might not land on an operational day so how can it be due then so we try the next operational day
      let endOperationalDay = location.getOperationalDay(endTime);
      while (endOperationalDay === null) {
        endTime = moment.unix(endTime).tz(timeZoneId).add(1, "d").unix();
        endOperationalDay = location.getOperationalDay(endTime);
      }

      // update the end time base on an actual operating day
      const {
        openingTime: nonDailyOpeningTimestamp,
        closingTime: nonDailyClosingTimestamp,
      } = location.getOpeningTimesForDate(endTime);

      const { endTime: endOperationalTime } =
        this.timeOfDay.getStartEndTimeDates(
          nonDailyOpeningTimestamp,
          nonDailyClosingTimestamp,
          timeZoneId,
        );

      endTime = endOperationalTime;
    }

    checklistTask.cmsTaskId = this.id;
    checklistTask.cmsTask = this;
    checklistTask.title = this.title;
    checklistTask.type = this.type;
    checklistTask.locationId = location.id;
    checklistTask.weight = this.weight;
    checklistTask.dueDate = endTime;
    checklistTask.startDate = startTime;
    checklistTask.date = operationalDay;

    return checklistTask;
  };
}
