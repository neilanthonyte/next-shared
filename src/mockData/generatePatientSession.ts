import moment from "moment";
import { currentUnixTimestamp } from "../helpers/currentUnixTimestamp";

import { createGuid } from "../helpers/guid";
import { ClientSession } from "../models/ClientSession";
import { generatePatient } from "./generatePatient";
import { mockEhrPatients } from "./mockEhrPatients";
import { mockNextLocations } from "./mockLocations";

interface IGeneratePatientSessionArgs {
  sessionId?: string;
  fhirPatient?: fhir3.Patient;
}

export const generatePatientSession = async ({
  sessionId,
  fhirPatient,
}: IGeneratePatientSessionArgs = {}) => {
  const patient = await generatePatient(fhirPatient);

  return ClientSession.unserialize({
    sessionId: sessionId || `generated-session-${createGuid(6)}`,
    expiresAt: moment().add(1, "days").unix(),
    patientId: patient.patientId,
    cmsLocationSlug: mockNextLocations[0].slug,
    createdAt: currentUnixTimestamp(),
    patient,
    ehrPatient: mockEhrPatients[0],
    availableLocations: mockNextLocations,
    // invalidatedMessage,
    permissions: [],
  });
};
