/**
 * Available FHIR appointment statuses
 * https://build.fhir.org/codesystem-appointmentstatus.html#content
 */
export const fhirAppointmentStatuses = [
  "proposed",
  "pending",
  "booked",
  "arrived",
  "fulfilled",
  "cancelled",
  "noshow",
  "entered-in-error",
  "checked-in",
  "waitlist",
] as const;

/**
 * Available FHIR appointment statuses
 * https://build.fhir.org/codesystem-appointmentstatus.html#content
 */
export type FhirAppointmentStatus = typeof fhirAppointmentStatuses[number];
