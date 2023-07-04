import { IsString } from "class-validator";
import moment from "moment-timezone";

import { ISerializable } from "../types/ISerializable";
import { cloneModelObject } from "../helpers/cloneModelObject";
import { unixTimestamp } from "next-shared/src/types/dateTypes";
import {
  checklistCmsTaskFrequencyToMomentFrequency,
  TChecklistCmsTaskFrequency,
} from "../types/TChecklistCmsTaskFrequency";
import { frequencyToMomentUnitAndAmount } from "../helpers/frequencyToMomentUnitAndAmount";
import { matchesMilitaryTime } from "../helpers/time";

export interface ISerializedTimeOfDay {
  title: string;
  slug: string;
  startTime: string;
  endTime: string;
}

export class TimeOfDay implements ISerializable {
  private readonly dynamicFormatRegex: RegExp = new RegExp(
    "^\\s*((OPENING|CLOSING)\\s*([+-]\\s*\\d+)?)\\s*$",
  );
  private readonly staticFormatRegex: RegExp = new RegExp(
    "^\\s*((2[0-3]|[01][0-9])([0-5][0-9]))\\s*$",
  );

  public splitTime(time: string) {
    const trimed = time.trim();
    const components = trimed
      .split(
        new RegExp(
          this.dynamicFormatRegex.source,
          this.dynamicFormatRegex.flags + "g",
        ),
      )
      .filter(
        (value, index, self) =>
          value !== undefined && value !== "" && self.indexOf(value) === index,
      );

    if (components.length === 1) {
      const period = components[0];
      return [period, undefined, undefined];
    } else {
      const filtered = components.filter((value) => value !== trimed);
      const period = filtered[0];
      const operator = filtered[1].charAt(0);
      const minutes = filtered[1].replace(operator, "").trim();
      return [period, operator, minutes];
    }
  }

  @IsString()
  public title: string;

  @IsString()
  public slug: string;

  @IsString()
  public startTime: string;

  @IsString()
  public endTime: string;

  public static unserialize(timeOfDay: ISerializedTimeOfDay): TimeOfDay {
    const newTimeOfDay = new TimeOfDay();

    newTimeOfDay.title = timeOfDay.title;
    newTimeOfDay.slug = timeOfDay.slug;
    newTimeOfDay.startTime = timeOfDay.startTime;
    newTimeOfDay.endTime = timeOfDay.endTime;

    return newTimeOfDay;
  }

  public serialize() {
    return {
      title: this.title,
      slug: this.slug,
      startTime: this.startTime,
      endTime: this.endTime,
    };
  }

  public filterSensitiveData() {
    return cloneModelObject(this);
  }

  /**
   * Adds the given checklist frequency amount to the given unix timestamp
   */
  public static calcFrequencyAddition(
    frequency: TChecklistCmsTaskFrequency,
    timestamp: unixTimestamp,
    timezoneId: string,
  ): unixTimestamp {
    // get the moment frequency from the given checklist frequency
    const momentFrequency =
      checklistCmsTaskFrequencyToMomentFrequency.get(frequency);

    // find the amount to add based on the frequency
    const { amount, unit } = frequencyToMomentUnitAndAmount(momentFrequency);

    // find the next date based on the given timezone
    const nextDate = moment.unix(timestamp).tz(timezoneId).add(amount, unit);

    // return as a unix timestamp
    return nextDate.unix();
  }

  // uses dynamic difference based on a reg ex of exmaple OPENING + 60, requires an opening and closing moment obj
  public static calcDynamicMinutesDifference(
    opening: unixTimestamp,
    closing: unixTimestamp,
    period: string,
    operator: string = "+",
    minutes: string = "0",
  ): unixTimestamp {
    switch (true) {
      case period === "OPENING" && operator === "+":
        return moment.unix(opening).add(minutes, "m").unix();
      case period === "OPENING" && operator === "-":
        return moment.unix(opening).subtract(minutes, "m").unix();
      case period === "CLOSING" && operator === "+":
        return moment.unix(closing).add(minutes, "m").unix();
      case period === "CLOSING" && operator === "-":
        return moment.unix(closing).subtract(minutes, "m").unix();
      default:
        throw new Error("Unable to compute time");
    }
  }

  // uses static difference based on military format, ie 0930, uses date obj to set date
  public static calcStaticTime(
    timestamp: unixTimestamp,
    militaryTime: string,
    timezoneId: string,
  ): unixTimestamp {
    const hours = militaryTime.substring(0, 2);
    const minutes = militaryTime.substring(2, 4);

    if (!matchesMilitaryTime(militaryTime)) {
      throw new Error(
        `calculateStaticMinuteDifference requires military time (i.e 0900) - ${militaryTime} passed`,
      );
    }

    let staticMomentDate = moment
      .tz(moment.unix(timestamp), timezoneId)
      .hours(parseInt(hours))
      .minutes(parseInt(minutes))
      .seconds(0);

    const staticTimestamp = staticMomentDate.unix();

    if (staticTimestamp < timestamp) {
      staticMomentDate = staticMomentDate.add(1, "d");
    }

    return staticMomentDate.unix();
  }

  public getStartEndTimeDates(
    opening: unixTimestamp, // the stores opening time this sets the end paramter for the dynamic time
    closing: unixTimestamp, // the stores closing time this sets the ending paramater for the dynamic time
    timezoneId: string,
  ): { startTime: unixTimestamp; endTime: unixTimestamp } {
    let startTime;
    let endTime;

    // gets start time
    if (this.dynamicFormatRegex.test(this.startTime)) {
      const [period, operator, minutes] = this.splitTime(this.startTime);
      startTime = TimeOfDay.calcDynamicMinutesDifference(
        opening,
        closing,
        period,
        operator,
        minutes,
      );
    } else if (this.staticFormatRegex.test(this.startTime)) {
      startTime = TimeOfDay.calcStaticTime(opening, this.startTime, timezoneId);
    } else {
      throw new Error(
        `${this.startTime} does not meet any time pattern, should be military or OPENING + 60 format`,
      );
    }

    // gets end time
    if (this.dynamicFormatRegex.test(this.endTime)) {
      const [period, operator, minutes] = this.splitTime(this.endTime);
      endTime = TimeOfDay.calcDynamicMinutesDifference(
        opening,
        closing,
        period,
        operator,
        minutes,
      );
    } else if (this.staticFormatRegex.test(this.endTime)) {
      endTime = TimeOfDay.calcStaticTime(opening, this.endTime, timezoneId);
    } else {
      throw new Error(
        `${this.endTime} does not meet any time pattern, should be military or OPENING + 60 format`,
      );
    }

    return {
      startTime,
      endTime,
    };
  }
}
