export interface IMedication {
  ScriptItemId: number;
  PatientId: number;
  ProductId: number;
  MDProductId: number;
  MDGenericProductId: number;
  ProductNameDoseFormStrengthId: number;
  ProductDiscontinued: boolean;
  ProductRecipeName: string;
  DoseFormNameDisplay: string;
  NameDoseFormStrengthIngredient: string;
  ProductStrengthRecipeIngredients: string;
  Route: string;
  Directions: string;
  Rpts: number;
  PrescribedDate: Date;
  ElapseDate: Date;
  CreatedDate: string;
  UpdatedDate: Date;
  IsShortTerm: boolean;
  PrescribingHcpId: number;
  ConsultId: number;
  IsPrescribedInternal: boolean;
  IsPast: boolean;
  IsRemovedFromCurrent: boolean;
  ReasonForCessation: string;
  NameDoseFormStrength: string;
  CurrentMedicationRemoveReasonId: number;
  DaysToElapse: number;
  IsAboutToElapse: boolean;
  IsElapsed: boolean;
}

export interface IHelixMedications {
  Medications: IMedication[];
}
