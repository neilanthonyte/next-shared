// TODO - add unit test
/**
 * Given a reference URL (https://myserver.com/fhir/patient/101), relative path reference (patient/101),
 * or the resource ID as-is (101), this returns an object with the referenced resource ID (101) and the
 * existing path, if a URL or partial path was passed (https://myserver.com/fhir/patient/, patient/, or
 * undefined in the examples above).
 *
 * @param referenceIdOrURL
 * @returns {
    referenceId: string;
    existingPath: string;
  }
 */
export function retrieveReferenceResourceId(referenceIdOrURL: string): {
  referenceId: string;
  existingPath: string;
} {
  if (!referenceIdOrURL) {
    throw new Error("referenceIdOrUrl cannot be empty");
  }
  const lastIndexOfSlash = referenceIdOrURL.lastIndexOf("/");
  let existingPath: string = null;

  if (lastIndexOfSlash === -1) {
    // this isn't a URL (or part of one, e.g. a relative path); just assume the value passed in is already the reference
    // resourceId
    return { referenceId: referenceIdOrURL, existingPath };
  }
  // dealing with a url; return path and extract the last segment
  existingPath = referenceIdOrURL.substring(0, lastIndexOfSlash + 1);
  const referenceId = referenceIdOrURL.substring(lastIndexOfSlash + 1);
  return { referenceId, existingPath };
}
