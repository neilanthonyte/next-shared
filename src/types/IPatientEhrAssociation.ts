import { unixTimestamp } from "next-shared/src/types/dateTypes";

export interface ISimplePatientEhrAssociation {
  ehrPatientId: string;
  ehrId: string;
}

export interface IPatientEhrAssociation {
  patientId?: string;
  ehrId: string;
  ehrPatientId: string;
  ehrPatientIdAlt: null | string;
  lastVisitedClinic: null | unixTimestamp;
  cmsLocationSlug: string;
  createdAt: unixTimestamp;
  linkedAt?: unixTimestamp;
  appAccessCode?: string;
  appAccessCodeExpiry?: unixTimestamp;
  twoFactorCode?: string;
  twoFactorCodeExpiry?: unixTimestamp;
}

export function isValidPatientEhrAssociation(
  patientEhrAssociation: IPatientEhrAssociation,
): boolean {
  if (
    patientEhrAssociation?.ehrId &&
    (patientEhrAssociation.ehrPatientId ||
      patientEhrAssociation.ehrPatientIdAlt)
  ) {
    return true;
  }
  return false;
}
