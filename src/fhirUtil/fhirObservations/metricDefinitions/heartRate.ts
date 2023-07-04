import { IMetricDefinition } from "../IMetricDefinition";

/*
{
    "extension": [
        {
            "url": "http://hl7.org/fhir/ValueSet/observation-interpretation",
            "valueString": "Regular"
        }
    ],
    "code": {
        "coding": [
            {
                "system": "http://loinc.org/",
                "code": "8867-4"
            }
        ]
    },
    "valueQuantity": {
        "value": 70,
        "unit": "/min",
        "system": "http://unitsofmeasure.org/",
        "code": "/min"
    }
}
 */

export const heartRateLOINC = "8867-4";
export const heartRateDisplayName = "Heart rate";
export const heartRateUOM = "/min";

const heartRateDefinition: IMetricDefinition = {
  type: "observation:HeartRate",
  displayName: heartRateDisplayName,
  category: "vital-signs",

  components: [
    {
      codes: [
        heartRateLOINC, // "Heart rate"
      ],
      displayName: heartRateDisplayName,
    },
  ],
};

export default heartRateDefinition;
