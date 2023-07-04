import { ISODate } from "./dateTypes";

/**
 * Ehr Row returned by the database
 */
export interface IEhrRow {
  ehrId: string;
  driver: string;
  driverConfiguration: string;
  cmsLocationSlug: string;
  created_at: ISODate;
  updated_at: ISODate;
}
