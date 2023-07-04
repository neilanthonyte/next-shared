import { MedicalStaffMember } from "../models/MedicalStaffMember";

export interface IAppointmentsWithRelated {
  appointments: fhir3.Appointment[];
  practitioners: MedicalStaffMember[];
}
