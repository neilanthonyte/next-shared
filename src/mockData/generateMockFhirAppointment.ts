import {
  npAppointmentCategoriesExtensionUrl,
  npAppointmentCategoryExtensionUrl,
  npAppointmentCategorySystem,
} from "../helpers/constants";

export interface IMockAppointmentCustomisation {
  categoryCode?: string;
  categoryName?: string;
  appointmentType?: string;
  id?: string;
  description?: string;
  patientId?: string;
  practitionerId?: string;
  locationId?: string;
  startDate?: string;
  endDate?: string;
}

/**
 * Generates a FHIR4 appointment. Please note that this will currently generate
 * in the Hello Health format and no Helix. If Helix, please see mockAppointments instead.
 * @param overrideFields
 */
export const generateMockFhirAppointment = (
  overrideFields?: IMockAppointmentCustomisation,
): fhir4.Appointment => {
  return {
    resourceType: "Appointment",
    id: overrideFields?.id || "MOCK_APPOINTMENT_ID",
    extension: [
      {
        url: npAppointmentCategoriesExtensionUrl,
        extension: [
          {
            url: npAppointmentCategoryExtensionUrl,
            valueCoding: {
              system: npAppointmentCategorySystem,
              code: overrideFields?.categoryCode || "1",
              display: overrideFields?.categoryName || "Standard Consult",
            },
          },
        ],
      },
    ],
    appointmentType: {
      coding: [
        {
          system:
            "http://nextpracticehealth.com/fhir/CodeSystem/appointment-reason",
          code: "1",
          display: overrideFields?.appointmentType || "OFFICE",
        },
      ],
    },
    description: overrideFields?.description || "Standard Consult",
    start: overrideFields?.startDate || "2022-08-24T05:30:00.000+00:00",
    end: overrideFields?.endDate || "2022-08-24T05:50:00.000+00:00",
    participant: [
      {
        type: [
          {
            coding: [
              {
                system: "http://hl7.org/fhir/participant-type",
                code: "SBJ",
              },
            ],
          },
        ],
        actor: {
          reference: overrideFields?.patientId || "Patient/88890",
        },
        status: "accepted",
      },
      {
        type: [
          {
            coding: [
              {
                system: "http://hl7.org/fhir/participant-type",
                code: "PPRF",
              },
            ],
          },
        ],
        actor: {
          reference: overrideFields?.practitionerId || "Practitioner/88889",
        },
        status: "accepted",
      },
      {
        type: [
          {
            coding: [
              {
                system: "http://hl7.org/fhir/participant-type",
                code: "LOC",
              },
            ],
          },
        ],
        actor: {
          reference: overrideFields?.locationId || "Location/357",
        },
        status: "accepted",
      },
    ],
    status: "booked",
  };
};
