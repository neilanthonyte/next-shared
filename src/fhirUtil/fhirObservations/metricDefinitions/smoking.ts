import { MedicalResourceType } from "../../../types/types";
import { IMetricDefinition } from "../IMetricDefinition";
/* tslint:disable */
/*
{
    "code": {
      "coding": [
        {
          "system": "http://loinc.org/",
          "code": "LL2201-3"
        }
      ],
      "text": "Smoking Status - HL7 Value Set / Value Set based on HL7 Vocab TC and Structured Doc consensus (per CDC submission 7/12/2012 for smoking status term)"
    },
    "valueString": "Never smoker"
  },
  {
    "code": {
      "coding": [
        {
          "system": "http://loinc.org/",
          "code": "63582-1"
        }
      ],
      "text": "Do you now smoke cigarettes every day, some days, or not at all [PhenX]"
    },
    "valueString": "Every day"
  },
  {
    "code": {
      "coding": [
        {
          "system": "http://loinc.org/",
          "code": "64218-1"
        }
      ],
      "text": "How many cigarettes do you smoke per day now [PhenX]"
    },
    "valueString": "32"
  }
 */
/* tslint:enable */

export const smokingObservationDisplayName = "Smoking";
export const smokingStatusNHISLOINC = "72166-2";

export const smokingStatusDisplayName = "Status";

export const smokingFrequencyLOINC = "63582-1";
export const smokingFrequencyDisplayName = "Frequency";

// TODO: check if differing 'raw code' versus straight LOINC above is still necessary after
// Helix adapter is completed (e.g. next-react/src/components/atoms/GoalEditor/helpers/data.ts,
// and after this observation begins being stored in IRIS rather than Hub?
export const smokingStatusRawCode = "LL2201-3";

export const smokingQuantityLOINC = "64218-1";
export const smokingQuantityDisplayName = "Number of cigarettes";

const smokingDefinition: IMetricDefinition = {
  type: MedicalResourceType.Smoking,
  displayName: "Smoking",
  category: "social-history",

  components: [
    {
      codes: [
        smokingStatusNHISLOINC, // "Tobacco smoking status NHIS"
        smokingStatusRawCode, // HL7 Value Set code, helix/hub uses it for status though
        "81229-7", // "Tobacco smoking status for tobacco smoker"
      ],
      displayName: smokingStatusDisplayName,
    },
    {
      codes: [
        smokingFrequencyLOINC, // "Do you now smoke cigarettes every day, some days, or not at all [PhenX]"
      ],
      displayName: smokingFrequencyDisplayName,
    },
    {
      codes: [
        smokingQuantityLOINC, // "How many cigarettes do you smoke per day now [PhenX]"
      ],
      displayName: smokingQuantityDisplayName,
    },
  ],
};

export default smokingDefinition;
