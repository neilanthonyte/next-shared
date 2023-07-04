import { MedicalResourceType } from "../../../types/types";
import { IMetricDefinition } from "../IMetricDefinition";
/* tslint:disable */
/*
{
    "code": {
        "coding": [
            {
                "system": "http://loinc.org/",
                "code": "68518-0"
            }
        ],
        "text": "How often do you have a drink containing alcohol?"
    },
    "valueString": "Monthly or less"
},
{
    "code": {
        "coding": [
            {
                "system": "http://loinc.org/",
                "code": "68519-8"
            }
        ],
        "text": "How many standard drinks containing alcohol do you have on a typical day?"
    },
    "valueString": "1 or 2"
}
 */
/* tslint:enable */

export const alcoholObservationDisplayName = "Alcohol";
export const alcoholConsumptionTestLOINC = "72109-2";

export const alcoholFrequencyLOINC = "68518-0";
export const alcoholFrequencyDisplayName =
  "How often do you have a drink containing alcohol?";

export const alcoholQuantityLOINC = "68519-8";
export const alcoholQuantityDisplayName = "Standard drinks per typical day";

export const alcoholStatusLOINC = "69721-9";
export const alcoholStatusDisplayName = "Drinking status";

export const alcoholBingeFrequencyLOINC = "68520-6";
export const alocholBingeFrequencyDisplayName =
  "How often do you have 6 or more drinks on 1 occasion?";

export const alcoholTotalScoreLOINC = "75626-2";
export const alcoholTotalScoreDisplayName = "Total score [AUDIT-C]";

const alcoholDefinition: IMetricDefinition = {
  type: MedicalResourceType.Alcohol,
  displayName: "Alcohol",
  category: "social-history",

  components: [
    {
      codes: [
        alcoholFrequencyLOINC, // "How often do you have a drink containing alcohol?"
      ],
      displayName: alcoholFrequencyDisplayName,
    },
    {
      codes: [
        alcoholQuantityLOINC, // "How many standard drinks containing alcohol do you have on a typical day?"
      ],
      displayName: alcoholQuantityDisplayName,
    },
    {
      codes: [alcoholBingeFrequencyLOINC],
      displayName: alocholBingeFrequencyDisplayName,
    },
    {
      codes: [alcoholTotalScoreLOINC],
      displayName: alcoholTotalScoreDisplayName,
    },
    // not valid audit-c
    {
      codes: [
        alcoholStatusLOINC, // "Do you ever drink alcohol - including beer or wine"
      ],
      displayName: alcoholStatusDisplayName,
    },
  ],
};

export default alcoholDefinition;
