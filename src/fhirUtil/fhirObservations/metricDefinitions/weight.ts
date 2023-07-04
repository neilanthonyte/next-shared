import { IMetricDefinition } from "../IMetricDefinition";

// category: vital-signs

/*
{
    "code": {
        "coding": [
            {
                "system": "http://loinc.org/",
                "code": "29463-7"
            }
        ]
    },
    "valueQuantity": {
        "value": 83.200000000000003,
        "unit": "kg",
        "system": "http://unitsofmeasure.org/",
        "code": "kg"
    }
}
 */

// use the generic code internally
export const weightLOINC = "29463-7";
export const weightDisplayName = "Weight";
export const weightUOM = "kg";

const weightDefinition: IMetricDefinition = {
  type: "observation:Weight",
  displayName: weightDisplayName,
  category: "vital-signs",

  components: [
    {
      codes: [
        weightLOINC, // "Body weight"
        "8350-1", // "Body weight Measured --with clothes"
        "8351-9", // "Body weight Measured --without clothes"
      ],
      displayName: weightDisplayName,
    },
  ],
};

export default weightDefinition;
