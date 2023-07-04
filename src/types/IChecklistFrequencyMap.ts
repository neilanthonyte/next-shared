import { unixTimestamp } from "next-shared/src/types/dateTypes";

export interface IChecklistFrequencyMap {
  [key: string]: unixTimestamp;
}
