// compare between a fhir id and uri

import { extractLastSection } from "next-shared/src/helpers/extractLastSection";

// eg, https://api.hub.medicaldirector.com/fhir/Practitioner/MD3115 === MD3115
export const fhirRefMatches = (a: string, b: string) => {
  return extractLastSection(a) === extractLastSection(b);
};
