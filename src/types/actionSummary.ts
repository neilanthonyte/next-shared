import { ISODate, unixTimestamp } from "./dateTypes";

export enum EFulfillmentStatus {
  Successful = "successful",
  Failed = "fail",
  Partial = "partial",
  Unknown = "unknown",
  Completed = "completed",
}

export interface IActionFulfillmentStatistics {
  status: EFulfillmentStatus;
  totalTasks: number;
  totalSuccess: number;
}

export interface IActionFulfillmentDayStatistics {
  date: string; // "yyyy-mm-dd"
  total: number;
  completedCount: number;
  failedCount: number;
}

/**
 * Object of action fulfillment statistics indexed by date string in 'YYYY-MM-DD' format.
 */
export interface IActionFulfillmentSummary {
  [day: string]: IActionFulfillmentStatistics;
}

export interface ISummaryDateRange {
  fromDate?: unixTimestamp;
  toDate?: unixTimestamp;
}

export interface ISummaryDateStringRange {
  fromDate?: ISODate;
  toDate?: ISODate;
}
