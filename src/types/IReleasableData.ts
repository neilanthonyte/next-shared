import { unixTimestamp } from "next-shared/src/types/dateTypes";

export interface IReleasableData {
  id: number;
  date: unixTimestamp;
  released: false | unixTimestamp;
  name: string;
}
