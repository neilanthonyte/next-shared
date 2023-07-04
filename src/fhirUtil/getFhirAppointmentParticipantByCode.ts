import { hl7CodingSystemParticipantType } from "../helpers/constants";

/**
 * Get a Fhir Participant by the participant's code.
 * @param participants
 * @param code - A compliant participant type code. That said, this is not strictly checked.
 *  - https://hl7.org/fhir/valueset-encounter-participant-type.html
 *  - https://terminology.hl7.org/3.1.0/CodeSystem-v3-ParticipationType.html
 */
export const getFhirAppointmentParticipantByCode = (
  participants: fhir4.AppointmentParticipant[],
  code: string,
) => {
  if (!participants || participants?.length === 0) {
    return null;
  }
  return (
    participants.find((participant) =>
      participant.type.find((pType) =>
        pType.coding.find(
          (coding) =>
            coding.system === hl7CodingSystemParticipantType &&
            coding.code === code,
        ),
      ),
    ) || null
  );
};
