import { unixTimestamp } from "next-shared/src/types/dateTypes";

export type TDynamicStatisticsWindow = "hour" | "day" | "week" | "month";

export interface IDynamicStatisticsQuery {
  eventType: string;
  fromTime: unixTimestamp;
  toTime: unixTimestamp;
  aggregation?:
    | {
        type: "count";
      }
    | {
        type: "sum" | "max";
        field: string; // json query to aggregate on
      };
  groupByField?: string; // json query if starts with "event." or "location"
  filters?: Array<{
    field: string; // json query if starts with "event." or "location"
    comparison: "=" | "<" | ">";
    value: string | number;
  }>;
  windowing?: TDynamicStatisticsWindow;
}

// keyed if group by is specified
// export type TDynamicStatisticsWindowedValue = { [key: string]: number };
export type TDynamicStatisticsSingleResponse =
  | number
  | { [key: string]: number };
export type TDynamicStatisticsWindowedResponse = Array<{
  windowStart: unixTimestamp;
  value: TDynamicStatisticsSingleResponse;
}>;

export type TDynamicStatisticsResponse =
  | TDynamicStatisticsSingleResponse
  | TDynamicStatisticsWindowedResponse;
