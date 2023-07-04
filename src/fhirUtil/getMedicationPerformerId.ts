import { connectSplitId } from "../util/connectSplitId";

/**
 * Extract a medication performer's ID (usually) from a FHIR resource's performer
 */
export const getMedicationPerformerId = (
  medicationRequest: fhir4.MedicationRequest,
) => {
  // TODO - currently all we support is reference (in connect), but may need to consider more FHIR support later.
  if (!medicationRequest?.performer?.reference) {
    return null;
  }
  const performerId = medicationRequest.performer.reference.split("/").pop();
  try {
    const { ehrId: ehrPerformerId } = connectSplitId(performerId);
    return ehrPerformerId;
  } catch (error) {
    // error indicates that it's not a connect referece, so just return it.
    return performerId;
  }
};
