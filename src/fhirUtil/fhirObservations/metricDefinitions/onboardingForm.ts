import { MedicalResourceType } from "../../../types/types";
import { IMetricDefinition } from "../IMetricDefinition";

// https://s.details.loinc.org/LOINC/28636-9.html?sections=Comprehensive

export const onboardingFormDefinition: IMetricDefinition = {
  type: MedicalResourceType.OnboardingForm,
  displayName: "Onboarding form",
  category: "survey",

  components: [
    {
      codes: [
        "28636-9", // "Initial evaluation note"
      ],
      displayName: "Onboarding form",
    },
  ],
};

export default onboardingFormDefinition;
