import {
  ArticleAction,
  DocumentAction,
  InstructionAction,
  MedicationAction,
} from "../models/Action";
import { IAppointmentWithDetails } from "./IAppointmentWithDetails";
import { IPatientEhrAssociation } from "./IPatientEhrAssociation";

/**
 * Used to check if patient needs to be prompted for any updates since last check
 * used in patient app to populate tours and eventually patient web portal
 */
export interface IPatientUpdates {
  // used for decorating the updates presentation e.g. hcp details
  lastCompletedAppointmentWithDetails: IAppointmentWithDetails | null;
  newAppointmentWithDetails: IAppointmentWithDetails | null;
  newAssociations: IPatientEhrAssociation[];
  newMedicationActions: MedicationAction[];
  newArticleActions: ArticleAction[];
  newInstructionActions: InstructionAction[];
  newDocumentActions: DocumentAction[];
  appointmentWithDetailsToRate: IAppointmentWithDetails | null;
  updatesCounter: number;
}
