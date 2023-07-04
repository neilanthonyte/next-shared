import { PatientMedicalResource, MedicalResourceType } from "../types/types";
import alcoholDefinition, {
  alcoholConsumptionTestLOINC,
  alcoholFrequencyDisplayName,
  alcoholFrequencyLOINC,
  alcoholQuantityDisplayName,
  alcoholQuantityLOINC,
  alcoholStatusDisplayName,
  alcoholStatusLOINC,
} from "../fhirUtil/fhirObservations/metricDefinitions/alcohol";
import bloodPressureDefinition, {
  bloodPressureUOM,
  diastolicDisplayName,
  diastolicLOINC,
  diastolicRawCode,
  systolicDisplayName,
  systolicLOINC,
  systolicRawCode,
} from "../fhirUtil/fhirObservations/metricDefinitions/bloodPressure";
import heartRateDefinition, {
  heartRateLOINC,
  heartRateUOM,
} from "../fhirUtil/fhirObservations/metricDefinitions/heartRate";
import noteToPatientDefinition, {
  patientNoteLOINC,
} from "../fhirUtil/fhirObservations/metricDefinitions/noteToPatient";
import reasonForVisitDefinition from "../fhirUtil/fhirObservations/metricDefinitions/reasonForVisit";
import smokingDefinition, {
  smokingFrequencyDisplayName,
  smokingFrequencyLOINC,
  smokingStatusDisplayName,
  smokingStatusNHISLOINC,
  smokingStatusRawCode,
} from "../fhirUtil/fhirObservations/metricDefinitions/smoking";
import stepsCountDefinition, {
  stepsCountDisplayName,
  stepsCountLOINC,
  stepsCountUOM,
  stepsCountUOMCode,
} from "../fhirUtil/fhirObservations/metricDefinitions/stepsCount";
import weightDefinition, {
  weightDisplayName,
  weightLOINC,
  weightUOM,
} from "../fhirUtil/fhirObservations/metricDefinitions/weight";
import {
  appointmentFormPatientNoteLOINC,
  fhirObservationCategoryURI,
  loincOrgURI,
  observationComponentDisplayNameExtensionUrl,
  observationComponentRawCodeExtensionUrl,
  observationDisplayNameExtensionUrl,
  observationFormSlugExtensionUrl,
  observationTypeExtensionUrl,
  reviewItemExtensionUrl,
  unitsOfMeasureOrgURI,
} from "../helpers/constants";
import { MOCK_APPOINTMENT_FORM_SLUG } from "./mockFormSchemas";

// TODO: Consider moving to r4, where Goal resources replace Goal.status string with Goal.achievementStatus codeableConcept, and Goal.target
// becomes an array (rather than a single entry).
// TODO: constants for the Next Practice URIs in these mock goal resources
export const mockGoals: fhir3.Goal[] = [
  {
    resourceType: "Goal",
    description: {
      text: "Weight",
    },
    id: "222",
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
    startDate: "2019-11-06",
    target: {
      measure: {
        coding: [
          {
            system: "http://loinc.org",
            code: "3141-9",
            display: "Weight Measured",
          },
        ],
      },
      detailQuantity: {
        value: 76,
        unit: "kg",
        system: "http://unitsofmeasure.org",
        code: "kg",
      },
      dueDate: "2020-02-06",
    },
    extension: [
      {
        url: "http://nextpracticehealth.com/extension/goal/obs-resource-type",
        valueString: "observation:Weight",
      },
      {
        url: "http://nextpracticehealth.com/extension/goal/obs-display-name",
        valueString: "Weight",
      },
      {
        url: "http://nextpracticehealth.com/extension/goal/min-value",
        valueInteger: 60,
      },
      {
        url: "http://nextpracticehealth.com/extension/goal/max-value",
        valueInteger: 80,
      },
    ],
  },
  {
    resourceType: "Goal",
    description: {
      text: "Blood Pressure",
    },
    id: "111",
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
    startDate: "2019-11-07",
    target: {
      measure: {
        coding: [
          {
            system: loincOrgURI,
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
                valueInteger: 100,
              },
              {
                url: "http://nextpracticehealth.com/extension/goal/max-value",
                valueInteger: 120,
              },
            ],
          },
          {
            system: "http://nextpracticehealth.com/BloodPressure/Diastolic",
            code: "60",
            extension: [
              {
                url: "http://nextpracticehealth.com/extension/goal/min-value",
                valueInteger: 50,
              },
              {
                url: "http://nextpracticehealth.com/extension/goal/max-value",
                valueInteger: 70,
              },
            ],
          },
        ],
        text: "112/60",
      },
      dueDate: "2020-02-07",
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

export const mockReasonForVisit: fhir3.Observation[] = [
  //observation:ReasonForVisit
  {
    code: {},

    // NOTE: this is cast as 'any' to handle stricter typings in fhir3 (STU3 spec) type namespace.
    // TODO: handling this as-is, but we should verify we're using in-spec status values where it matters:
    // (('registered'|'preliminary'|'final'|'amended'|'corrected'|'cancelled'|'entered-in-error'|'unknown'))
    status: "active" as any,
    resourceType: "Observation",
    id: "dev-iris_observation_1",
    meta: {
      versionId: "1",
      lastUpdated: "2021-11-15T22:47:49Z",
    },
    extension: [
      {
        url: observationTypeExtensionUrl,
        valueString: reasonForVisitDefinition.type,
      },
      {
        url: observationDisplayNameExtensionUrl,
        valueString: reasonForVisitDefinition.displayName,
      },
      {
        url: reviewItemExtensionUrl,
        valueBoolean: true,
      },
      {
        url: observationFormSlugExtensionUrl,
        valueString: MOCK_APPOINTMENT_FORM_SLUG,
      },
    ],
    identifier: [],
    category: [
      {
        coding: [
          {
            system: fhirObservationCategoryURI,
            code: reasonForVisitDefinition.category,
          },
        ],
      },
    ],
    subject: {
      reference: "Patient/dev-iris_patient_1",
    },
    effectiveDateTime: "2019-07-09T09:48:26+10:00",
    issued: "2019-07-09T09:48:26+10:00",
    performer: [
      {
        reference: "Patient/dev-iris_patient_1",
      },
    ],
    component: [
      {
        extension: [
          {
            url: observationComponentRawCodeExtensionUrl,
            valueString: appointmentFormPatientNoteLOINC,
          },
          {
            url: observationComponentDisplayNameExtensionUrl,
            valueString: reasonForVisitDefinition.displayName,
          },
        ],
        code: {
          coding: [
            {
              system: loincOrgURI,
              code: appointmentFormPatientNoteLOINC,
            },
          ],
        },
        valueString:
          '{"_reason":"Reason For Visit","reason":"Test","_timeAffectingHealth":"Time affecting health","timeAffectingHealth":"months","_discomfort":"Experiencing discomfort?","discomfort":"no","_soughtHelp":"Previously sought help","soughtHelp":"yes","_wherePatientSoughtHelp":"Where patient sought help","wherePatientSoughtHelp":"this practice","_previousTests":"Previous tests","previousTests":"yes","_otherHealthConcerns":"Other health concerns","otherHealthConcerns":"no"}',
      },
    ],
  },
];

export const mockTranscribeResource: fhir3.Observation[] = [
  {
    code: {},
    status: "unknown",
    resourceType: "Observation",
    id: "dev-iris_observation_1",
    meta: {
      versionId: "1",
      lastUpdated: "2021-11-15T22:47:49Z",
    },
    extension: [
      {
        url: observationTypeExtensionUrl,
        valueString: reasonForVisitDefinition.type,
      },
      {
        url: observationDisplayNameExtensionUrl,
        valueString: reasonForVisitDefinition.displayName,
      },
      {
        url: reviewItemExtensionUrl,
        valueBoolean: true,
      },
      {
        url: observationFormSlugExtensionUrl,
        valueString: MOCK_APPOINTMENT_FORM_SLUG,
      },
    ],
    identifier: [],
    category: [
      {
        coding: [
          {
            system: fhirObservationCategoryURI,
            code: reasonForVisitDefinition.category,
          },
        ],
      },
    ],
    subject: {
      reference: "Patient/dev-iris_patient_1",
    },
    effectiveDateTime: "2019-07-09T09:48:26+10:00",
    issued: "2019-07-09T09:48:26+10:00",
    performer: [
      {
        reference: "Patient/dev-iris_patient_1",
      },
    ],
    component: [
      {
        extension: [
          {
            url: observationComponentRawCodeExtensionUrl,
            valueString: appointmentFormPatientNoteLOINC,
          },
          {
            url: observationComponentDisplayNameExtensionUrl,
            valueString: reasonForVisitDefinition.displayName,
          },
        ],
        code: {
          coding: [
            {
              system: loincOrgURI,
              code: appointmentFormPatientNoteLOINC,
            },
          ],
        },
        valueString:
          '{"_reason":"Reason For Visit","reason":"Test","_timeAffectingHealth":"Time affecting health","timeAffectingHealth":"months","_discomfort":"Experiencing discomfort?","discomfort":"no","_soughtHelp":"Previously sought help","soughtHelp":"yes","_wherePatientSoughtHelp":"Where patient sought help","wherePatientSoughtHelp":"this practice","_previousTests":"Previous tests","previousTests":"yes","_otherHealthConcerns":"Other health concerns","otherHealthConcerns":"no"}',
      },
    ],
  },
];

export const mockObservationsSmoking: fhir3.Observation[] = [
  //MD13225-observation:Smoking
  {
    resourceType: "Observation",
    id: "dev-iris_observation_1",
    meta: {
      versionId: "1",
      lastUpdated: "2021-11-15T22:47:49Z",
    },
    identifier: [],
    status: "final",
    category: [
      {
        coding: [
          {
            system: fhirObservationCategoryURI,
            code: smokingDefinition.category,
          },
        ],
        text: "Social History",
      },
    ],
    code: {
      coding: [
        {
          system: loincOrgURI,
          code: smokingStatusNHISLOINC,
        },
      ],
      text: "Tobacco smoking status NHIS",
    },
    subject: {
      reference: "Patient/dev-iris_patient_1",
      display: "",
    },
    issued: "2019-07-09T00:27:04.891+00:00",
    component: [
      {
        code: {
          coding: [
            {
              system: loincOrgURI,
              code: smokingStatusNHISLOINC,
            },
          ],
        },
        valueString: "Former smoker",
        extension: [
          {
            url: observationComponentRawCodeExtensionUrl,
            valueString: smokingStatusRawCode,
          },
          {
            url: observationComponentDisplayNameExtensionUrl,
            valueString: smokingStatusDisplayName,
          },
        ],
      },
      {
        code: {
          coding: [
            {
              system: loincOrgURI,
              code: smokingFrequencyLOINC,
            },
          ],
        },
        valueString: "Some days",
        extension: [
          {
            url: observationComponentRawCodeExtensionUrl,
            valueString: smokingFrequencyLOINC,
          },
          {
            url: observationComponentDisplayNameExtensionUrl,
            valueString: smokingFrequencyDisplayName,
          },
        ],
      },
    ],
    extension: [
      {
        url: observationTypeExtensionUrl,
        valueString: smokingDefinition.type,
      },
      {
        url: observationDisplayNameExtensionUrl,
        valueString: smokingDefinition.displayName,
      },
    ],
  },
];

export const mockObservationsSmokingNoData: fhir3.Observation = {
  resourceType: "Observation",
  status: "final",
  code: {
    coding: [
      {
        system: loincOrgURI,
        code: smokingStatusNHISLOINC,
      },
    ],
  },
  extension: [
    {
      url: observationTypeExtensionUrl,
      valueString: smokingDefinition.type,
    },
    {
      url: observationDisplayNameExtensionUrl,
      valueString: "Smoking",
    },
  ],
};

export const mockObservationsAlcohol: fhir3.Observation[] = [
  //D13226-observation:Alcohol
  {
    resourceType: "Observation",
    id: "dev-iris_observation_1",
    meta: {
      versionId: "1",
      lastUpdated: "2021-11-15T22:47:49Z",
    },
    extension: [
      {
        url: observationTypeExtensionUrl,
        valueString: alcoholDefinition.type,
      },
      {
        url: observationDisplayNameExtensionUrl,
        valueString: alcoholDefinition.displayName,
      },
      {
        url: reviewItemExtensionUrl,
        valueBoolean: true,
      },
    ],
    identifier: [],
    status: "final",
    category: [
      {
        coding: [
          {
            system: fhirObservationCategoryURI,
            code: alcoholDefinition.category,
          },
        ],
        text: "Social History",
      },
    ],
    code: {
      coding: [
        {
          system: loincOrgURI,
          code: alcoholConsumptionTestLOINC,
        },
      ],
      text: "Alcohol Use Disorder Identification Test - Consumption [AUDIT-C]",
    },
    subject: {
      reference: "Patient/dev-iris_patient_1",
      display: "",
    },
    issued: "2019-07-09T00:27:07.809+00:00",
    component: [
      {
        code: {
          coding: [
            {
              system: loincOrgURI,
              code: alcoholFrequencyLOINC,
            },
          ],
        },
        valueString: "Monthly or less",
        extension: [
          {
            url: observationComponentRawCodeExtensionUrl,
            valueString: alcoholFrequencyLOINC,
          },
          {
            url: observationComponentDisplayNameExtensionUrl,
            valueString: alcoholFrequencyDisplayName,
          },
        ],
      },
      {
        code: {
          coding: [
            {
              system: loincOrgURI,
              code: alcoholQuantityLOINC,
            },
          ],
        },
        valueString: "1 or 2",
        extension: [
          {
            url: observationComponentRawCodeExtensionUrl,
            valueString: alcoholQuantityLOINC,
          },
          {
            url: observationComponentDisplayNameExtensionUrl,
            valueString: alcoholQuantityDisplayName,
          },
        ],
      },
      {
        code: {
          coding: [
            {
              system: loincOrgURI,
              code: alcoholStatusLOINC,
            },
          ],
        },
        valueString: "Non-Drinker",
        extension: [
          {
            url: observationComponentRawCodeExtensionUrl,
            valueString: alcoholStatusLOINC,
          },
          {
            url: observationComponentDisplayNameExtensionUrl,
            valueString: alcoholStatusDisplayName,
          },
        ],
      },
    ],
  },
];

// TODO: if this is meant to mock Helix metric entries (practitioner-recorded), we should probably update the subject,
// performer, and identifier URIs after the Helix adapter observation handling is complete (no Hub URIs)
export const mockObservationsBloodPressure: fhir3.Observation[] = [
  //MD13266-observation:BloodPressure
  {
    code: {},
    status: "final",
    resourceType: "Observation",
    id: "MD13266-observation:BloodPressure",
    meta: {
      versionId: "MD73112",
      lastUpdated: "2019-07-24T06:56:29.233+00:00",
    },
    identifier: [
      {
        system: "http://medicaldirector.com/hub/identifier/app-id",
        value: "77699511-0600-4ecc-8097-bf4d93998349",
      },
      {
        system: "http://medicaldirector.com/hub/identifier/tenant-id",
        value: "next-staging.helix.medicaldirector.com",
      },
      {
        system:
          "http://medicaldirector.com/hub/identifier/external/resource/object-id",
        value: "DIAG.MeasurementRows-5",
      },
    ],
    category: [
      {
        coding: [
          {
            system: fhirObservationCategoryURI,
            code: bloodPressureDefinition.type,
          },
        ],
      },
    ],
    subject: {
      reference:
        "https://integration-api.hub.medicaldirector.com/fhir/Patient/MD28786",
      display: "",
    },
    issued: "2019-07-24T16:56:14.932+10:00",
    performer: [
      {
        reference:
          "https://integration-api.hub.medicaldirector.com/fhir/Practitioner/MD14345",
        display: "",
      },
    ],
    component: [
      {
        code: {
          coding: [
            {
              system: loincOrgURI,
              code: systolicLOINC,
            },
          ],
        },
        valueQuantity: {
          value: 130,
          unit: bloodPressureUOM,
          system: unitsOfMeasureOrgURI,
          code: bloodPressureUOM,
        },
        extension: [
          {
            url: observationComponentRawCodeExtensionUrl,
            valueString: systolicRawCode,
          },
          {
            url: observationComponentDisplayNameExtensionUrl,
            valueString: systolicDisplayName,
          },
        ],
      },
      {
        code: {
          coding: [
            {
              system: loincOrgURI,
              code: diastolicLOINC,
            },
          ],
        },
        valueQuantity: {
          value: 80,
          unit: bloodPressureUOM,
          system: unitsOfMeasureOrgURI,
          code: bloodPressureUOM,
        },
        extension: [
          {
            url: observationComponentRawCodeExtensionUrl,
            valueString: diastolicRawCode,
          },
          {
            url: observationComponentDisplayNameExtensionUrl,
            valueString: diastolicDisplayName,
          },
        ],
      },
    ],
    context: {
      reference:
        "https://integration-api.hub.medicaldirector.com/fhir/Encounter/MD3828",
      display: "",
    },
    extension: [
      {
        url: observationTypeExtensionUrl,
        valueString: bloodPressureDefinition.type,
      },
      {
        url: observationDisplayNameExtensionUrl,
        valueString: bloodPressureDefinition.displayName,
      },
      {
        url: reviewItemExtensionUrl,
        valueBoolean: true,
      },
    ],
  },
];

// TODO: if this is meant to mock Helix metric entries (practitioner-recorded), we should probably update the subject,
// performer, and identifier URIs after the Helix adapter observation handling is complete (no Hub URIs)
export const mockObservationsHeartRate: fhir3.Observation[] = [
  //MD13266-observation:HeartRate
  {
    code: {},
    status: "final",
    resourceType: "Observation",
    id: "MD13266-observation:HeartRate",
    meta: {
      versionId: "MD73112",
      lastUpdated: "2019-07-24T06:56:29.233+00:00",
    },
    identifier: [
      {
        system: "http://medicaldirector.com/hub/identifier/app-id",
        value: "77699511-0600-4ecc-8097-bf4d93998349",
      },
      {
        system: "http://medicaldirector.com/hub/identifier/tenant-id",
        value: "next-staging.helix.medicaldirector.com",
      },
      {
        system:
          "http://medicaldirector.com/hub/identifier/external/resource/object-id",
        value: "DIAG.MeasurementRows-5",
      },
    ],
    category: [
      {
        coding: [
          {
            system: fhirObservationCategoryURI,
            code: heartRateDefinition.category,
          },
        ],
      },
    ],
    subject: {
      reference:
        "https://integration-api.hub.medicaldirector.com/fhir/Patient/MD28786",
      display: "",
    },
    issued: "2019-07-24T16:56:14.932+10:00",
    performer: [
      {
        reference:
          "https://integration-api.hub.medicaldirector.com/fhir/Practitioner/MD14345",
        display: "",
      },
    ],
    component: [
      {
        code: {
          coding: [
            {
              system: loincOrgURI,
              code: heartRateLOINC,
            },
          ],
        },
        valueQuantity: {
          value: 68,
          unit: heartRateUOM,
          system: unitsOfMeasureOrgURI,
          code: heartRateUOM,
        },
        extension: [
          {
            url: observationComponentRawCodeExtensionUrl,
            valueString: heartRateLOINC,
          },
          {
            url: observationComponentDisplayNameExtensionUrl,
            valueString: heartRateDefinition.displayName,
          },
        ],
      },
    ],
    context: {
      reference:
        "https://integration-api.hub.medicaldirector.com/fhir/Encounter/MD3828",
      display: "",
    },
    extension: [
      {
        url: observationTypeExtensionUrl,
        valueString: heartRateDefinition.type,
      },
      {
        url: observationDisplayNameExtensionUrl,
        valueString: heartRateDefinition.displayName,
      },
    ],
  },
];

export const mockMedicationRequests: fhir3.MedicationRequest[] = [
  //MedicationRequest
  {
    id: "6",
    resourceType: "MedicationRequest",
    identifier: [
      {
        system:
          "http://medicaldirector.com/hub/identifier/external/resource/object-id",
        value: "6",
      },
    ],
    meta: {
      lastUpdated: "2019-02-01T10:23:03+11:00",
    },
    medicationCodeableConcept: {
      coding: [
        {
          system: "https://helix.medicaldirector.com/Medication/ProductId",
          code: "14687",
        },
        {
          system:
            "https://helix.medicaldirector.com/Medication/ProductNameDoseFormStrengthId",
          code: "6400",
        },
      ],
      text: "IBUPROFEN/PARACETAMOL",
    },
    intent: "proposal",
    status: "active",
    subject: {
      identifier: {
        system: "https://helix.medicaldirector.com/Patient/PatientId",
        value: "7",
      },
      display: "",
    },
    dosageInstruction: [
      {
        text: "2 tablets twice a day",
        route: {
          text: "oral",
        },
        additionalInstruction: [
          {
            text: "tablet 150mg/500mg",
          },
        ],
      },
    ],
    authoredOn: "2019-02-01T10:23:03+11:00",
  },
  {
    id: "7",
    resourceType: "MedicationRequest",
    identifier: [
      {
        system:
          "http://medicaldirector.com/hub/identifier/external/resource/object-id",
        value: "7",
      },
    ],
    meta: {
      lastUpdated: "2021-02-01T10:23:03+11:00",
    },
    medicationCodeableConcept: {
      coding: [
        {
          system: "https://helix.medicaldirector.com/Medication/ProductId",
          code: "12329",
        },
        {
          system:
            "https://helix.medicaldirector.com/Medication/ProductNameDoseFormStrengthId",
          code: "3385",
        },
      ],
      text: "CODEINE PHOSPHATE",
    },
    intent: "proposal",
    status: "active",
    subject: {
      identifier: {
        system: "https://helix.medicaldirector.com/Patient/PatientId",
        value: "7",
      },
      display: "",
    },
    dosageInstruction: [
      {
        text: "1 daily",
        route: {
          text: "oral",
        },
        additionalInstruction: [
          {
            text: "tablet 30mg",
          },
        ],
      },
    ],
    authoredOn: "2021-02-01T10:23:03+11:00",
  },
];

export const mockObservationsWeight: fhir3.Observation[] = [
  {
    code: {},
    status: "final",
    resourceType: "Observation",
    category: [
      {
        coding: [
          {
            system: fhirObservationCategoryURI,
            code: weightDefinition.category,
          },
        ],
      },
    ],
    subject: {
      reference: "Patient/dev-iris_patient_1",
      display: "",
    },
    performer: [
      {
        reference: "Patient/dev-iris_patient_1",
        display: "",
      },
    ],
    component: [
      {
        code: {
          coding: [
            {
              system: loincOrgURI,
              code: weightLOINC,
            },
          ],
        },
        valueQuantity: {
          value: 51,
          unit: weightUOM,
          system: unitsOfMeasureOrgURI,
          code: weightUOM,
        },
        extension: [
          {
            url: observationComponentRawCodeExtensionUrl,
            valueString: weightLOINC,
          },
          {
            url: observationComponentDisplayNameExtensionUrl,
            valueString: weightDisplayName,
          },
        ],
      },
    ],
    extension: [
      {
        url: observationTypeExtensionUrl,
        valueString: weightDefinition.type,
      },
      {
        url: observationDisplayNameExtensionUrl,
        valueString: weightDefinition.displayName,
      },
      {
        url: reviewItemExtensionUrl,
        valueBoolean: true,
      },
    ],
    effectiveDateTime: "2020-05-21T15:19:26+10:00",
    issued: "2020-05-21T15:19:26+10:00",
    id: "9656738a-0b22-400a-91fc-342be003b97b",
  },
  {
    code: {},
    status: "final",
    resourceType: "Observation",
    category: [
      {
        coding: [
          {
            system: fhirObservationCategoryURI,
            code: weightDefinition.category,
          },
        ],
      },
    ],
    subject: {
      reference: "Patient/dev-iris_patient_1",
      display: "",
    },
    performer: [
      {
        reference: "Patient/dev-iris_patient_1",
        display: "",
      },
    ],
    component: [
      {
        code: {
          coding: [
            {
              system: loincOrgURI,
              code: weightLOINC,
            },
          ],
        },
        valueQuantity: {
          value: 52.7,
          unit: weightUOM,
          system: unitsOfMeasureOrgURI,
          code: weightUOM,
        },
        extension: [
          {
            url: observationComponentRawCodeExtensionUrl,
            valueString: weightLOINC,
          },
          {
            url: observationComponentDisplayNameExtensionUrl,
            valueString: weightDisplayName,
          },
        ],
      },
    ],
    extension: [
      {
        url: observationTypeExtensionUrl,
        valueString: weightDefinition.type,
      },
      {
        url: observationDisplayNameExtensionUrl,
        valueString: weightDefinition.displayName,
      },
      {
        url: reviewItemExtensionUrl,
        valueBoolean: true,
      },
    ],
    effectiveDateTime: "2020-06-21T15:19:26+10:00",
    issued: "2020-06-21T15:19:26+10:00",
    id: "9656738a-0b22-400a-91fc-342be003b97c",
  },
];

export const mockObservationsStepsCount: fhir3.Observation[] = [
  {
    code: {
      coding: [
        {
          system: loincOrgURI,
          code: stepsCountLOINC,
          display: stepsCountDisplayName,
        },
      ],
      text: "Step count",
    },
    status: "final",
    resourceType: "Observation",
    category: [
      {
        coding: [
          {
            system: fhirObservationCategoryURI,
            code: stepsCountDefinition.category,
          },
        ],
      },
    ],
    subject: {
      reference: "Patient/dev-iris_patient_1",
      display: "",
    },
    performer: [
      {
        reference: "Patient/dev-iris_patient_1",
        display: "",
      },
    ],
    component: [
      {
        code: {
          coding: [
            {
              system: loincOrgURI,
              code: stepsCountLOINC,
            },
          ],
        },
        valueQuantity: {
          value: 5789,
          unit: stepsCountUOM,
          system: unitsOfMeasureOrgURI,
          code: stepsCountUOMCode,
        },
        extension: [
          {
            url: observationComponentRawCodeExtensionUrl,
            valueString: stepsCountLOINC,
          },
          {
            url: observationComponentDisplayNameExtensionUrl,
            valueString: stepsCountDisplayName,
          },
        ],
      },
    ],
    extension: [
      {
        url: observationTypeExtensionUrl,
        valueString: stepsCountDefinition.type,
      },
      {
        url: observationDisplayNameExtensionUrl,
        valueString: stepsCountDefinition.displayName,
      },
      {
        url: reviewItemExtensionUrl,
        valueBoolean: true,
      },
    ],
    effectiveDateTime: "2020-05-21T15:19:26+10:00",
    issued: "2020-05-21T15:19:26+10:00",
    id: "9656738a-0b22-400a-91fc-342be003b97b",
  },
];

// TODO: these mockNotes have no subject--we'd take these in IRIS, but they'd be orphans,
// no way to link to a patient...
export const mockNotes: fhir3.Observation[] = [
  {
    code: {},
    resourceType: "Observation",
    id: "MD33556",
    status: "final",
    effectiveDateTime: "2019-01-20T14:43:40+11:00",
    issued: "2020-01-20T14:43:40+11:00",
    component: [
      {
        code: {
          coding: [
            {
              system: loincOrgURI,
              code: patientNoteLOINC,
            },
          ],
        },
        valueString:
          "Remember to take your medication regularly and set up Diary tracking in the app",
      },
    ],
    extension: [
      {
        url: observationTypeExtensionUrl,
        valueString: noteToPatientDefinition.type,
      },
      {
        url: observationDisplayNameExtensionUrl,
        valueString: noteToPatientDefinition.displayName,
      },
    ],
    performer: [
      {
        reference:
          "https://api.hub.medicaldirector.com/fhir/Practitioner/MD14396",
        display: "Dr Torben Sko",
      },
    ],
  },
  {
    code: {},
    resourceType: "Observation",
    id: "MD33557",
    meta: {
      versionId: "MD923199",
      lastUpdated: "2020-01-20T03:45:29.557+00:00",
    },
    status: "final",
    effectiveDateTime: "2020-01-20T14:45:29+11:00",
    issued: "2020-01-20T14:45:29+11:00",
    component: [
      {
        code: {
          coding: [
            {
              system: loincOrgURI,
              code: patientNoteLOINC,
            },
          ],
        },
        valueString:
          "It would be great if you can checkout the health guidelines on nutritional information and adjust your diet accordingly. We can discuss together at the time of your next appointment.",
      },
    ],
    extension: [
      {
        url: observationTypeExtensionUrl,
        valueString: noteToPatientDefinition.type,
      },
      {
        url: observationDisplayNameExtensionUrl,
        valueString: noteToPatientDefinition.displayName,
      },
    ],
    performer: [
      {
        reference:
          "https://api.hub.medicaldirector.com/fhir/Practitioner/MD14396",
        display: "Dr Torben Sko",
      },
    ],
  },
  {
    code: {},
    resourceType: "Observation",
    id: "MD33565",
    status: "final",
    effectiveDateTime: "2020-01-22T14:15:05+11:00",
    issued: "2020-01-22T14:15:05+11:00",
    component: [
      {
        code: {
          coding: [
            {
              system: loincOrgURI,
              code: patientNoteLOINC,
            },
          ],
        },
        valueString:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
    ],
    extension: [
      {
        url: observationTypeExtensionUrl,
        valueString: noteToPatientDefinition.type,
      },
      {
        url: observationDisplayNameExtensionUrl,
        valueString: noteToPatientDefinition.displayName,
      },
    ],
    performer: [
      {
        reference:
          "https://api.hub.medicaldirector.com/fhir/Practitioner/MD14396",
        display: "Dr Torben Sko",
      },
    ],
  },
  {
    code: {},
    resourceType: "Observation",
    id: "MD33566",
    status: "final",
    effectiveDateTime: "2020-01-22T14:15:05+11:00",
    issued: "2020-01-22T14:15:05+11:00",
    component: [
      {
        code: {
          coding: [
            {
              system: loincOrgURI,
              code: patientNoteLOINC,
            },
          ],
        },
        valueString:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
    ],
    extension: [
      {
        url: observationTypeExtensionUrl,
        valueString: noteToPatientDefinition.type,
      },
      {
        url: observationDisplayNameExtensionUrl,
        valueString: noteToPatientDefinition.displayName,
      },
    ],
    performer: [
      {
        reference:
          "https://api.hub.medicaldirector.com/fhir/Practitioner/MD14396",
        display: "Dr Torben Sko",
      },
    ],
  },
  {
    code: {},
    resourceType: "Observation",
    id: "MD33567",
    status: "final",
    effectiveDateTime: "2020-01-22T14:15:05+11:00",
    issued: "2020-01-22T14:15:05+11:00",
    component: [
      {
        code: {
          coding: [
            {
              system: loincOrgURI,
              code: patientNoteLOINC,
            },
          ],
        },
        valueString:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
    ],
    extension: [
      {
        url: observationTypeExtensionUrl,
        valueString: noteToPatientDefinition.type,
      },
      {
        url: observationDisplayNameExtensionUrl,
        valueString: noteToPatientDefinition.displayName,
      },
    ],
    performer: [
      {
        reference:
          "https://api.hub.medicaldirector.com/fhir/Practitioner/MD14396",
        display: "Dr Torben Sko",
      },
    ],
  },
];

// TODO: Consider adding Metric Definitions (next-shared/src/fhirUtil/fhirObservations/metricDefinitions) for any patientForms
// that are ubiquitous enough to warrant it (e.g. they need to be handled with specific EHR-related transforms in next-connect etc)
export const mockPatientForms: fhir3.Observation[] = [
  {
    id: "mock-patient-note-1",
    resourceType: "Observation",
    status: "final",
    meta: {
      versionId: "MD73665",
      lastUpdated: "2019-11-22T06:29:53.834+00:00",
    },
    code: {
      coding: [
        {
          code: "44249-1",
        },
      ],
    },
    extension: [
      {
        url: observationTypeExtensionUrl,
        valueString: MedicalResourceType.PatientForm,
      },
      {
        url: observationDisplayNameExtensionUrl,
        valueString: "K-10",
      },
      {
        url: observationFormSlugExtensionUrl,
        valueString: "k10",
      },
    ],
    component: [
      {
        code: {
          coding: [
            {
              code: "44249-1",
            },
          ],
        },
        valueString:
          '{"question1":{"score":5,"label":"All of the time"},"question2":{"score":5,"label":"All of the time"},"question3":{"score":5,"label":"All of the time"},"question4":{"score":5,"label":"All of the time"},"question5":{"score":5,"label":"All of the time"},"question6":{"score":5,"label":"All of the time"},"question7":{"score":5,"label":"All of the time"},"question8":{"score":5,"label":"All of the time"},"question9":{"score":5,"label":"All of the time"},"question10":{"score":5,"label":"All of the time"},"score":{"score":50,"grade":"Likely to have a severe disorder"}}',
      },
    ],
  },
  {
    resourceType: "Observation",
    id: "mock-patient-k10",
    status: "final",
    meta: {
      versionId: "MD953753",
      lastUpdated: "2021-04-15T05:29:47.594+00:00",
    },
    extension: [
      {
        url: observationFormSlugExtensionUrl,
        valueString: "k-10",
      },
      {
        url: observationDisplayNameExtensionUrl,
        valueString: "K10",
      },
      {
        url: observationTypeExtensionUrl,
        valueString: MedicalResourceType.PatientForm,
      },
    ],
    code: {
      coding: [
        {
          code: "94022-1",
        },
      ],
    },
    subject: {
      reference:
        "https://integration-api.hub.medicaldirector.com/fhir/Patient/MD53168",
    },
    effectiveDateTime: "2020-12-24T15:21:22+11:00",
    issued: "2020-12-24T15:21:22+11:00",
    performer: [
      {
        reference:
          "https://api.hub.medicaldirector.com/fhir/Practitioner/MD14396",
        display: "Dr Torben Sko",
      },
    ],
    component: [
      {
        code: {
          coding: [
            {
              code: "94022-1",
            },
          ],
        },
        valueString:
          '{"question1":{"score":5,"label":"All of the time"},"question2":{"score":5,"label":"All of the time"},"question3":{"score":5,"label":"All of the time"},"question4":{"score":5,"label":"All of the time"},"question5":{"score":5,"label":"All of the time"},"question6":{"score":5,"label":"All of the time"},"question7":{"score":5,"label":"All of the time"},"question8":{"score":5,"label":"All of the time"},"question9":{"score":5,"label":"All of the time"},"question10":{"score":5,"label":"All of the time"},"score":{"score":50,"grade":"Likely to have a severe disorder"}}',
      },
    ],
  },
];

// HACK remove any personal details from this
export const mockImageObservations: fhir3.Observation[] = [
  {
    resourceType: "Observation",
    id: "MD36282",
    meta: {
      versionId: "MD972711",
      lastUpdated: "2022-01-12T10:44:28.65+00:00",
    },
    extension: [
      {
        url: "http://nextpracticehealth.com/extension/device-type",
        valueString: "undefined",
      },
      {
        url: "http://nextpracticehealth.com/extension/observation/medical-resource-type",
        valueString: "observation:Image",
      },
      {
        url: "http://nextpracticehealth.com/extension/observation/display-name",
        valueString: "Image",
      },
    ],
    identifier: [
      {
        system: "http://medicaldirector.com/hub/identifier/tenant-id",
        value: "nextpracticedev.com.au",
      },
      {
        system: "http://medicaldirector.com/hub/identifier/app-id",
        value: "5ba26872-7df7-45af-a7c1-a63cf55169ea",
      },
      {
        system: "http://nextpracticehealth.com/identifier/origin-ehr-id",
        value: "c80b11e8-44b5-4ff4-9085-66a491002bf0",
      },
      {
        system: "http://nextpracticehealth.com/identifier/origin-location-slug",
        value: "next-head-office-dev",
      },
    ],
    status: "final",
    category: [
      {
        coding: [
          {
            system: "http://hl7.org/fhir/ValueSet/observation-category",
            code: "imaging",
          },
        ],
        text: "Imaging",
      },
    ],
    code: {
      coding: [{ system: "http://loinc.org/", code: "72170-4" }],
      text: "Photo",
    },
    subject: {
      reference:
        "https://integration-api.hub.medicaldirector.com/fhir/Patient/MD61410",
    },
    effectiveDateTime: "2022-01-12T10:44:28Z",
    issued: "2022-01-12T10:44:28+00:00",
    performer: [
      {
        reference:
          "https://api.hub.medicaldirector.com/fhir/Practitioner/MD14396",
        display: "Dr Torben Sko",
      },
    ],
    component: [
      {
        extension: [
          {
            url: "http://nextpracticehealth.com/extension/observation/component-raw-code",
            valueString: "72170-4",
          },
          {
            url: "http://nextpracticehealth.com/extension/observation/component-display-name",
            valueString: "Photographic image",
          },
        ],
        code: { coding: [{ system: "http://loinc.org/", code: "72170-4" }] },
        valueString:
          "https://sydintegrationstorage.blob.core.windows.net/7130c795-760f-4d63-900a-2b4562d136b0/88bf0591-c3e7-46b5-a548-032ffd59bdc3",
      },
    ],
  },
  {
    resourceType: "Observation",
    id: "MD36283",
    meta: {
      versionId: "MD972712",
      lastUpdated: "2022-01-12T11:42:25.519+00:00",
    },
    extension: [
      {
        url: "http://nextpracticehealth.com/extension/device-type",
        valueString: "undefined",
      },
      {
        url: "http://nextpracticehealth.com/extension/observation/medical-resource-type",
        valueString: "observation:Image",
      },
      {
        url: "http://nextpracticehealth.com/extension/observation/display-name",
        valueString: "Image",
      },
    ],
    identifier: [
      {
        system: "http://medicaldirector.com/hub/identifier/tenant-id",
        value: "nextpracticedev.com.au",
      },
      {
        system: "http://medicaldirector.com/hub/identifier/app-id",
        value: "5ba26872-7df7-45af-a7c1-a63cf55169ea",
      },
      {
        system: "http://nextpracticehealth.com/identifier/origin-ehr-id",
        value: "c80b11e8-44b5-4ff4-9085-66a491002bf0",
      },
      {
        system: "http://nextpracticehealth.com/identifier/origin-location-slug",
        value: "next-head-office-dev",
      },
    ],
    status: "final",
    category: [
      {
        coding: [
          {
            system: "http://hl7.org/fhir/ValueSet/observation-category",
            code: "imaging",
          },
        ],
        text: "Imaging",
      },
    ],
    code: {
      coding: [{ system: "http://loinc.org/", code: "72170-4" }],
      text: "Photo",
    },
    subject: {
      reference:
        "https://integration-api.hub.medicaldirector.com/fhir/Patient/MD61410",
    },
    effectiveDateTime: "2022-01-12T11:42:25Z",
    issued: "2022-01-12T11:42:25+00:00",
    performer: [
      {
        reference:
          "https://api.hub.medicaldirector.com/fhir/Practitioner/MD14396",
        display: "Dr Torben Sko",
      },
    ],
    component: [
      {
        extension: [
          {
            url: "http://nextpracticehealth.com/extension/observation/component-raw-code",
            valueString: "72170-4",
          },
          {
            url: "http://nextpracticehealth.com/extension/observation/component-display-name",
            valueString: "Photographic image",
          },
        ],
        code: { coding: [{ system: "http://loinc.org/", code: "72170-4" }] },
        valueString:
          "https://sydintegrationstorage.blob.core.windows.net/7130c795-760f-4d63-900a-2b4562d136b0/bf774d74-c2b7-45a5-910b-c3213faa7c9a",
      },
    ],
  },
  {
    resourceType: "Observation",
    id: "MD36284",
    meta: {
      versionId: "MD972713",
      lastUpdated: "2022-01-12T11:49:22.759+00:00",
    },
    extension: [
      {
        url: "http://nextpracticehealth.com/extension/device-type",
        valueString: "undefined",
      },
      {
        url: "http://nextpracticehealth.com/extension/observation/medical-resource-type",
        valueString: "observation:Image",
      },
      {
        url: "http://nextpracticehealth.com/extension/observation/display-name",
        valueString: "Image",
      },
    ],
    identifier: [
      {
        system: "http://medicaldirector.com/hub/identifier/tenant-id",
        value: "nextpracticedev.com.au",
      },
      {
        system: "http://medicaldirector.com/hub/identifier/app-id",
        value: "5ba26872-7df7-45af-a7c1-a63cf55169ea",
      },
      {
        system: "http://nextpracticehealth.com/identifier/origin-ehr-id",
        value: "c80b11e8-44b5-4ff4-9085-66a491002bf0",
      },
      {
        system: "http://nextpracticehealth.com/identifier/origin-location-slug",
        value: "next-head-office-dev",
      },
    ],
    status: "final",
    category: [
      {
        coding: [
          {
            system: "http://hl7.org/fhir/ValueSet/observation-category",
            code: "imaging",
          },
        ],
        text: "Imaging",
      },
    ],
    code: {
      coding: [{ system: "http://loinc.org/", code: "72170-4" }],
      text: "Photo",
    },
    subject: {
      reference:
        "https://integration-api.hub.medicaldirector.com/fhir/Patient/MD61410",
    },
    effectiveDateTime: "2022-01-12T11:49:16Z",
    issued: "2022-01-12T11:49:16+00:00",
    performer: [
      {
        reference:
          "https://api.hub.medicaldirector.com/fhir/Practitioner/MD14396",
        display: "Dr Torben Sko",
      },
    ],
    component: [
      {
        extension: [
          {
            url: "http://nextpracticehealth.com/extension/observation/component-raw-code",
            valueString: "72170-4",
          },
          {
            url: "http://nextpracticehealth.com/extension/observation/component-display-name",
            valueString: "Photographic image",
          },
        ],
        code: { coding: [{ system: "http://loinc.org/", code: "72170-4" }] },
        valueString:
          "https://sydintegrationstorage.blob.core.windows.net/7130c795-760f-4d63-900a-2b4562d136b0/0766e66c-ca9f-40a2-99ba-ae448b5a757b",
      },
    ],
  },
  {
    resourceType: "Observation",
    id: "MD36287",
    meta: {
      versionId: "MD972716",
      lastUpdated: "2022-01-12T22:42:21.954+00:00",
    },
    extension: [
      {
        url: "http://nextpracticehealth.com/extension/device-type",
        valueString: "undefined",
      },
      {
        url: "http://nextpracticehealth.com/extension/observation/medical-resource-type",
        valueString: "observation:Image",
      },
      {
        url: "http://nextpracticehealth.com/extension/observation/display-name",
        valueString: "Image",
      },
    ],
    identifier: [
      {
        system: "http://medicaldirector.com/hub/identifier/tenant-id",
        value: "nextpracticedev.com.au",
      },
      {
        system: "http://medicaldirector.com/hub/identifier/app-id",
        value: "5ba26872-7df7-45af-a7c1-a63cf55169ea",
      },
      {
        system: "http://nextpracticehealth.com/identifier/origin-ehr-id",
        value: "c80b11e8-44b5-4ff4-9085-66a491002bf0",
      },
      {
        system: "http://nextpracticehealth.com/identifier/origin-location-slug",
        value: "next-head-office-dev",
      },
    ],
    status: "final",
    category: [
      {
        coding: [
          {
            system: "http://hl7.org/fhir/ValueSet/observation-category",
            code: "imaging",
          },
        ],
        text: "Imaging",
      },
    ],
    code: {
      coding: [{ system: "http://loinc.org/", code: "72170-4" }],
      text: "Photo",
    },
    subject: {
      reference:
        "https://integration-api.hub.medicaldirector.com/fhir/Patient/MD61410",
    },
    effectiveDateTime: "2022-01-12T22:42:21Z",
    issued: "2022-01-12T22:42:21+00:00",
    performer: [
      {
        reference:
          "https://api.hub.medicaldirector.com/fhir/Practitioner/MD14396",
        display: "Dr Torben Sko",
      },
    ],
    component: [
      {
        extension: [
          {
            url: "http://nextpracticehealth.com/extension/observation/component-raw-code",
            valueString: "72170-4",
          },
          {
            url: "http://nextpracticehealth.com/extension/observation/component-display-name",
            valueString: "Photographic image",
          },
        ],
        code: { coding: [{ system: "http://loinc.org/", code: "72170-4" }] },
        valueString:
          "https://sydintegrationstorage.blob.core.windows.net/7130c795-760f-4d63-900a-2b4562d136b0/829dca9d-37bd-4f73-a02e-a34ad4a9bebb",
      },
    ],
  },
  {
    resourceType: "Observation",
    id: "MD36288",
    meta: {
      versionId: "MD972717",
      lastUpdated: "2022-01-12T22:43:42.745+00:00",
    },
    extension: [
      {
        url: "http://nextpracticehealth.com/extension/device-type",
        valueString: "undefined",
      },
      {
        url: "http://nextpracticehealth.com/extension/observation/medical-resource-type",
        valueString: "observation:Image",
      },
      {
        url: "http://nextpracticehealth.com/extension/observation/display-name",
        valueString: "Image",
      },
    ],
    identifier: [
      {
        system: "http://medicaldirector.com/hub/identifier/tenant-id",
        value: "nextpracticedev.com.au",
      },
      {
        system: "http://medicaldirector.com/hub/identifier/app-id",
        value: "5ba26872-7df7-45af-a7c1-a63cf55169ea",
      },
      {
        system: "http://nextpracticehealth.com/identifier/origin-ehr-id",
        value: "c80b11e8-44b5-4ff4-9085-66a491002bf0",
      },
      {
        system: "http://nextpracticehealth.com/identifier/origin-location-slug",
        value: "next-head-office-dev",
      },
    ],
    status: "final",
    category: [
      {
        coding: [
          {
            system: "http://hl7.org/fhir/ValueSet/observation-category",
            code: "imaging",
          },
        ],
        text: "Imaging",
      },
    ],
    code: {
      coding: [{ system: "http://loinc.org/", code: "72170-4" }],
      text: "Photo",
    },
    subject: {
      reference:
        "https://integration-api.hub.medicaldirector.com/fhir/Patient/MD61410",
    },
    effectiveDateTime: "2022-01-12T22:43:42Z",
    issued: "2022-01-12T22:43:42+00:00",
    performer: [
      {
        reference:
          "https://api.hub.medicaldirector.com/fhir/Practitioner/MD14396",
        display: "Dr Torben Sko",
      },
    ],
    component: [
      {
        extension: [
          {
            url: "http://nextpracticehealth.com/extension/observation/component-raw-code",
            valueString: "72170-4",
          },
          {
            url: "http://nextpracticehealth.com/extension/observation/component-display-name",
            valueString: "Photographic image",
          },
        ],
        code: { coding: [{ system: "http://loinc.org/", code: "72170-4" }] },
        valueString:
          "https://sydintegrationstorage.blob.core.windows.net/7130c795-760f-4d63-900a-2b4562d136b0/9d345cd9-36af-4d63-bb1c-82e717bd8b17",
      },
    ],
  },
];

type TypedPatientResources = {
  [x in MedicalResourceType]: PatientMedicalResource[];
};

export const mockPatientResources: TypedPatientResources = {
  [MedicalResourceType.Goal]: mockGoals,
  [MedicalResourceType.ReasonForVisit]: mockReasonForVisit,
  [MedicalResourceType.MedicationRequest]: mockMedicationRequests,
  [MedicalResourceType.AllObservations]: [].concat(
    mockReasonForVisit,
    mockObservationsHeartRate,
    mockObservationsBloodPressure,
    mockObservationsWeight,
    mockNotes,
  ),
  [MedicalResourceType.NoteToPatient]: mockNotes,
  [MedicalResourceType.OnboardingForm]: [],
  [MedicalResourceType.HeartRate]: mockObservationsHeartRate,
  [MedicalResourceType.Height]: [],
  [MedicalResourceType.HipCircumference]: [],
  [MedicalResourceType.WaistCircumference]: [],
  [MedicalResourceType.Temperature]: [],
  [MedicalResourceType.Weight]: mockObservationsWeight,
  [MedicalResourceType.StepsCount]: mockObservationsStepsCount,
  [MedicalResourceType.Smoking]: mockObservationsSmoking,
  [MedicalResourceType.Alcohol]: mockObservationsAlcohol,
  [MedicalResourceType.BloodPressure]: mockObservationsBloodPressure,
  [MedicalResourceType.Image]: [],
  [MedicalResourceType.PatientForm]: mockPatientForms,
};
