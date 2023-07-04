import {
  hl7CodingCodeLocation,
  hl7CodingCodePrimaryPerformer,
  hl7CodingCodeSubject,
  hl7CodingSystemParticipantType,
} from "../../helpers/constants";
import { getFhirAppointmentParticipantByCode } from "../getFhirAppointmentParticipantByCode";

describe("getFhirAppointmentParticipantByCode", () => {
  const mockPatientId = "Patient/MOCK_PATIENT_ID";
  const mockPractitionerId = "Practitioner/MOCK_PRACTITIONER_ID";
  const mockLocationId = "Location/MOCK_LOCATION_ID";
  const mockValidParticipants: fhir4.AppointmentParticipant[] = [
    {
      type: [
        {
          coding: [
            {
              system: hl7CodingSystemParticipantType,
              code: hl7CodingCodeSubject,
            },
          ],
        },
      ],
      actor: {
        reference: mockPatientId,
      },
      status: "accepted",
    },
    {
      type: [
        {
          coding: [
            {
              system: hl7CodingSystemParticipantType,
              code: hl7CodingCodePrimaryPerformer,
            },
          ],
        },
      ],
      actor: {
        reference: mockPractitionerId,
      },
      status: "accepted",
    },
    {
      type: [
        {
          coding: [
            {
              system: hl7CodingSystemParticipantType,
              code: hl7CodingCodeLocation,
            },
          ],
        },
      ],
      actor: {
        reference: mockLocationId,
      },
      status: "accepted",
    },
  ];

  it.each([
    [hl7CodingCodeSubject, mockPatientId],
    [hl7CodingCodePrimaryPerformer, mockPractitionerId],
    [hl7CodingCodeLocation, mockLocationId],
  ])(
    "should return a participant that matches the participant type code '%s'",
    (code, expectedActor) => {
      const mockParticipant = getFhirAppointmentParticipantByCode(
        mockValidParticipants,
        code,
      );

      expect(mockParticipant.actor).toHaveProperty("reference", expectedActor);
    },
  );

  it("returns null if participants are empty", () => {
    const mockParticipant = getFhirAppointmentParticipantByCode(
      [],
      hl7CodingCodeSubject,
    );
    expect(mockParticipant).toBeNull();
  });

  it("returns null if no matchin code was found", () => {
    const mockParticipant = getFhirAppointmentParticipantByCode(
      mockValidParticipants,
      "MOCK_CODE",
    );
    expect(mockParticipant).toBeNull();
  });
});
