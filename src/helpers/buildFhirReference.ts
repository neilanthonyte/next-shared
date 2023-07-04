// TODO unit test me
/**
 * Builds and returns FHIR resource reference object using the supplied resource type and ID.
 *
 * See https://www.hl7.org/fhir/references.html
 */
export const buildFhirReference = (
  resourceType: string,
  id: string,
): fhir4.Reference => ({
  reference: `${resourceType}/${id}`,
  type: resourceType,
});
