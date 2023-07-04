import { IPatient } from "next-shared/src/types/IPatient";

export interface ICompanion {
  type: "app";
  id: string;
  label: string;

  patientId: null | string; // string guid id
  patientPreview: null | IPatient;
}
