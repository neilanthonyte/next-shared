import moment from "moment";
import {
  ISummaryDateRange,
  ISummaryDateStringRange,
} from "../types/actionSummary";

// TODO - add tests.
/**
 * Returns summary date range as unixtimestamp from date strings. Defaults to today and 7 days prior
 * @param dateRange - date strings in the range are in ISODate formate i.e. YYYY-MM-DD
 * @returns dates in unixtimestamp and defaults.
 */
export const getSummaryDateRangeFromDateStrings = (
  dateRange?: ISummaryDateStringRange,
): ISummaryDateRange => {
  const { fromDate: from, toDate: to } = dateRange || {};
  // Create defaults
  const toMoment = to ? moment(to).endOf("day") : moment().endOf("day");
  const toDate = toMoment.unix();
  const fromDate = from
    ? moment(from).startOf("day").unix()
    : moment(toMoment).subtract(7, "days").startOf("day").unix();
  return {
    fromDate,
    toDate,
  };
};
