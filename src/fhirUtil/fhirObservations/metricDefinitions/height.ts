import { IMetricDefinition } from "../IMetricDefinition";

// category: vital-signs

/*
{
    "code": {
        "coding": [
            {
                "system": "http://loinc.org/",
                "code": "3137-7"
            }
        ]
    },
    "valueQuantity": {
        "value": 182,
        "unit": "cm",
        "system": "http://unitsofmeasure.org/",
        "code": "cm"
    }
}
 */

export const heightLOINC = "3137-7";
export const heightDisplayName = "Height";
export const heightUOM = "cm";

const heightDefinition: IMetricDefinition = {
  type: "observation:Height",
  displayName: heightDisplayName,
  category: "vital-signs",

  components: [
    {
      codes: [
        heightLOINC, // "Body height Measured"
      ],
      displayName: heightDisplayName,
    },
  ],
};

export default heightDefinition;
