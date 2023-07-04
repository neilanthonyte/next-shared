import { isValidODBCDate } from "./isValidODBCDate";

/**
 * This validates an ISO 8601 date string is valid, based on JS Date
 *
 * @param dateString
 * @returns
 */
export function isValidISODate(dateString: string): boolean {
  // if first 10 chars aren't in yyyy-mm-dd format, return false
  if (!isValidODBCDate(dateString.slice(0, 10))) {
    return false;
  }
  const date = new Date(dateString);
  const datetimeNumber = date.getTime();
  if (!datetimeNumber && datetimeNumber !== 0) return false; // NaN value, Invalid date
  return true;
}
