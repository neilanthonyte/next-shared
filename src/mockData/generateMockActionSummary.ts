import faker from "faker";
import moment from "moment";
import { computeStatusForDay } from "../helpers/computeStatusForDay";
import {
  IActionFulfillmentStatistics,
  IActionFulfillmentSummary,
} from "../types/actionSummary";
import { ISODate } from "../types/dateTypes";

interface IGenerateMockActionSummaryOptions {
  summaryCount?: number;
  dateFrom?: ISODate;
  dateTo?: ISODate;
}

export const generateMockActionSummary = ({
  summaryCount = 7,
  dateFrom,
  dateTo,
}: IGenerateMockActionSummaryOptions): IActionFulfillmentSummary => {
  const todayMoment = moment();
  const dateToMoment = dateTo ? moment(dateTo) : moment();
  const dateFromMoment = dateFrom
    ? moment(dateFrom)
    : dateToMoment.subtract(summaryCount, "days");

  const numberOfDays = dateToMoment.diff(dateFromMoment, "days");

  const summaryEntries: [string, IActionFulfillmentStatistics][] = Array.from({
    length: numberOfDays,
  }).map(() => {
    const currentDateMoment = dateFromMoment.add(1, "day");

    const dateString = currentDateMoment.format("YYYY-MM-DD");
    const total = faker.random.number({
      min: 0,
      max: 20,
    });

    const completedCount = faker.random.number({
      min: 0,
      max: total,
      precision: 1,
    });
    const dayStats = {
      date: dateString,
      total,
      completedCount,
      failedCount: total - completedCount,
    };

    // anything in the future should not have any fulfillments fulfilled yet.
    if (currentDateMoment.isAfter(todayMoment, "date")) {
      dayStats.completedCount = 0;
      dayStats.failedCount = 0;
    }

    return [
      dateString,
      {
        status: computeStatusForDay(dayStats),
        totalTasks: total,
        totalSuccess: completedCount,
      },
    ];
  });

  return Object.fromEntries(summaryEntries);
};
