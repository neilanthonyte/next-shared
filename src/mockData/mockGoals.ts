import { systolicLOINC } from "../fhirUtil/fhirObservations/metricDefinitions/bloodPressure";

export const mockGoals: fhir3.Goal[] = [
  {
    resourceType: "Goal",
    description: {
      text: "Blood Pressure",
    },
    id: "goal-1",
    identifier: [
      {
        value: "123",
      },
    ],
    status: "in-progress",
    subject: {
      reference: "Patient/example",
      display: "Peter James Chalmers",
    },
    startDate: "2015-04-05",
    target: {
      measure: {
        coding: [
          {
            system: "http://loinc.org/",
            code: systolicLOINC,
          },
        ],
      },
      detailCodeableConcept: {
        coding: [
          {
            system: "http://nextpracticehealth.com/BloodPressure/Systolic",
            code: "112",
            extension: [
              {
                url: "http://nextpracticehealth.com/extension/goal/min-value",
                valueInteger: 90,
              },
              {
                url: "http://nextpracticehealth.com/extension/goal/max-value",
                valueInteger: 120,
              },
            ],
          },
          {
            system: "http://nextpracticehealth.com/BloodPressure/Diastolic",
            code: "79",
            extension: [
              {
                url: "http://nextpracticehealth.com/extension/goal/min-value",
                valueInteger: 90,
              },
              {
                url: "http://nextpracticehealth.com/extension/goal/max-value",
                valueInteger: 120,
              },
            ],
          },
        ],
        text: "112/79",
      },
      dueDate: "2016-04-05",
    },
    extension: [
      {
        url: "http://nextpracticehealth.com/extension/goal/obs-resource-type",
        valueString: "observation:BloodPressure",
      },
      {
        url: "http://nextpracticehealth.com/extension/goal/obs-display-name",
        valueString: "Blood pressure",
      },
      {
        url: "http://nextpracticehealth.com/extension/goal/min-value",
        valueInteger: 105,
      },
      {
        url: "http://nextpracticehealth.com/extension/goal/max-value",
        valueInteger: 120,
      },
    ],
  },
];
