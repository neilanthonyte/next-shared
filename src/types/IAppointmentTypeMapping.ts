import { unixTimestamp } from "./dateTypes";
import { EEhrKey } from "./EEhrKey";

export interface IAppointmentTypeMapping {
  /**
   * Unique identifier for the appointment type mapping
   */
  appointmentTypeId: string;
  /**
   * The type of EHR this appointment type is coming from.
   */
  ehrType: EEhrKey;

  /**
   * Original appointment type code in the EHR
   */
  ehrAppointmentTypeId: string;

  /**
   * Human readable name for the appointment type
   */
  ehrAppointmentTypeName: string;

  createdAt?: unixTimestamp;

  updatedAt?: unixTimestamp;
}
