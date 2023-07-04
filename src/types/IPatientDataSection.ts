export enum EPatientDataSectionNames {
  Identifiers = "Identifiers",
  Address = "Address",
  Contact = "Contact",
  EmergencyContact = "Emergency",
  MedicalCards = "Medical cards",
  Medicare = "Medicare",
  Dva = "Dva",
  Crn = "Crn",
}

export enum EPatientDataSelection {
  Next = "Next",
  Ehr = "Ehr",
  Match = "Match",
}

export interface IPatientDataMapWithFilter {
  map: string;
  filters: { key: string; value: string }[];
}

export type TPatientDataMap = string | IPatientDataMapWithFilter;

export interface IPatientDataSection {
  name: EPatientDataSectionNames;
  maps: TPatientDataMap[];
  selection: EPatientDataSelection;
  icon: string;
}

// indicates field state between a source and comparable fhir patient object
// matching = it's equal in both
// updated = it's either missing in the source or present in both, but the comparable is new
export type TPatientDataSectionStatus = "matching" | "updated";

export interface IPatientDataSectionWithStatus {
  name: EPatientDataSectionNames;
  status: TPatientDataSectionStatus;
}
