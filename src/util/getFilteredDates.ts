import moment from "moment";
import { unixTimestamp } from "../types/dateTypes";

/**
 * Small helper function to get the min and max's of the start and end dates.
 * in LOCAL TIMEZONE
 *
 * This function is lift & shifted from ScheduleService, as it's better served as a util function
 *
 * @param start unix timestamp
 * @param end unix timestamp
 * @return [startUnixTimestamp, endUnixTimestamp]
 */
export const getFilteredDates = (
  start: unixTimestamp,
  end: unixTimestamp,
): [unixTimestamp, unixTimestamp] => {
  const formattedStartDate = moment.unix(start).startOf("day").unix();
  const formattedEndDate = moment.unix(end).endOf("day").unix();
  return [formattedStartDate, formattedEndDate];
};
