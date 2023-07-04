export enum EOptionalEhrDemographicsRequiredByNext {
  prefix = "prefix",
  email = "email",
  mobile = "mobile",
}

export interface ICheckForMatchingPatientResult {
  missingDetails?: string[];
  emailMatch: boolean;
  identifiersMatch: boolean;
}
