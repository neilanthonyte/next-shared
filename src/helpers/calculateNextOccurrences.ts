import moment from "moment-timezone";
import {
  IReoccurringTimeMonthDay,
  IReoccurringTimeYearDay,
  IReoccurringTimeWeekDay,
} from "../types/IReoccurringTime";

import { currentUnixTimestamp } from "../helpers/currentUnixTimestamp";
import { unixTimestamp } from "next-shared/src/types/dateTypes";
import { IActionOccurrence } from "../types/IPatientActionOccurrence";
import { BadRequestError } from "./errorTypes";
import { isValidTimezone } from "./isValidTimezone";

/**
 * Takes in a list of occurrence definitions, and return the next set of unix timestamps
 * that will be generated from the occurrences definitions
 */
export const calculateNextOccurrences = (
  occurrences: IActionOccurrence[],
  timezone: string,
  from?: unixTimestamp,
): unixTimestamp[] => {
  let nextOccurrences: unixTimestamp[] = [];
  occurrences.forEach((occ) => {
    switch (occ.type) {
      case "single":
        // HACK single are always due - by doing this, we avoid the edge case of when an action is created for "now"
        if (occ.time > from) {
          nextOccurrences.push(occ.time);
        }
        break;
      case "week":
        nextOccurrences = nextOccurrences.concat(
          calculateNextWeekDayOccurrences(occ, timezone, from),
        );
        break;
      case "month":
        nextOccurrences = nextOccurrences.concat(
          calculateNextMonthDayOccurrences(occ, timezone, from),
        );
        break;
      case "year":
        nextOccurrences = nextOccurrences.concat(
          calculateNextYearDayOccurrences(occ, timezone, from),
        );
        break;
      default:
        throw new Error(`reoccurringTime '${(occ as any).type}' is not valid`);
    }
  });
  return nextOccurrences;
};

export const calculateNextWeekDayOccurrences = (
  reoccurringTime: IReoccurringTimeWeekDay,
  timezone: string,
  from?: unixTimestamp,
): unixTimestamp[] => {
  if (!isValidTimezone(timezone)) {
    throw new BadRequestError(
      "Missing time zone information. Unable to calculate week day occurrences",
      {
        reoccurringTime,
        timezone,
        from,
      },
    );
  }
  from = from || currentUnixTimestamp();
  const occurrences: unixTimestamp[] = [];
  reoccurringTime.weekdays.forEach((day) => {
    reoccurringTime.timeOfDay.forEach((timeSlot) => {
      const time = moment.unix(from).tz(timezone);

      time.day(day);
      time.hour(timeSlot.hour);
      time.minute(timeSlot.minute);
      time.second(0);
      // its possible we have gone back in time (notification day could be tuesday but it is currently wednesday)
      if (time.unix() <= from) {
        time.add(1, "week");
      }
      occurrences.push(time.unix());
    });
  });
  return occurrences;
};

export const calculateNextMonthDayOccurrences = (
  reoccurringTime: IReoccurringTimeMonthDay,
  timezone: string,
  from?: unixTimestamp,
): unixTimestamp[] => {
  if (!isValidTimezone(timezone)) {
    throw new BadRequestError(
      "Missing time zone information. Unable to calculate month day occurrences",
      {
        reoccurringTime,
        timezone,
        from,
      },
    );
  }
  from = from || currentUnixTimestamp();
  const occurrences: unixTimestamp[] = [];
  reoccurringTime.days.forEach((day) => {
    reoccurringTime.timeOfDay.forEach((timeSlot) => {
      // TODO: handle custom patient timezones
      const time = moment.unix(from).tz(timezone);
      time.date(day);
      time.hour(timeSlot.hour);
      time.minute(timeSlot.minute);
      time.second(0);
      // its possible we have gone back in time
      if (time.unix() <= from) {
        time.add(1, "month");
      }
      occurrences.push(time.unix());
    });
  });
  return occurrences;
};

/**
 * Calculate the next annual occurrence
 */
export const calculateNextYearDayOccurrences = (
  reoccurringTime: IReoccurringTimeYearDay,
  timezone: string,
  from?: unixTimestamp,
): unixTimestamp[] => {
  if (!isValidTimezone(timezone)) {
    throw new BadRequestError(
      "Missing time zone information. Unable to calculate year day occurrences",
      {
        reoccurringTime,
        timezone,
        from,
      },
    );
  }
  from = from || currentUnixTimestamp();
  const occurrences: unixTimestamp[] = [];
  reoccurringTime.months.forEach((month) => {
    reoccurringTime.days.forEach((day) => {
      reoccurringTime.timeOfDay.forEach((timeSlot) => {
        // TODO: handle custom patient timezones
        const time = moment.unix(from).tz(timezone);
        time.month(month - 1); // moment uses 0-indexed months
        time.date(day);
        time.hour(timeSlot.hour);
        time.minute(timeSlot.minute);
        time.second(0);
        // its possible we have gone back in time
        if (time.unix() <= from) {
          time.add(1, "year");
        }
        occurrences.push(time.unix());
      });
    });
  });
  return occurrences;
};
