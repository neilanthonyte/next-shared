import { IEhrPatientSummary } from "./IEhrPatientSummary";

/**
 * The data that are required/watched by the
 * Helix watcher when calling Helix API's session
 */
export interface IHelixUserSessionWatchedData {
  User: {
    Id: string | number;
    UserCode?: string;
    Username?: string;
    RoleName: string;
  };
}

export interface IHelixPatientWatchedData {
  Id: number;
  DateOfBirth: string;
  Email: string;
  FirstNameSurname: string;
}

export type THelixPatientsWatchedData = Record<
  number,
  IHelixPatientWatchedData
>;

export interface IEhrUser {
  /** @deprecated */
  userCode?: string;
  id: string;
  role: "Practice Manager" | "GP";
}

export interface IHelixState {
  currentUser: null | IEhrUser;
  currentPatient: null | IEhrPatientSummary;
  currentMedicationList: null | string[];
  medicationCount?: null | number;
}

export interface IEhrState {
  currentUser: null | IEhrUser;
  currentPatient?: null | IEhrPatientSummary;
  currentMedicationList?: null | string[];
  medicationCount?: null | number;
}
