import { EEhrKey } from "../types/EEhrKey";
import { MedicalResourceType } from "../types/types";

export const getSupportedMedicalResourceTypesForEhr = (
  underlyingEhr?: EEhrKey,
): readonly MedicalResourceType[] => {
  switch (underlyingEhr) {
    case EEhrKey.HelloHealth:
      return [
        MedicalResourceType.Smoking,
        MedicalResourceType.Alcohol,
        MedicalResourceType.Height,
        MedicalResourceType.Weight,
        MedicalResourceType.BloodPressure,
      ];

    case EEhrKey.Helix:
      return [
        MedicalResourceType.Smoking,
        MedicalResourceType.Alcohol,
        MedicalResourceType.Height,
        MedicalResourceType.Weight,
        MedicalResourceType.BloodPressure,
        MedicalResourceType.HeartRate,
        MedicalResourceType.HipCircumference,
        MedicalResourceType.WaistCircumference,
        MedicalResourceType.StepsCount,
        MedicalResourceType.Temperature,
        MedicalResourceType.Image,
      ];

    default:
      return [];
  }
};
