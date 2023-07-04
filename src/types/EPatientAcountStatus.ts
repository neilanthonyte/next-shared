/**
 * The possible results of checking an access code.
 */
export enum EPatientAcountStatus {
  /** The EHR account is missing details required to both arrive a patient and link */
  MissingDetails = "Missing details",
  /** A Next account matches the EHR record based on identifiers and phone number */
  ExistingAccount = "Existing account",
  /** A Next account matches the EHR record based on identifiers, but the phone numbers mismatch */
  PhoneMismatch = "Phone mismatch",
  /** No Next account matches the EHR record based on identifiers */
  NewAccount = "New account",
  /** The access code is unknown */
  InvalidCode = "Invalid code",
}
