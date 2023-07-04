/**
 * Generates a fhir3.Bundle object from the resources provided.
 * Please note that this currently returns a Fhir R3 resource
 * TODO - add ability to return Fhir4 etc.
 */
export const generateMockFhirBundle = (
  fhirResources: fhir3.Resource[],
  id: string = "mock_bundle",
) => ({
  resourceType: "Bundle",
  id,
  type: "searchset",
  total: fhirResources.length,
  entry: fhirResources.map((resource) => ({
    fullUrl: `mock://mockdata/${resource.resourceType}/${resource.id}`,
    resource,
  })),
});
