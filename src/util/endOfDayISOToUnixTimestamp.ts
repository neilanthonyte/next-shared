import { unixTimestamp } from "../types/dateTypes";
import { startOfDayISOToUnixTimestamp } from "./startOfDayISOToUnixTimestamp";

/**
 * Returns the timestamp for the end of a given day, provided in ISO 8601 format, as a unix timestamp.
 *
 * NOTE: this will use server timezone offset to specify the return date, if the passed in date has no
 * specified offset (or UTC 'Z' indicator)
 *
 * @param isoDate
 * @return unixTimeStamp
 */
export function endOfDayISOToUnixTimestamp(isoDate: string): unixTimestamp {
  const secondBeforeMidnight = 86399;
  return startOfDayISOToUnixTimestamp(isoDate) + secondBeforeMidnight;
}
