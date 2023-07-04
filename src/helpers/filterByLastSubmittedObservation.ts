import { fhirUtil } from "../fhirUtil";

/**
 * Function returning an array with only last submitted observation from the given list
 *
 * @param {fhir3.Observation[]} observations
 * @returns {fhir3.Observation[]}
 */
export const filterByLastSubmittedObservation = (
  observations: fhir3.Observation[],
): fhir3.Observation[] => {
  return [...observations]
    .sort((a, b) => {
      return fhirUtil(b).getLastModified() - fhirUtil(a).getLastModified();
    })
    .slice(0, 1);
};
