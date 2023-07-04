import { capitalize, isEqual } from "lodash";
import { EWeekday } from "../types/IReoccurringTime";
import { arrayToText } from "./arrayToText";

const weekDays = [
  EWeekday.Monday,
  EWeekday.Tuesday,
  EWeekday.Wednesday,
  EWeekday.Thursday,
  EWeekday.Friday,
];
const weekendDays = [EWeekday.Saturday, EWeekday.Sunday];

export function daysToText(days: EWeekday[]) {
  if (days.length === 7) {
    return "every day";
  }
  if (isEqual(days, weekDays)) {
    return "weekdays";
  }
  if (isEqual(days, weekendDays)) {
    return "weekend days";
  }
  return arrayToText(days.map((t) => capitalize(t)));
}
