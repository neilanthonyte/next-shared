import { MedicalResourceType } from "../../../types/types";
import { IMetricDefinition } from "../IMetricDefinition";

// category: activity

/*
    {
    code: {
        coding: [
        {
            system: "http://loinc.org",
            code: "41950-7",
        },
        ],
    },
    valueQuantity: {
        value: 5789,
        unit: "steps/day",
        system: "http://unitsofmeasure.org/",
        code: "{steps}/d",
    },
    extension: [
        {
        url: "http://nextpracticehealth.com/extension/observation/component-raw-code",
        valueString: "41950-7",
        },
        {
        url: "http://nextpracticehealth.com/extension/observation/component-display-name",
        valueString: "Steps count",
        },
    ],
    }
 */

export const stepsCountLOINC = "41950-7";
export const stepsCountSNOMED = "68130003";
export const stepsCountSNOMEDDisplay = "Physical activity (observable entity)";
export const stepsCountDisplayName = "Number of steps in 24 hour Measured";
export const stepsCountUOM = "steps/day";
export const stepsCountUOMCode = "{steps}/d";

const stepsCountDefinition: IMetricDefinition = {
  type: MedicalResourceType.StepsCount,
  displayName: stepsCountDisplayName,
  category: "activity",

  components: [
    {
      codes: [
        stepsCountLOINC, // "Number of steps in 24 hour Measured"
      ],
      displayName: stepsCountDisplayName,
    },
  ],
};

export default stepsCountDefinition;
