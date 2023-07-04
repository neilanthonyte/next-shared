import moment from "moment";
import { ISODate, unixTimestamp } from "next-shared/src/types/dateTypes";

export const ISODateToUnix = (isoDate: ISODate): unixTimestamp =>
  moment(isoDate, "YYYY-MM-DD").unix();
