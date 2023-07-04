import { appointmentFormPatientNoteLOINC } from "../../../helpers/constants";
import { IMetricDefinition } from "../IMetricDefinition";

/*
{
    "code": {
        "coding": [
            {
                "system": "http://loinc.org/",
                "code": "51855-5"
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

const reasonForVisitDefinition: IMetricDefinition = {
  type: "observation:ReasonForVisit",
  displayName: "Reason for visit",
  category: "survey",

  components: [
    {
      codes: [
        appointmentFormPatientNoteLOINC, // "Patient note"
      ],
      displayName: "Reason for visit",
    },
  ],
};

export default reasonForVisitDefinition;
