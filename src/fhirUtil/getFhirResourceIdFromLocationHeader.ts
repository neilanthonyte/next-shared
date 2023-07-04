import { ValidationError } from "../helpers/errorTypes";

/**
 * Parse the FHIR Location header that's returned from create
 * and return the resource ID
 * Header format is like this: `https://dev.nextpracticeclinics.com/{RESOURCE_NAME}/{RESOURCE_ID}`
 *
 * @param fhirLocationHeader - the full location URL returned in headers.location
 * @param resourceName - the Fhir Resource. i.e. Appointment, Patient
 */
export const getFhirResourceIdFromLocationHeader = (
  fhirLocationHeader: string,
  resourceName: string,
) => {
  const uri = new URL(fhirLocationHeader);
  const uriParts = uri.pathname.split("/");

  const resourceIdIndex = uriParts.indexOf(resourceName) + 1;
  // this means resource name's index is -1, and therefore not found.
  if (resourceIdIndex === 0) {
    throw new ValidationError("URI does not contain the requested resource", {
      fhirLocationHeader,
      resourceName,
    });
  }

  if (resourceIdIndex >= uriParts.length) {
    throw new ValidationError("URI does not contain a resource ID", {
      fhirLocationHeader,
      resourceName,
    });
  }

  return uriParts[resourceIdIndex];
};
