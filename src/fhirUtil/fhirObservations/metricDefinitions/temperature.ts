import { IMetricDefinition } from "../IMetricDefinition";

/*
{
    "code": {
      "coding": [
        {
          "system": "http://loinc.org/",
          "code": "8331-1"
        }
      ]
    },
    "valueQuantity": {
      "value": 40,
      "unit": "cel(1 K)",
      "system": "http://unitsofmeasure.org/",
      "code": "cel(1 K)"
    }
  }
 */

const temperatureDefinition: IMetricDefinition = {
  type: "observation:Temperature",
  displayName: "Temperature",
  category: "vital-signs",

  components: [
    {
      codes: [
        "8310-5", // "Body temperature"
        "8331-1", // "Oral temperature"
        "8328-7", // "Axillary temperature"
        "8333-7", // "Tympanic membrane temperature"
        "8332-9", // "Rectal temperature"
      ],
      displayName: "Temperature",
    },
  ],
};

export default temperatureDefinition;
