import { MedicalResourceType } from "../../../types/types";
import { IMetricDefinition } from "../IMetricDefinition";

// HACK the custom code is only used in blood pressure observations, but should be extracted elsewhere if it spreads
export const customObservationCodingSystem =
  "http://nextpracticehealth.com/fhir/CodeSystem/patient-observation-components";
export const bloodPressureCustomCode = "blood-pressure";

export const bloodPressureDisplayName = "Blood pressure";

// always use 'generic' BP LOINCs  internally for now (if we go more granular later, add codes for sitting,
// standing, supine, etc)
export const systolicLOINC = "8480-6";
export const systolicDisplayName = "Systolic";

export const diastolicLOINC = "8462-4";
export const diastolicDisplayName = "Diastolic";

// HACK body position is only used in blood pressure observations, but should be extracted elsewhere if usage spreads
export const bodyPositionLOINC = "8361-8";
export const bodyPositionDisplayName = "Body position with respect to gravity";

// TODO: check if differing 'raw code' versus straight LOINC above is still necessary after
// Helix adapter is completed (e.g. next-react/src/components/atoms/GoalEditor/helpers/data.ts).
// or if it should move out of all shared/generic code and into the Helix adapter specifically
export const systolicRawCode = "8459-0";
export const diastolicRawCode = "8453-3";

export const bloodPressureUOM = "mm[Hg]";

const bloodPressureDefinition: IMetricDefinition = {
  type: MedicalResourceType.BloodPressure,
  displayName: bloodPressureDisplayName,
  category: "vital-signs",

  components: [
    {
      codes: [
        systolicLOINC, // "Systolic blood pressure"
        "8459-0", // "Systolic blood pressure--sitting"
        "8460-8", // "Systolic blood pressure--standing"
        "8461-6", // "Systolic blood pressure--supine"
      ],
      displayName: systolicDisplayName,
    },
    {
      codes: [
        diastolicLOINC, // "Diastolic blood pressure"
        "8453-3", // "Diastolic blood pressure--sitting"
        "8454-1", // "Diastolic blood pressure--standing"
        "8455-8", // "Diastolic blood pressure--supine"
      ],
      displayName: diastolicDisplayName,
    },
  ],
};

export default bloodPressureDefinition;
