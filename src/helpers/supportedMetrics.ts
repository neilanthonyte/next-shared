import { MedicalResourceType } from "../types/types";

export interface ISupportedMetrics {
  label: string;
  decimalRounding?: number;
  icon: string;
}

export const supportedMetrics: { [key: string]: ISupportedMetrics } = {
  [MedicalResourceType.Weight]: {
    label: "Weight",
    icon: "obs-weight",
    decimalRounding: 1,
  },
  [MedicalResourceType.BloodPressure]: {
    label: "Blood pressure",
    icon: "obs-blood-pressure",
  },
  [MedicalResourceType.StepsCount]: {
    label: "Steps count",
    icon: "obs-steps",
  },
  [MedicalResourceType.Height]: {
    label: "Height",
    icon: "obs-height",
  },
  [MedicalResourceType.WaistCircumference]: {
    label: "Waist circumference",
    icon: "obs-waist",
  },
};
