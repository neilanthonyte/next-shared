import { currentUnixTimestamp } from "../helpers/currentUnixTimestamp";
import { unixTimestamp } from "../types/dateTypes";

// These are some basic Unix epoch and JavaScript Date object functions for converting timestamps.
// These are intended to be used in place of Moment, which is in end-of-life/legacy mode (and has a
// large overhead): https://momentjs.com/docs/#/-project-status/

const secondsInADay = 86400;

/**
 * takes JavaScript epoch timestamp (milliseconds since 1970-01-01T00:00 UTC), returns
 * Unix epoch timestamp (seconds since same)
 * @param jsTimestamp
 * @returns unixTimestamp | null
 */
export function jsTimestampToUnixTimestamp(
  jsTimestamp: number,
): unixTimestamp | null {
  return Number.isInteger(jsTimestamp) ? Math.floor(jsTimestamp / 1000) : null;
}

/**
 * takes Unix epoch timestamp (seconds since 1970-01-01T00:00 UTC), returns JavaScript epoch
 * timestamp (milliseconds since same)
 * @param unixTimestamp
 * @returns number | null
 */
export function unixTimestampToJSTimestamp(
  unixTimestamp: number,
): number | null {
  return Number.isInteger(unixTimestamp) ? unixTimestamp * 1000 : null;
}

/**
 * Takes Postgres timestamptz extension on SQL standard timestamp as string, e.g. '2019-10-11 14:11:24-05', returns
 * Unix epoch timestamp (seconds since 1970-01-01T00:00 UTC)
 *
 * NOTE: this uses Date.parse(), which is not recommended for front-end/browser use due to historic implementation discrepancies:
 * (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse)
 * This is considered safe for back-end Node use (where it is intended to parse Postgres timestamptz extension data types).
 *
 * @param timestampTZ
 * @returns unixTimestamp | null
 */
export function timestampTZToUnixTimestamp(
  timestampTZ: string,
): unixTimestamp | null {
  const jsTimestamp = Date.parse(timestampTZ);
  return Number.isNaN(jsTimestamp)
    ? null
    : jsTimestampToUnixTimestamp(jsTimestamp);
}

/**
 * Takes different ISO 8601 date string formats (e.g. '2020-04-20T11:25:00+10:00' or '2021-11-09T16:11:24.000Z') and returns a unix timestamp.
 * Note this is a wrapper for the timestampTZToUnixTimestamp function, which handles a variety of string-based date formats based on Date.parse;
 * due to this, however, the same proviso applies re front- vs back-end use (see historic browser implementation discrepancies note above).
 * Wrapping solely to have a function with a name specific to the use case (so the 'timestampTZ' aspect does not cause confusion).
 *
 * @param isoDate
 * @returns unixTimestamp | null
 */
export function isoDateToUnixTimestamp(isoDate: string): unixTimestamp | null {
  return timestampTZToUnixTimestamp(isoDate);
}

/**
 * Takes a Unix epoch timestamp, and returns an ISO 8601 UTC 'Zulu' (Z) date with precision in
 * seconds (rather than milliseconds), for use in contexts like FHIR dateTime values.This is a
 * basic wrapper for unixTimestampToISODate (which in turn wraps Date.toISOString() for a computed
 * javascript millisecond value), with the millisecond portion stripped via regex.
 *
 * @param unixTimestamp
 * @returns
 */
export function unixTimestampToISODate(
  unixTimestamp: unixTimestamp,
): string | null {
  const isoDate = unixTimestampToISODateMilliseconds(unixTimestamp);
  if (typeof isoDate !== "string") {
    return null;
  }
  return isoDate.replace(/.\d+Z$/g, "Z");
}

/**
 * Takes a Unix epoch timestamp (seconds since 1970-01-01T00:00 UTC), returns an ISO 8601 date
 * string in UTC 'Z' format with millisecond precision (e.g. 1970-01-01T00:00:00.000Z).
 *
 * NOTE: Since this takes a unixTimestamp (seconds), milliseconds will always be '000', so in
 * almost all cases the format provided by unixTimestampToISODate (which wraps this function)
 * makes sense to use (some formats, e.g. FHIR dateTime, only allow for seconds precision).
 *
 * @param unixTimestamp
 * @returns string | null
 */
export function unixTimestampToISODateMilliseconds(
  unixTimestamp: unixTimestamp,
): string | null {
  const jsTimestamp = unixTimestampToJSTimestamp(unixTimestamp);
  return Number.isInteger(jsTimestamp)
    ? jsTimestampToISODate(jsTimestamp)
    : null;
}

/**
 * Basic wrapper for Date.prototype.toISOString, taking JavaScript timestamp
 * (milliseconds since 1970-01-01T00:00 UTC)
 * @param jsTimestamp
 * @returns string | null
 */
export function jsTimestampToISODate(jsTimestamp: number): string | null {
  return Number.isInteger(jsTimestamp)
    ? new Date(jsTimestamp).toISOString()
    : null;
}

/**
 * Returns a basic yyyy-mm-dd ODBC-style string for a given unix timestamp, using a basic
 * wrapper for jsDateToODBCString.
 *
 * NOTE: this will use server timezone offset to specify the return date.
 *
 * @param unixTimestamp
 * @returns
 */
export function unixTimestampToODBCString(
  unixTimestamp: unixTimestamp | null,
): string {
  const jsTimestamp = unixTimestampToJSTimestamp(unixTimestamp);
  if (!jsTimestamp && jsTimestamp !== 0) return null;
  const jsDateObj = new Date(jsTimestamp);
  return jsDateToODBCString(jsDateObj);
}

/**
 * This avoids using moment to format dates - moment has a large load overhead
 * used for converting large numbers of items into simple iso strings
 *
 * NOTE: this will use server timezone offset to specify the return date.
 *
 * @param date
 * @returns string
 */
export function jsDateToODBCString(date: Date): string {
  // yyyy-mm-dd
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
}

/**
 * Simple function to add a day (86400 seconds) to a passed in Unix/Epoch timestamp.
 * if no timestamp is entered, current time is used to derive the result.
 *
 * @param unixTimestamp
 * @returns unixTimestamp
 */
export function unixTimestampAddOneDay(
  unixTimestamp: unixTimestamp = currentUnixTimestamp(),
): unixTimestamp {
  return unixTimestamp + secondsInADay;
}

/**
 * Simple function to subtract a day (86400 seconds) from a passed in Unix/Epoch timestamp.
 * if no timestamp is entered, current time is used to derive the result.
 *
 * @param unixTimestamp
 * @returns unixTimestamp
 */
export function unixTimestampSubtractOneDay(
  unixTimestamp: unixTimestamp = currentUnixTimestamp(),
): unixTimestamp {
  return unixTimestamp - secondsInADay;
}
