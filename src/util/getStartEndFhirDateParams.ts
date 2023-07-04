import { unixTimestamp } from "../types/dateTypes";
import { isValidISODate } from "./isValidISODate";
import { endOfDayISOToUnixTimestamp } from "./endOfDayISOToUnixTimestamp";
import { startOfDayISOToUnixTimestamp } from "./startOfDayISOToUnixTimestamp";

export function getStartEndFhirDateParams(date: string | string[]): {
  startAfter: unixTimestamp;
  startBefore: unixTimestamp;
} {
  // parse start & end times
  let startAfter: undefined | unixTimestamp = undefined;
  let startBefore: undefined | unixTimestamp = undefined;

  if (date && !Array.isArray(date)) {
    date = [date];
  }
  if (date) {
    (date as string[]).forEach((aDate) => {
      const isoDateString = aDate.substring(2);
      if (!isValidISODate(isoDateString)) {
        throw new Error("Invalid format for date");
      }
      // Treat date search params as 'all-day' (start from midnight, end a second before midnight)
      if (aDate.startsWith("gt")) {
        startAfter = startOfDayISOToUnixTimestamp(isoDateString);
      } else if (aDate.startsWith("ge")) {
        startAfter = startOfDayISOToUnixTimestamp(isoDateString);
      } else if (aDate.startsWith("le")) {
        startBefore = endOfDayISOToUnixTimestamp(isoDateString);
      } else if (aDate.startsWith("lt")) {
        startBefore = endOfDayISOToUnixTimestamp(isoDateString);
      }
    });
  }
  return { startAfter, startBefore };
}
