/**
 * Reference: http://hl7.org/fhir/R4/valueset-encounter-participant-type.html
 */
export const hl7CodingSystemParticipantType =
  "http://hl7.org/fhir/participant-type";

/**
 * The code used to identify the participant as the primary performer.
 * Used in fhir appointment
 */
export const hl7CodingCodePrimaryPerformer = "PPRF";

/**
 * The code used to identify the participant as the subject*
 * of the fhir appointment. Seems to be in AU standards only
 * so far.
 */
export const hl7CodingCodeSubject = "SBJ";

/**
 * Extended code type for a location to be an appointment's participant. This is an extended code type.
 * https://build.fhir.org/appointment.html#location
 */
export const hl7CodingCodeLocation = "LOC";

// --FHIR standard--
export const fhirObservationCategoryURI =
  "http://hl7.org/fhir/ValueSet/observation-category";

export const fhirObservationStatisticsURI =
  "http://hl7.org/fhir/observation-statistics";

export const valueAttachmentConversionExtensionURI =
  "http://hl7.org/fhir/5.0/StructureDefinition/extension-Observation.valueAttachment";

// -- FHIR AU Profile --
export const auPatientProfile =
  "http://hl7.org.au/fhir/StructureDefinition/au-patient";

export const auPatientProfileVersion = "http://hl7.org.au/fhir/v2/0203";

export const auPatientProfileMedicareSystem =
  "http://ns.electronichealth.net.au/id/medicare-number";

export const extensionPatientAtsi =
  "http://hl7.org.au/fhir/StructureDefinition/indigenous-status";

export const extensionPatientAtsiSystem =
  "https://healthterminologies.gov.au/fhir/CodeSystem/australian-indigenous-status-1";

export const extensionPatientCTG =
  "http://hl7.org.au/fhir/StructureDefinition/closing-the-gap-registration";

export const extensionPatientDVA = "http://ns.electronichealth.net.au/id/dva";

export const extensionPatientCentreLink =
  "http://ns.electronichealth.net.au/id/centrelink-customer-reference-number";
