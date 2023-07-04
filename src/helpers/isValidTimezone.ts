import moment from "moment-timezone";

/**
 * Checks whether the timezone id is a supported timezone in the IANA database.
 * @param {string} timezoneId - timezone's long name like, 'Australia/Sydney'
 */
export const isValidTimezone = (timezoneId: string) => {
  if (!timezoneId || timezoneId === "") {
    return false;
  }
  const validTimezones = moment.tz.names();
  if (validTimezones.includes(timezoneId)) {
    return true;
  }
  return false;
};
