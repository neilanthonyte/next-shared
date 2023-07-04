import { fhirUtil } from "../fhirUtil";

/**
 * Helper sort function used to sort observation by the most recently modified
 */
export const sortObservationsByMostRecent = (
  obs1: fhir3.Observation,
  obs2: fhir3.Observation,
): number => {
  const utilOb1 = fhirUtil(obs1);
  const utilOb2 = fhirUtil(obs2);
  return utilOb2.getLastModified() - utilOb1.getLastModified();
};
