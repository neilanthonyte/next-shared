import * as _ from "lodash";
import * as faker from "faker";
import * as uuid from "uuid";

import { MedicalResourceType } from "next-shared/src/types/types";
import {
  EFormFieldLayoutType,
  EFormType,
  IFormDetailsMixed,
  IFormDetailsMulti,
  IFormDetailsMultiSection,
  IFormDetailsSingle,
  IFormSummary,
} from "next-shared/src/types/formTypes";
import {
  smokingFrequencyLOINC,
  smokingQuantityLOINC,
  smokingStatusNHISLOINC,
} from "../fhirUtil/fhirObservations/metricDefinitions/smoking";
import {
  alcoholFrequencyLOINC,
  alcoholQuantityLOINC,
  alcoholStatusLOINC,
} from "../fhirUtil/fhirObservations/metricDefinitions/alcohol";
import {
  appointmentFormPatientNoteLOINC,
  auPatientProfileMedicareSystem,
  auPatientProfileVersion,
  extensionPatientCentreLink,
  extensionPatientDVA,
} from "../helpers/constants";

export const MOCK_APPOINTMENT_PATIENT_CONDITIONALS_FORM_KEY =
  "MOCK_APPOINTMENT_PATIENT_CONDITIONALS_FORM_KEY";
export const MOCK_APPOINTMENT_FORM_SLUG = "MOCK_APPOINTMENT_FORM_SLUG";

const patientConditionalsFormSchema: IFormDetailsSingle = {
  title: "[Test] Patient conditionals form",
  description: "Tests patient conditionals.",
  data: "Patient",
  type: EFormType.Single,
  transformers: [
    {
      type: "passThrough",
      path: "Patient.gender",
      dest: "gender.valueString",
      direction: "in",
    },
    {
      path: "observation:ReasonForVisit.extension",
      filter: "url=http://nextpracticehealth.com/extension/observation/Gender",
      type: "arrayToField",
      dest: "gender",
    },
    {
      type: "arrayToField",
      path: "Patient.extension",
      filter:
        "url=http://hl7.org.au/fhir/StructureDefinition/indigenous-status",
      src: "valueCoding.code",
      dest: "aboriginalTorresStraitIslanderStatus.valueString",
      direction: "in",
    },
    {
      path: "observation:ReasonForVisit.extension",
      filter:
        "url=http://hl7.org.au/fhir/StructureDefinition/indigenous-status",
      type: "arrayToField",
      dest: "aboriginalTorresStraitIslanderStatus",
    },
    {
      type: "passThrough",
      path: "Patient.birthDate",
      dest: "age.valueString",
      direction: "in",
    },
    {
      path: "observation:ReasonForVisit.extension",
      filter: "url=http://nextpracticehealth.com/extension/observation/Age",
      type: "arrayToField",
      dest: "age",
    },
    {
      type: "arrayToField",
      path: "observation:ReasonForVisit.extension",
      filter:
        "url=http://nextpracticehealth.com/extension/observation/form-slug",
      dest: "slug",
    },
    {
      type: "arrayToField",
      path: "observation:ReasonForVisit.extension",
      filter:
        "url=http://nextpracticehealth.com/extension/observation/display-name",
      dest: "title",
    },
    {
      type: "arrayToField",
      path: "observation:ReasonForVisit.component",
      filter: `code.coding.0.code=${appointmentFormPatientNoteLOINC}`,
      dest: "test-patient-conditionals-fields",
      src: "valueString",
      asJson: true,
    },
  ],
  fields: [
    {
      type: "hidden",
      map: "$gender.valueString",
    },
    {
      type: "hidden",
      map: "$aboriginalTorresStraitIslanderStatus.valueString",
    },
    {
      type: "hidden",
      map: "$age.valueString",
    },
    {
      type: "hidden",
      map: "observation:ReasonForVisit.id",
    },
    {
      type: "hidden",
      map: "$slug.valueString",
      defaultValue: "test-patient-conditionals",
    },
    {
      type: "hidden",
      map: "$title.valueString",
      defaultValue: "[Test] Patient conditionals form",
    },
    {
      type: "hidden",
      map: "observation:ReasonForVisit.code.coding.0.code",
      defaultValue: appointmentFormPatientNoteLOINC,
    },
    {
      type: "group",
      map: "$test-patient-conditionals-fields",
      fields: [
        {
          label: "Female Conditional",
          type: "text",
          required: false,
          map: "test-patient-conditionals-Female-Conditional",
          noteLabel: null,
          description: null,
          conditional: {
            condition: "gender",
            gender: "female",
            path: "../../$gender.valueString",
            type: "visible",
          },
          allowNewlines: false,
        },
        {
          label: "Male Conditional",
          type: "text",
          required: false,
          map: "test-patient-conditionals-Male-Conditional",
          noteLabel: null,
          description: null,
          conditional: {
            condition: "gender",
            gender: "male",
            path: "../../$gender.valueString",
            type: "visible",
          },
          allowNewlines: false,
        },
        {
          label: "Not Female or Male Conditional",
          type: "text",
          required: false,
          map: "test-patient-conditionals-Not-Female-or-Male-Conditional",
          noteLabel: null,
          description: null,
          conditional: {
            condition: "gender",
            gender: "other",
            path: "../../$gender.valueString",
            type: "visible",
          },
          allowNewlines: false,
        },
        {
          label: "Aboriginal Conditional",
          type: "text",
          required: false,
          map: "test-patient-conditionals-Aboriginal-Conditional",
          noteLabel: null,
          description: null,
          conditional: {
            condition: "atsi",
            atsiStatus: "1",
            path: "../../$aboriginalTorresStraitIslanderStatus.valueString",
            type: "visible",
          },
          allowNewlines: false,
        },
        {
          label: "Torres Strait Islander Conditional",
          type: "text",
          required: false,
          map: "test-patient-conditionals-Torres-Strait-Islander-Conditional",
          noteLabel: null,
          description: null,
          conditional: {
            condition: "atsi",
            atsiStatus: "2",
            path: "../../$aboriginalTorresStraitIslanderStatus.valueString",
            type: "visible",
          },
          allowNewlines: false,
        },
        {
          label: "Aboriginal and Torres Strait Islander Conditional",
          type: "text",
          required: false,
          map: "test-patient-conditionals-Aboriginal-and-Torres-Strait-Islander-Conditional",
          noteLabel: null,
          description: null,
          conditional: {
            condition: "atsi",
            atsiStatus: "3",
            path: "../../$aboriginalTorresStraitIslanderStatus.valueString",
            type: "visible",
          },
          allowNewlines: false,
        },
        {
          label: "Not Aboriginal or Torres Strait Islander Conditional",
          type: "text",
          required: false,
          map: "test-patient-conditionals-Not-Aboriginal-or-Torres-Strait-Islander-Conditional",
          noteLabel: null,
          description: null,
          conditional: {
            condition: "atsi",
            atsiStatus: "4",
            path: "../../$aboriginalTorresStraitIslanderStatus.valueString",
            type: "visible",
          },
          allowNewlines: false,
        },
        {
          label: "Under 16 Conditional",
          type: "text",
          required: false,
          map: "test-patient-conditionals-Under-16-Conditional",
          noteLabel: null,
          description: null,
          conditional: {
            condition: "age",
            maxAge: 16,
            path: "../../$age.valueString",
            type: "visible",
          },
          allowNewlines: false,
        },
        {
          label: "Over 16 Conditional",
          type: "text",
          required: false,
          map: "test-patient-conditionals-Over-16-Conditional",
          noteLabel: null,
          description: null,
          conditional: {
            condition: "age",
            minAge: 16,
            path: "../../$age.valueString",
            type: "visible",
          },
          allowNewlines: false,
        },
        {
          label: "Under 18 Conditional",
          type: "text",
          required: false,
          map: "test-patient-conditionals-Under-18-Conditional",
          noteLabel: null,
          description: null,
          conditional: {
            condition: "age",
            maxAge: 18,
            path: "../../$age.valueString",
            type: "visible",
          },
          allowNewlines: false,
        },
        {
          label: "Over 18 Conditional",
          type: "text",
          required: false,
          map: "test-patient-conditionals-Over-18-Conditional",
          noteLabel: null,
          description: null,
          conditional: {
            condition: "age",
            minAge: 18,
            path: "../../$age.valueString",
            type: "visible",
          },
          allowNewlines: false,
        },
        {
          label: "Under 65 Conditional",
          type: "text",
          required: false,
          map: "test-patient-conditionals-Under-65-Conditional",
          noteLabel: null,
          description: null,
          conditional: {
            condition: "age",
            maxAge: 65,
            path: "../../$age.valueString",
            type: "visible",
          },
          allowNewlines: false,
        },
        {
          label: "Over 65 Conditional",
          type: "text",
          required: false,
          map: "test-patient-conditionals-Over-65-Conditional",
          noteLabel: null,
          description: null,
          conditional: {
            condition: "age",
            minAge: 65,
            path: "../../$age.valueString",
            type: "visible",
          },
          allowNewlines: false,
        },
        {
          label: "Between 18 - 65 Conditional",
          type: "text",
          required: false,
          map: "test-patient-conditionals-Between-18---65-Conditional",
          noteLabel: null,
          description: null,
          conditional: {
            condition: "age",
            minAge: 18,
            maxAge: 65,
            path: "../../$age.valueString",
            type: "visible",
          },
          allowNewlines: false,
        },
      ],
    },
  ],
};

const lifestyle: { [name: string]: IFormDetailsSingle } = {
  [MedicalResourceType.Smoking]: {
    type: EFormType.Single,
    title: "Smoking",
    transformers: [
      {
        type: "arrayToField",
        path: "observation:Smoking.component",
        filter: `code.coding.0.code=${smokingStatusNHISLOINC}`,
        src: "valueString",
        dest: "smokingStatus",
      },
      {
        type: "arrayToField",
        path: "observation:Smoking.component",
        filter: `code.coding.0.code=${smokingFrequencyLOINC}`,
        src: "valueString",
        dest: "smokingFrequency",
      },
      {
        type: "arrayToField",
        path: "observation:Smoking.component",
        filter: `code.coding.0.code=${smokingQuantityLOINC}`,
        src: "valueString",
        dest: "smokingCigarettesPerDay",
      },
    ],
    fields: [
      {
        type: "group",
        label: "Smoking",
        fields: [
          {
            label: "Are you or have you previously been a smoker?",
            map: "$smokingStatus",
            type: "options",
            options: {
              Never: "Never smoker",
              Current: "Smoker, current status unknown",
              Past: "Former smoker",
            },
            variant: "inline",
          },
          {
            type: "group",
            conditional: {
              path: "../$smokingStatus",
              matchAny: ["Former smoker", "Smoker, current status unknown"],
              type: "visible",
            },
            fields: [
              {
                label: "How frequently do/did you smoke?",
                map: "$smokingFrequency",
                type: "options",
                options: ["Every day", "Every week", "Every month"],
                variant: "inline",
              },
              {
                conditional: {
                  path: "../$smokingFrequency",
                  isPresent: true,
                  type: "visible",
                },
                label: "How many cigarettes do/did you smoke on average?",
                map: "$smokingCigarettesPerDay",
                type: "number",
                hideKeypad: true,
              },
            ],
          },
        ],
      },
    ],
  },
  [MedicalResourceType.Alcohol]: {
    type: EFormType.Single,
    title: "Smoking",
    transformers: [
      {
        type: "arrayToField",
        path: "observation:Alcohol.component",
        filter: `code.coding.0.code=${alcoholStatusLOINC}`,
        src: "valueString",
        dest: "alcoholStatus",
      },
      {
        type: "arrayToField",
        path: "observation:Alcohol.component",
        filter: `code.coding.0.code=${alcoholFrequencyLOINC}`,
        src: "valueString",
        dest: "alcoholFrequency",
      },
      {
        type: "arrayToField",
        path: "observation:Alcohol.component",
        filter: `code.coding.0.code=${alcoholQuantityLOINC}`,
        src: "valueString",
        dest: "alcoholDrinksPerDay",
      },
    ],
    fields: [
      {
        type: "group",
        label: "Alcohol",
        fields: [
          {
            label: "Do you drink, or have you previously drank alcohol?",
            map: "$alcoholStatus",
            type: "options",
            options: {
              Never: "Non-Drinker",
              Current: "Drinker",
              Past: "Ex-Drinker",
            },
            variant: "inline",
          },
          {
            conditional: {
              path: "../$alcoholStatus",
              match: "Drinker",
              type: "visible",
            },
            label: "How often do you have a drink containing alcohol?",
            map: "$alcoholFrequency",
            type: "options",
            options: {
              "Monthly or less": "Monthly or less",
              "2-4 times a month": "2-4 times a month",
              "2-3 times a week": "2-3 times a week",
              "4 or more times a week": "4 or more times a week",
            },
            variant: "inline",
          },
          {
            conditional: {
              path: "../$alcoholStatus",
              match: "Ex-Drinker",
              type: "visible",
            },
            label: "How often do you have a drink containing alcohol?",
            map: "$alcoholFrequency",
            type: "options",
            options: {
              "Monthly or less": "Monthly or less",
              "2-4 times a month": "2-4 times a month",
              "2-3 times a week": "2-3 times a week",
              "4 or more times a week": "4 or more times a week",
            },
            variant: "inline",
          },
          {
            conditional: {
              path: "../$alcoholStatus",
              match: "Drinker",
              type: "visible",
            },
            label:
              "On typical day that you consume alcohol, how many alcoholic drinks do you consume?",
            map: "$alcoholDrinksPerDay",
            type: "options",
            options: {
              "1 or 2": "1 or 2",
              "3 or 4": "3 or 4",
              "5 or 6": "5 or 6",
              "7 to 9": "7 to 9",
              "10 or more": "10 or more",
            },
            variant: "inline",
          },
          {
            conditional: {
              path: "../$alcoholStatus",
              match: "Ex-Drinker",
              type: "visible",
            },
            label:
              "On typical day that you consume alcohol, how many alcoholic drinks do you consume?",
            map: "$alcoholDrinksPerDay",
            type: "options",
            options: {
              "1 or 2": "1 or 2",
              "3 or 4": "3 or 4",
              "5 or 6": "5 or 6",
              "7 to 9": "7 to 9",
              "10 or more": "10 or more",
            },
            variant: "inline",
          },
        ],
      },
    ],
  },
};

const sections: { [key: string]: IFormDetailsMultiSection } = {
  personals: {
    label: "Name",
    schema: {
      type: EFormType.Single,
      title: "Personal Details",
      transformers: [
        {
          type: "arrayToSingle",
          path: "Patient.name.0.prefix",
        },
        {
          type: "arrayToField",
          path: "Patient.extension",
          filter:
            "url=http://hl7.org.au/fhir/StructureDefinition/indigenous-status",
          src: "valueCoding.code",
          dest: "atsi",
        },
        {
          type: "arrayToField",
          path: "Patient.extension",
          filter: "url=http://medicaldirector.com/Patient/extension/Status",
          src: "valueString",
          dest: "status",
        },
      ],
      fields: [
        {
          type: "group",
          map: "Patient",
          fields: [
            {
              type: "group",
              map: "name.0",
              layout: EFormFieldLayoutType.INLINE,
              fields: [
                {
                  type: "options",
                  label: "Prefix",
                  map: "prefix",
                  options: ["Mr", "Master", "Mrs", "Ms", "Miss", "Dr"],
                  required: true,
                },
                {
                  type: "text",
                  label: "Given name",
                  map: "given",
                  required: true,
                  allowMultiple: true,
                  maxInstances: 1,
                  readOnly: true,
                },
                {
                  type: "text",
                  label: "Family name",
                  map: "family",
                  required: true,
                  readOnly: true,
                },
              ],
            },
            {
              type: "group",
              layout: EFormFieldLayoutType.INLINE,
              fields: [
                {
                  type: "options",
                  label: "Gender",
                  map: "gender",
                  options: {
                    Male: "male",
                    Female: "female",
                    Other: "unknown",
                  },
                  variant: "inline",
                  required: true,
                },
                {
                  type: "date",
                  label: "Date of birth",
                  map: "birthDate",
                  dateFormat: "YYYY-MM-DD",
                  required: true,
                  readOnly: true,
                  maxDate: "NOW()",
                  minDate: "NOW().offset(-110, 'years')",
                },
              ],
            },
          ],
        },
        {
          type: "options",
          label: "Indigenous status",
          map: "$atsi",
          description:
            "Please indicate whether you are Aboriginal or a Torres Strait Islander.",
          options: [
            {
              label: "Neither",
              value: "4",
            },
            {
              label: "Aboriginal",
              value: "1",
            },
            {
              label: "Torres Strait Islander",
              value: "2",
            },
            {
              label: "Both Aboriginal & Torres Strait Islander",
              value: "3",
            },
            {
              label: "Unspecified",
              value: "5",
            },
          ],
          required: true,
          variant: "inline",
        },
        {
          type: "hidden",
          map: "$status",
          forceValue: "2",
        },
      ],
    },
  },
  contact: {
    label: "Contact details",
    schema: {
      type: EFormType.Single,
      title: "Contact details",
      transformers: [
        {
          type: "arrayToField",
          path: "Patient.telecom",
          filter: "system=phone",
          src: "value",
          dest: "phone",
          allowMultiple: true,
        },
        {
          type: "arrayToField",
          path: "Patient.telecom",
          filter: "system=email",
          src: "value",
          dest: "email",
          allowMultiple: true,
        },
        {
          type: "arrayToField",
          path: "Patient.telecom",
          filter: "system=home",
          src: "value",
          dest: "home",
          allowMultiple: true,
        },
      ],
      fields: [
        {
          type: "phone",
          label: "Contact number",
          map: "$phone",
          required: true,
          allowMultiple: true,
          hideKeypad: true,
          defaultValue: [""],
        },
        {
          type: "email",
          label: "Email",
          map: "$email",
          required: true,
          allowMultiple: true,
          hideKeypad: true,
          defaultValue: [""],
        },
        {
          type: "group",
          map: "Patient",
          fields: [
            {
              type: "group",
              label: "Address",
              map: "address.0",
              fields: [
                {
                  type: "text",
                  label: "Street address",
                  map: "line",
                  allowMultiple: true,
                  maxInstances: 2,
                  required: true,
                  defaultValue: [""],
                },
                {
                  type: "text",
                  label: "Suburb",
                  map: "city",
                  required: true,
                },
                {
                  type: "group",
                  layout: EFormFieldLayoutType.INLINE,
                  fields: [
                    {
                      type: "postcode",
                      label: "Post code",
                      map: "postalCode",
                      required: true,
                      hideKeypad: true,
                    },
                    {
                      type: "options",
                      label: "State",
                      options: ["ACT", "NSW", "QLD", "VIC", "WA", "NT", "TAS"],
                      variant: "inline",
                      map: "state",
                      required: true,
                    },
                  ],
                },
                {
                  type: "options",
                  label: "Country",
                  map: "country",
                  options: ["Australia", "New Zealand"],
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  },
  secondaryContact: {
    label: "Secondary contacts",
    schema: {
      type: EFormType.Single,
      fields: [
        {
          type: "group",
          map: "Patient",
          fields: [
            {
              type: "group",
              label: "Emergency contact",
              map: "contact.0",
              fields: [
                {
                  type: "text",
                  label: "Name",
                  map: "name.text",
                  required: true,
                },
                {
                  type: "text",
                  label: "Relationship",
                  map: "relationship.0.text",
                  required: true,
                },
                {
                  type: "phone",
                  label: "Contact number",
                  map: "telecom.0.value",
                  required: true,
                  hideKeypad: true,
                },
                {
                  type: "hidden",
                  defaultValue: "phone",
                  map: "telecom.0.system",
                },
              ],
            },
          ],
        },
      ],
    },
  },
  healthCover: {
    label: "Health cover",
    schema: {
      type: EFormType.Single,
      title: "Health Cover",
      transformers: [
        {
          type: "arrayToField",
          path: "Patient.identifier",
          filter: `system=${auPatientProfileMedicareSystem}`,
          dest: "medicare",
        },
        {
          type: "arrayToField",
          path: "Patient.identifier",
          filter: `system=${extensionPatientCentreLink}`,
          dest: "concessionCard",
        },
        {
          type: "arrayToField",
          path: "Patient.identifier",
          filter: `system=${extensionPatientDVA}`,
          dest: "dva",
        },
      ],
      fields: [
        {
          type: "group",
          map: "$medicare",
          label: "Medicare",
          fields: [
            {
              label: "Medicare card",
              description:
                "Please add your 10 digit medicare number followed by your family identifier",
              type: "medicareNumber",
              map: "value",
              hideKeypad: true,
            },
            {
              label: "Expiry",
              type: "date",
              dateFormat: "YYYY-MM",
              maxDate: "NOW().offset(8,'years')",
              map: "period.end",
              conditional: {
                path: "../../value",
                isPresent: true,
                type: "enable",
              },
            },
          ],
        },
        {
          type: "group",
          label: "Concession card",
          map: "$concessionCard",
          fields: [
            {
              type: "group",
              layout: EFormFieldLayoutType.INLINE,
              fields: [
                {
                  label: "Card number",
                  type: "concessionCardNumber",
                  map: "value",
                  maxLength: 12,
                  formatters: [
                    {
                      formatPattern: "^(\\d{3}) ?(\\d{3}) ?(\\d{0,4})",
                      formatBlueprint: "$1$2$3",
                      formatFilter: " +$",
                      toUpperCase: true,
                    },
                  ],
                },
                {
                  type: "options",
                  label: "Card type",
                  options: {
                    "Commonwealth seniors health card": "SEN",
                    "Health care concession card": "HC",
                    "Pension concession card": "PEN",
                  },
                  map: "type.coding.0.code",
                  conditional: {
                    path: "../../../../value",
                    isPresent: true,
                    type: "enable",
                  },
                },
                {
                  type: "hidden",
                  map: "type.coding.0.system",
                  defaultValue: auPatientProfileVersion,
                },
              ],
            },
            {
              type: "date",
              dateFormat: "YYYY-MM-DD",
              minDate: "NOW()",
              maxDate: "NOW().offset(10,'years')",
              conditional: {
                path: "../../value",
                isPresent: true,
                type: "enable",
              },
              map: "period.end",
            },
          ],
        },
        {
          type: "group",
          label: "DVA",
          map: "$dva",
          fields: [
            {
              type: "group",
              layout: EFormFieldLayoutType.INLINE,
              fields: [
                {
                  label: "Department of veterans affairs card",
                  type: "dvaNumber",
                  map: "value",
                  maxLength: 9,
                  formatters: [
                    {
                      toUpperCase: true,
                    },
                  ],
                },
                {
                  type: "options",
                  label: "Card type",
                  options: {
                    "White card": "DVW",
                    "Gold card": "DVG",
                    "Orange card": "DVO",
                  },
                  map: "type.coding.0.code",
                  conditional: {
                    path: "../../../../value",
                    isPresent: true,
                    type: "enable",
                  },
                },
                {
                  type: "hidden",
                  map: "type.coding.0.system",
                  defaultValue: auPatientProfileVersion,
                },
              ],
            },
            {
              type: "date",
              dateFormat: "YYYY-MM-DD",
              minDate: "NOW()",
              maxDate: "NOW().offset(15,'years')",
              map: "period.end",
              conditional: {
                path: "../../value",
                isPresent: true,
                type: "enable",
              },
            },
          ],
        },
      ],
    },
  },
  photo: {
    label: "Photo",
    schema: {
      type: EFormType.Single,
      title: "Profile Image",
      fields: [
        {
          label: "Profile Image",
          type: "camera",
          videoEnvironment: "user",
          videoWidth: 300,
          isRoundStyle: true,
          mode: "auto",
          map: "Patient.photo.0.url",
        },
      ],
    },
  },
  lifestyle: {
    label: "Lifestyle",
    schema: {
      type: EFormType.Single,
      transformers: [
        ...lifestyle[MedicalResourceType.Smoking].transformers,
        ...lifestyle[MedicalResourceType.Alcohol].transformers,
      ],
      fields: [
        ...lifestyle[MedicalResourceType.Smoking].fields,
        ...lifestyle[MedicalResourceType.Alcohol].fields,
      ],
    },
  },
  reasonForVisit: {
    label: "Reason for visit",
    schema: {
      type: EFormType.Single,
      title: "Reason for visit",
      data: "observation:ReasonForVisit",
      transformers: [
        {
          type: "arrayToField",
          path: "observation:ReasonForVisit.component",
          filter: `code.coding.0.code=${appointmentFormPatientNoteLOINC}`,
          src: "valueString",
          asJson: true,
          dest: "reasonForVisit",
        },
      ],
      fields: [
        {
          type: "group",
          map: "$reasonForVisit",
          fields: [
            {
              type: "text",
              label: "What is your main health concern today?",
              allowNewlines: true,
              noteLabel: "Reason For Visit",
              map: "reason",
            },
            {
              type: "options",
              label: "How long has this been affecting your health?",
              variant: "inline",
              noteLabel: "Time affecting health",
              map: "timeAffectingHealth",
              options: [
                {
                  label: "Days",
                  value: "days",
                },
                {
                  label: "Months",
                  value: "months",
                },
                {
                  label: "Years",
                  value: "years",
                },
              ],
            },
            {
              type: "options",
              label: "Are you experiencing any discomfort?",
              variant: "inline",
              noteLabel: "Experiencing discomfort?",
              map: "discomfort",
              options: [
                {
                  label: "Yes",
                  value: "yes",
                },
                {
                  label: "No",
                  value: "no",
                },
              ],
            },
            {
              type: "options",
              label: "Please rate your discomfort on a 1 - 10 scale.",
              variant: "inline",
              noteLabel: "Level of discomfort",
              map: "levelOfDiscomfort",
              conditional: {
                path: "../discomfort",
                match: "yes",
                type: "visible",
              },
              options: [
                {
                  label: "0 - least discomfort",
                  value: "0",
                },
                {
                  label: "1",
                  value: "1",
                },
                {
                  label: "2",
                  value: "2",
                },
                {
                  label: "3",
                  value: "3",
                },
                {
                  label: "4",
                  value: "4",
                },
                {
                  label: "5 - moderate discomfort",
                  value: "5",
                },
                {
                  label: "6",
                  value: "6",
                },
                {
                  label: "7",
                  value: "7",
                },
                {
                  label: "8",
                  value: "8",
                },
                {
                  label: "9",
                  value: "9",
                },
                {
                  label: "10 - most discomfort",
                  value: "10",
                },
              ],
            },
            {
              type: "options",
              label: "Have you previously sought help for this health issue?",
              variant: "inline",
              noteLabel: "Previously sought help",
              map: "soughtHelp",
              options: [
                {
                  label: "Yes",
                  value: "yes",
                },
                {
                  label: "No",
                  value: "no",
                },
              ],
            },
            {
              type: "options",
              label: "Where have you sought help for this health issue?",
              variant: "inline",
              noteLabel: "Where patient sought help",
              map: "wherePatientSoughtHelp",
              conditional: {
                path: "../soughtHelp",
                match: "yes",
                type: "visible",
              },
              options: [
                {
                  label: "At this practice",
                  value: "this practice",
                },
                {
                  label: "Elsewhere",
                  value: "elsewhere",
                },
              ],
            },
            {
              type: "options",
              label: "Have you had any tests for this health concern?",
              variant: "inline",
              noteLabel: "Previous tests",
              map: "previousTests",
              options: [
                {
                  label: "Yes",
                  value: "yes",
                },
                {
                  label: "No",
                  value: "no",
                },
              ],
            },
            {
              type: "options",
              label: "Do you have any other health concerns to discuss today?",
              variant: "inline",
              noteLabel: "Other health concerns",
              map: "otherHealthConcerns",
              options: [
                {
                  label: "Yes",
                  value: "yes",
                },
                {
                  label: "No",
                  value: "no",
                },
              ],
            },
            {
              type: "text",
              label:
                "Please list your other health concerns in order of importance.",
              description:
                "Please note that a standard consultation generally deals with a single issue.",
              allowNewlines: true,
              noteLabel: "List of health concerns",
              map: "healthConcernList",
              conditional: {
                path: "../otherHealthConcerns",
                match: "yes",
                type: "visible",
              },
            },
          ],
        },
      ],
    },
  },
  payments: {
    label: "Payments",
    schema: {
      type: EFormType.Single,
      title: "Credit card",
      data: "CreditCard",
      fields: [
        {
          label: "Credit card",
          description:
            "To allow for automatic payments please provide your credit card details.",
          type: "creditCard",
          map: "CreditCard",
          required: true,
        },
      ],
    },
  },
};

export const mockFormSchemasMulti: { [name: string]: IFormDetailsMulti } = {
  bookingForm: {
    type: EFormType.Multi,
    data: "Patient,observation:Smoking,observation:ReasonForVisit,observation:Alcohol,CreditCard",
    sections: [
      sections.contact,
      sections.secondaryContact,
      sections.healthCover,
      // sections.payments,
      sections.reasonForVisit,
    ],
  },
};

export const mockPatientSingleForms: { [name: string]: IFormDetailsMixed } = {
  ...lifestyle,
  "patient-secondary-contact": {
    type: EFormType.Single,
    title: "Secondary contacts",
    data: "Patient",
    fields: sections.secondaryContact.schema.fields[0].fields,
  },
  "patient-credit-card": {
    data: "Patient",
    ...sections.payments.schema,
  },
  "patient-health-cover": {
    data: "Patient",
    ...sections.healthCover.schema,
  },
  reasonForVisit: sections.reasonForVisit.schema,
  "observation:ReasonForVisit": sections.reasonForVisit.schema,
  [MOCK_APPOINTMENT_PATIENT_CONDITIONALS_FORM_KEY]:
    patientConditionalsFormSchema,
  [MOCK_APPOINTMENT_FORM_SLUG]: sections.reasonForVisit.schema,
};

export const mockFormSchemas: { [name: string]: IFormDetailsMixed } = {
  ...mockFormSchemasMulti,
  ...mockPatientSingleForms,
  creditCardRequired: {
    type: EFormType.Single,
    title: "Payment",
    data: "CreditCard",
    fields: [
      {
        label: "Credit card",
        description:
          "To allow for automatic payments please provide your credit card details.",
        type: "creditCard",
        map: "CreditCard",
        required: true,
      },
    ],
  },
  creditCardOptional: {
    type: EFormType.Single,
    title: "Payment",
    data: "CreditCard",
    fields: [
      {
        label: "Credit card",
        description:
          "To allow for automatic payments please provide your credit card details.",
        type: "creditCard",
        map: "CreditCard",
      },
    ],
  },
  onboard: {
    type: EFormType.Multi,
    data: "Patient,observation:Smoking,observation:ReasonForVisit,observation:Alcohol",
    sections: Object.values(sections),
  },
};

const forms = _.times(10, () => {
  return {
    title: faker.lorem.sentence(),
    slug: uuid.v4(),
    description: faker.lorem.paragraph(),
  };
});

export const mockAssignableForms: IFormSummary[] = [
  {
    title: "Payment",
    slug: "patient-credit-card",
  },
  {
    title: "Flu Vaccination",
    slug: "flu",
    description:
      "Allow patient to fill in details related to their vaccination history and overall health information that might affect their ability to receive some type of vaccinations.",
  },
  {
    title: "Address",
    slug: "patient-address",
    description:
      "Allow patient to fill in details related to their primary address.",
  },
].concat(forms);
