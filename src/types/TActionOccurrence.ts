import { unixTimestamp } from "next-shared/src/types/dateTypes";
import { IReoccurringTime } from "next-shared/src/types/IReoccurringTime";

export type TSingleTime = {
  type: "single";
  time?: unixTimestamp;
};

export type TActionOccurrence = IReoccurringTime | TSingleTime;

export type TActionOccurrenceType = TActionOccurrence["type"];
