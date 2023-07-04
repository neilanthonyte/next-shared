/**
 * Env config used by PatientDal
 */
export interface IPatientDalConfig {
  latestTermsAndConditions: string;
  invitationCodeExpiry: number;
}

export const PatientDalStringEnvVarKeys = ["LATEST_TERMS_AND_CONDITIONS"];

export const PatientDalNumberEnvVarKeys = ["INVITATION_CODE_EXPIRY"];
