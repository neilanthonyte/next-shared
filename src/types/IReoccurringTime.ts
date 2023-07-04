// reoccurring interfaces
export type IReoccurringTime =
  | IReoccurringTimeWeekDay
  | IReoccurringTimeMonthDay
  | IReoccurringTimeYearDay;

export enum EWeekday {
  "Monday" = "monday",
  "Tuesday" = "tuesday",
  "Wednesday" = "wednesday",
  "Thursday" = "thursday",
  "Friday" = "friday",
  "Saturday" = "saturday",
  "Sunday" = "sunday",
}

export const CMonths = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

export interface ITimeSlot {
  hour: number;
  minute: number;
}

export interface IReoccurringTimeWeekDay {
  type: "week";
  weekdays: EWeekday[];
  timeOfDay: ITimeSlot[];
}

export interface IReoccurringTimeMonthDay {
  type: "month";
  days: number[]; // date (15 = 15th)
  timeOfDay: ITimeSlot[];
}

export interface IReoccurringTimeYearDay {
  type: "year";
  months: number[]; // 1 = jan, 12 = dec
  days: number[]; // date (15 = 15th)
  timeOfDay: ITimeSlot[];
}
