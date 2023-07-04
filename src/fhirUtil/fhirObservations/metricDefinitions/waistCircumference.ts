import { IMetricDefinition } from "../IMetricDefinition";

// category: vital-signs

/*
{
    "code": {
        "coding": [
            {
                "system": "http://loinc.org/",
                "code": "8280-0"
            }
        ]
    },
    "valueQuantity": {
        "value": 75,
        "unit": "cm",
        "system": "http://unitsofmeasure.org/",
        "code": "cm"
    }
}
 */

export const waistCircumferenceLOINC = "8280-0";
export const waistCircumferenceDisplayName = "Waist Circumference";
export const waistCircumferenceUOM = "cm";

const waistCircumferenceDefinition: IMetricDefinition = {
  type: "observation:WaistCircumference",
  displayName: waistCircumferenceDisplayName,
  category: "vital-signs",

  components: [
    {
      codes: [
        waistCircumferenceLOINC, // "Waist Circumference at umbilicus by Tape measure"
      ],
      displayName: waistCircumferenceDisplayName,
    },
  ],
};

export default waistCircumferenceDefinition;
