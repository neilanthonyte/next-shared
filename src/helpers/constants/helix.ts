// TODO - remove and use version in next-shared and fix spelling. Duplicate constants in next-connect/src/dataProviders/HelixDataProvider/constants

/**
 * Identifier URL used in hub for Helix ID
 */
export const hubExternalResourceIdentifier =
  "http://medicaldirector.com/hub/identifier/external/resource/object-id";

/**
 * Identifier URL used in hub for Helix tenant
 */
export const hubIdentifierTenantId =
  "http://medicaldirector.com/hub/identifier/tenant-id";

/**
 * Identifier URL used in hub for the NP App ID
 */
export const hubIdentifierAppId =
  "http://medicaldirector.com/hub/identifier/app-id";

export const optInSmsExtensionUrl =
  "http://medicaldirector.com/Patient/extension/optInSMS";
export const helixStatusExtensionUrl =
  "http://medicaldirector.com/Patient/extension/Status";

export const helixAppointmentTypeExtensionUrl =
  "http://medicaldirector.com/Schedule/extension/Appointment-Type";

export const helixAppointmentTypeIdExtensionUrl =
  "http://medicaldirector.com/Appointment-Type/extension/ExternalId";

export const helixAppointmentTypeNameExtensionUrl =
  "http://medicaldirector.com/Appointment-Type/extension/Name";

/**
 * Hub will prepend their own md URL to the patient.photo fhir object value if one is not set.
 * This is then replaced with the signed file URL from S3 before being used to display the image.
 */
export const hubUrlPrefixHack = "http://nextpracticehealth.com/";

/**
 * Used in migration to identify the source of this resource.
 */
export const hubIdentifierUrl =
  "http://medicaldirector.com/hub/identifier/hub-id";

export const hubPhotoExtensionUrl = `${hubUrlPrefixHack}photo`;

export const hubHelixNPPatientOriginationExtension =
  "http://nextpracticehealth.com/extension/private/patient/helixObjectId";

export const hubHelixNPPractitionerOriginationExtension =
  "http://nextpracticehealth.com/extension/private/practitioner/helixObjectId";
