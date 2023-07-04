import { ICreditCard } from "./ICreditCard";

// TODO: STU3 (fhir3 namespace) version of observation is catered for here to handle the 'image' medical resource type,
// which uses valueAttachment, which is not supported in r4 (fhir4). Consider changing this type to use the 'Media' resource.
// Note r5 draft version re-incorporates valueAttachment for observations.

export type PatientMedicalResource =
  | fhir3.Observation
  | fhir3.MedicationRequest
  | fhir3.Goal;
// | fhir3.FamilyMemberHistory
// | fhir3.FamilyMemberHistoryCondition
// | fhir3.Condition
// | fhir3.AllergyIntolerance
// | fhir3.Immunization

export enum FhirMedicalResourceType {
  Observation = "Observation",
  MedicationRequest = "MedicationRequest",
  Goal = "Goal",
}

export enum MedicalResourceType {
  MedicationRequest = "MedicationRequest",
  Goal = "Goal",

  // observations
  AllObservations = "observation:AllObservations", // magic return all
  ReasonForVisit = "observation:ReasonForVisit",
  NoteToPatient = "observation:NoteToPatient",
  OnboardingForm = "observation:OnboardingForm",
  BloodPressure = "observation:BloodPressure",
  HeartRate = "observation:HeartRate",
  Height = "observation:Height",
  HipCircumference = "observation:HipCircumference",
  WaistCircumference = "observation:WaistCircumference",
  StepsCount = "observation:StepsCount",
  Temperature = "observation:Temperature",
  Weight = "observation:Weight",
  Smoking = "observation:Smoking",
  Alcohol = "observation:Alcohol",
  Image = "observation:Image",
  PatientForm = "observation:PatientForm",
}

export const supportedResourceTypes: MedicalResourceType[] = [
  MedicalResourceType.MedicationRequest,
  MedicalResourceType.Goal,
  MedicalResourceType.AllObservations,
  MedicalResourceType.ReasonForVisit,
  MedicalResourceType.NoteToPatient,
  MedicalResourceType.OnboardingForm,
  MedicalResourceType.BloodPressure,
  MedicalResourceType.HeartRate,
  MedicalResourceType.Height,
  MedicalResourceType.HipCircumference,
  MedicalResourceType.WaistCircumference,
  MedicalResourceType.StepsCount,
  MedicalResourceType.Temperature,
  MedicalResourceType.Weight,
  MedicalResourceType.Smoking,
  MedicalResourceType.Alcohol,
  MedicalResourceType.Image,
  MedicalResourceType.PatientForm,
];

export interface IGroupedPatientMedicalResources {
  [key: string]: PatientMedicalResource[] | undefined;

  [MedicalResourceType.MedicationRequest]?: fhir3.MedicationRequest[];
  [MedicalResourceType.Goal]?: fhir3.Goal[];

  // observations
  [MedicalResourceType.AllObservations]?: fhir3.Observation[]; // magic return all
  [MedicalResourceType.ReasonForVisit]?: fhir3.Observation[];
  [MedicalResourceType.NoteToPatient]?: fhir3.Observation[];
  [MedicalResourceType.OnboardingForm]?: fhir3.Observation[];
  [MedicalResourceType.BloodPressure]?: fhir3.Observation[];
  [MedicalResourceType.HeartRate]?: fhir3.Observation[];
  [MedicalResourceType.Height]?: fhir3.Observation[];
  [MedicalResourceType.HipCircumference]?: fhir3.Observation[];
  [MedicalResourceType.WaistCircumference]?: fhir3.Observation[];
  [MedicalResourceType.StepsCount]?: fhir3.Observation[];
  [MedicalResourceType.Temperature]?: fhir3.Observation[];
  [MedicalResourceType.Weight]?: fhir3.Observation[];
  [MedicalResourceType.Smoking]?: fhir3.Observation[];
  [MedicalResourceType.Alcohol]?: fhir3.Observation[];

  // Note: STU3 allows valueAttachment, r4 does not
  [MedicalResourceType.Image]?: fhir3.Observation[];
  [MedicalResourceType.PatientForm]?: fhir3.Observation[];
}

export type IGroupedObservations = { [key: string]: fhir3.Observation[] };

// form data endpoint
export type FormResourceType = MedicalResourceType | "Patient" | "CreditCard";
export interface IFormResources {
  [key: string]:
    | fhir3.Observation
    | fhir3.MedicationRequest[]
    | fhir3.Patient
    | fhir3.Goal[]
    | ICreditCard
    | undefined;

  [MedicalResourceType.MedicationRequest]?: fhir3.MedicationRequest[];
  [MedicalResourceType.Goal]?: fhir3.Goal[];

  // observations
  [MedicalResourceType.BloodPressure]?: fhir3.Observation;
  [MedicalResourceType.ReasonForVisit]?: fhir3.Observation;
  [MedicalResourceType.NoteToPatient]?: fhir3.Observation;
  [MedicalResourceType.OnboardingForm]?: fhir3.Observation;
  [MedicalResourceType.HeartRate]?: fhir3.Observation;
  [MedicalResourceType.Height]?: fhir3.Observation;
  [MedicalResourceType.HipCircumference]?: fhir3.Observation;
  [MedicalResourceType.WaistCircumference]?: fhir3.Observation;
  [MedicalResourceType.StepsCount]?: fhir3.Observation;
  [MedicalResourceType.Temperature]?: fhir3.Observation;
  [MedicalResourceType.Weight]?: fhir3.Observation;
  [MedicalResourceType.Smoking]?: fhir3.Observation;
  [MedicalResourceType.Alcohol]?: fhir3.Observation;

  // Note: STU3 allows valueAttachment, r4 does not
  [MedicalResourceType.Image]?: fhir3.Observation;
  [MedicalResourceType.PatientForm]?: fhir3.Observation;
  Patient?: fhir3.Patient;
  CreditCard?: ICreditCard;
}

export enum Ratees {
  PatientAdvocate = "patient-advocate",
  Clinic = "clinic",
}

export enum Raters {
  Patient = "patient",
}

export enum Sources {
  PatientApp = "patient-app",
}

export enum PatientDocumentType {
  PathologyReport = 2,
  RadiologyReport = 3,
}

export enum PatientLabResultType {
  Pathology = 3,
  Imaging = 4,
}

export enum PatientLetterType {
  Referral = 1,
  Specialist = 2,
  OWC = 3,
  NursingLetter = 4,
  WorkersCompensation = 5,
  Other = 6,
  Assessment = 7,
}

export enum ReleasedItemType {
  LetterType = 1,
  LabResultType = 2,
}

export enum NextBarRoleType {
  MedicalStaffMember = "medicalStaffMember",
  StaffMember = "staffMember",
  App = "app",
}

export type TNextBarModeType = "staffMember" | "app";

export enum EDeepLinkResourceType {
  Letter = "Letter",
  LabResult = "LabResult",
  Goal = "Goal",
  Education = "Education",
  Medication = "Medication",
  NoteToPatient = "NoteToPatient",
  Recall = "Recall",
}

export interface IDeepLinkResource {
  resourceType?: EDeepLinkResourceType;
  resourceId?: string | number | void;
}

export const transcribeItems = [
  MedicalResourceType.MedicationRequest,
  MedicalResourceType.OnboardingForm,
  MedicalResourceType.ReasonForVisit,
  MedicalResourceType.PatientForm,
];
