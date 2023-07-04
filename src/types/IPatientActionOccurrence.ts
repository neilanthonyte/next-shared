import { unixTimestamp } from "next-shared/src/types/dateTypes";
import { IReoccurringTime } from "./IReoccurringTime";

export type ISingleTime = {
  type: "single";
  time?: unixTimestamp;
};

export type IActionOccurrence = IReoccurringTime | ISingleTime;
