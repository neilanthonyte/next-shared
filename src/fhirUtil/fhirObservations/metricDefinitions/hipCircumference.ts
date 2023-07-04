import { IMetricDefinition } from "../IMetricDefinition";

// category: vital-signs

/*
{
    "code": {
        "coding": [
            {
                "system": "http://loinc.org/",
                "code": "56063-1"
            }
        ]
    },
    "valueQuantity": {
        "value": 80,
        "unit": "cm",
        "system": "http://unitsofmeasure.org/",
        "code": "cm"
    }
}
 */

export const hipCircumferenceLOINC = "56063-1";
export const hipCircumferenceDisplayName = "Hip Circumference";
export const hipCircumferenceUOM = "cm";

const hipCircumferenceDefinition: IMetricDefinition = {
  type: "observation:HipCircumference",
  displayName: hipCircumferenceDisplayName,
  category: "vital-signs",

  components: [
    {
      codes: [
        hipCircumferenceLOINC, // "Circumference.at maximal protrusion of gluteus muscles Pelvis"
      ],
      displayName: hipCircumferenceDisplayName,
    },
  ],
};

export default hipCircumferenceDefinition;
