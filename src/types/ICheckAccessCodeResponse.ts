import { EPatientAcountStatus } from "./EPatientAcountStatus";
import { ICheckForMatchingPatientResult } from "./ICheckForMatchingPatientResult";

export interface ICheckAccessCodeResponse {
  status: EPatientAcountStatus;
  obfuscatedEmail?: string;
  accessCodeCheck?: ICheckForMatchingPatientResult;
}
