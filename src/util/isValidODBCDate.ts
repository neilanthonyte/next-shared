/**
 * This validates that an ODBC-style date string (yyyy-mm-dd) is both in that format
 * and a valid date.
 *
 * @param odbcDateString
 * @returns boolean
 */
export function isValidODBCDate(odbcDateString: string): boolean {
  const regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!odbcDateString.match(regEx)) return false; // Invalid format
  const date = new Date(odbcDateString);
  const datetimeNumber = date.getTime();
  if (!datetimeNumber && datetimeNumber !== 0) return false; // NaN value, Invalid date
  return date.toISOString().slice(0, 10) === odbcDateString;
}
