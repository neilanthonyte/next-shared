import bloodPressure from "./bloodPressure";
import { IMetricDefinition } from "../IMetricDefinition";
import temperatureDefinition from "./temperature";
import weightDefinition from "./weight";
import heightDefinition from "./height";
import waistCircumferenceDefinition from "./waistCircumference";
import stepsCountDefinition from "./stepsCount";
import hipCircumferenceDefinition from "./hipCircumference";
import heartRateDefinition from "./heartRate";
import reasonForVisitDefinition from "./reasonForVisit";
import smokingDefinition from "./smoking";
import alcoholDefinition from "./alcohol";
import imageDefinition from "./image";
import noteToPatientDefinition from "./noteToPatient";
import onboardingFormDefinition from "./onboardingForm";

export const metricDefinitions: { [key: string]: IMetricDefinition } = {
  bloodPressure,
  temperatureDefinition,
  weightDefinition,
  heightDefinition,
  waistCircumferenceDefinition,
  stepsCountDefinition,
  hipCircumferenceDefinition,
  heartRateDefinition,
  reasonForVisitDefinition,
  smokingDefinition,
  alcoholDefinition,
  imageDefinition,
  noteToPatientDefinition,
  onboardingFormDefinition,
};

export const definitionsByMedicalResourceType: {
  [key: string]: IMetricDefinition;
} = {};
Object.keys(metricDefinitions).forEach((key) => {
  const definition = metricDefinitions[key];
  definitionsByMedicalResourceType[definition.type] = definition;
});
