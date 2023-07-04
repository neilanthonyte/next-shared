import moment from "moment";
import { unixTimestamp } from "next-shared/src/types/dateTypes";

export type TDaysInWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

/**
 * Generates an array of dates within a given range.
 *
 * @param start unix timestamp of the start date.
 * @param end unix timestamp of the end date.

 * const start = moment("2019-02-01").unix();
 * const end = moment("2019-02-10").unix();
 * const dateArray = getArrayFromDateRange(start, end);
 * dateArray === [
 *  "2019-02-01",
 *  "2019-02-02",
 *  "2019-02-03",
 *  "2019-02-04",
 *  "2019-02-05",
 *  "2019-02-06",
 *  "2019-02-07",
 *  "2019-02-08",
 *  "2019-02-09",
 *  "2019-02-10",
 * ]
 */
export const getArrayFromDateRange = (
  start: unixTimestamp,
  end: unixTimestamp,
  returnFormat: string,
  /** Days to filter out from date range, e.g. all fridays. */
  daysToFilterOut?: any,
): string[] => {
  const startMoment = moment.unix(start);
  const amountOfDays = moment.unix(end).diff(startMoment, "days");
  const daysAvail = [startMoment.format(returnFormat)];
  let lastSetDay = startMoment;
  for (let i = 0; i < amountOfDays; i += 1) {
    lastSetDay = lastSetDay.add(1, "day");
    if (
      daysToFilterOut &&
      daysToFilterOut.includes(lastSetDay.format("dddd") as TDaysInWeek)
    ) {
      continue;
    }
    daysAvail.push(lastSetDay.format(returnFormat));
  }
  return daysAvail;
};
