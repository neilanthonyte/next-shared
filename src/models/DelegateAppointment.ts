import { unixTimestamp } from "../types/dateTypes";

export class DelegateAppointment {
  public ehrId: string;
  public ehrPatientId: string; // EHR external patient Id
  public ehrAppointmentId: string; // EHR external appointment Id
  public date: unixTimestamp;
  public delegateAppointmentId?: string;
  public bookedByPatientId?: string; // Next patientId who booked (if booking was created in a Next account session)
  public appointmentIrisResourcesArray?: string[];
  public paydockCustomerId?: string;
  public paydockGatewayId?: string;
  public token?: string;
}
