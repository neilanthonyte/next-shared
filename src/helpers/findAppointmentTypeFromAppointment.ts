import { fhirUtil } from "../fhirUtil";
import { FhirAppointmentUtil } from "../fhirUtil/utilClasses/FhirAppointmentUtil";
import { AppointmentType } from "../models/AppointmentType";

/**
 * Helper function doing appointment type lookup based on a given appointment and a list of appointment types
 *
 * @param appointment
 * @param appointmentTypes
 */
export const findAppointmentTypeFromAppointment = (
  appointment: fhir3.Appointment,
  appointmentTypes: AppointmentType[],
) => {
  if (!appointment) {
    throw new Error(
      "getAppointmentTypeFromAppointment expects a valid fhir appointment",
    );
  }
  return (appointmentTypes || []).find((apptType) => {
    const appointmentUtil = fhirUtil<FhirAppointmentUtil>(appointment);
    const appointmentTypeSlug = appointmentUtil.getAppointmentTypeSlug();
    return apptType.slug === appointmentTypeSlug;
  });
};
