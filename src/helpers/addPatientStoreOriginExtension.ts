import { fhirUtil } from "../fhirUtil";
import { patientStoreOriginExtensionUrl } from "./constants";

/**
 * Adds patientStoreOriginExtensionUrl extension to the given fhir observation
 * @param resource
 */
export const addPatientStoreOriginExtension = (
  obs: fhir3.Observation,
): fhir3.Observation => {
  return fhirUtil(obs).setExtension({
    url: patientStoreOriginExtensionUrl,
    valueBoolean: true,
  });
};
