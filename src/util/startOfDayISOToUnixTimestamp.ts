import { unixTimestamp } from "../types/dateTypes";
import {
  isoDateToUnixTimestamp,
  jsDateToODBCString,
} from "./datetimeConversion";
import { isValidISODate } from "./isValidISODate";

/**
 * Returns the timestamp for the start of a given day, provided in ISO 8601 format, as a unix timestamp.
 *
 * NOTE: this will use server timezone offset to specify the return date, if the passed in date has no
 * specified offset (or UTC 'Z' indicator)
 *
 * @param isoDate
 * @return unixTimeStamp
 */
export function startOfDayISOToUnixTimestamp(
  isoDate: string,
): unixTimestamp | null {
  if (!isValidISODate(isoDate)) {
    return null;
  }
  const date = new Date(isoDate);
  const odbcDateString = jsDateToODBCString(date);

  // initialise offset as an empty string (will use server/local timezone offset)
  let timezoneOffset = "";
  // if last char is Z, it's a UTC timestamp
  if (isoDate.slice(-1) === "Z") {
    timezoneOffset = "Z";
  }
  // magic: if there's a '+' in the string, assume it's a positive offset
  else if (isoDate.includes("+")) {
    timezoneOffset = isoDate.substring(isoDate.lastIndexOf("+"));
  }
  // more magic: if there's a '-' after the 10th char (yyyy-mm-dd date portion), assume
  // it's a negative offset
  else if (isoDate.lastIndexOf("-") > 9) {
    timezoneOffset = isoDate.substring(isoDate.lastIndexOf("-"));
  }
  return isoDateToUnixTimestamp(`${odbcDateString}T00:00:00${timezoneOffset}`);
}
