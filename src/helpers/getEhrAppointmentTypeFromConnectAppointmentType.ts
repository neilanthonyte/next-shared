import { IEhrAppointmentType } from "../models/AppointmentType";
import { BadRequestError } from "./errorTypes";

/**
 * Extracts the appointment type ID and Name
 * from next-connect appointment type Code-able concept.
 *
 * TODO - test
 */
export const getEhrAppointmentTypeFromConnectAppointmentType = (
  appointmentType: fhir3.CodeableConcept | fhir4.CodeableConcept,
): IEhrAppointmentType => {
  if (
    !appointmentType?.coding?.[0]?.code ||
    !appointmentType?.coding?.[0]?.display
  ) {
    throw new BadRequestError(
      "Appointment type codeable concept is malformed",
      {
        appointmentType,
      },
    );
  }

  return {
    appointmentTypeId: appointmentType.coding[0].code,
    appointmentTypeName: appointmentType.coding[0].display,
  };
};
