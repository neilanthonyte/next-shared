import reasonForVisitDefinition from "../fhirUtil/fhirObservations/metricDefinitions/reasonForVisit";
import {
  appointmentFormPatientNoteLOINC,
  auPatientProfileMedicareSystem,
  fhirObservationCategoryURI,
  observationComponentDisplayNameExtensionUrl,
  observationComponentRawCodeExtensionUrl,
  observationDisplayNameExtensionUrl,
  observationTypeExtensionUrl,
  reviewItemExtensionUrl,
} from "../helpers/constants";
import { mockAppointmentsSerialized } from "./mockAppointments";

export const mockFormData: any = [
  {
    Patient: {
      resourceType: "Patient",
      id: "MD52805",
      meta: {
        versionId: "MD409380",
        lastUpdated: "2020-06-21T08:34:55.387+00:00",
      },
      extension: [
        {
          url: "http://medicaldirector.com/basic/extension/atsi",
          valueString: "NotStatedInadequatelyDescribed",
        },
        {
          url: "http://medicaldirector.com/Patient/extension/Status",
          valueString: "2",
        },
        {
          url: "http://hl7.org.au/fhir/StructureDefinition/indigenous-status",
          valueCoding: {
            system:
              "http://meteor.aihw.gov.au/content/index.phtml/itemId/602543#Codes",
            code: "5",
          },
        },
        {
          url: "http://medicaldirector.com/Patient/extension/optInSMS",
          valueBoolean: true,
        },
      ],
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
          value: "388",
        },
        {
          system: "http://ns.electronichealth.net.au/id/hi/mc",
          value: "2222222200",
        },
        {
          type: {
            coding: [
              {
                system: "http://hl7.org/fhir/v2/0203",
                code: "MC",
                display: "Patient's Medicare Number",
              },
            ],
          },
          system: auPatientProfileMedicareSystem,
          value: "22222222001",
          period: { end: "2028-03" },
        },
      ],
      name: [
        { use: "usual", family: "Holmes", given: ["Gavin"], prefix: ["Mr"] },
      ],
      telecom: [
        { system: "phone", value: "0403665222", use: "mobile" },
        {
          system: "email",
          value: "torben.sko+gavin.holmes@nextpracticehealth.com",
        },
      ],
      gender: "male",
      birthDate: "1994-03-06",
      address: [
        {
          line: ["80 Wentworth Ave"],
          city: "Sydney",
          state: "NSW",
          postalCode: "2010",
          country: "Australia",
        },
      ],
      contact: [
        {
          relationship: [{ text: "Brother" }],
          name: { text: "John Smith" },
          telecom: [{ system: "phone", value: "0400 111 222" }],
        },
      ],
    },
    "observation:Smoking": null,
    "observation:Alcohol": null,
    "observation:ReasonForVisit": {
      component: [
        {
          valueString: '{"reason":{"_#":"Reason for Visit"}}',
          code: {
            coding: [
              {
                system: "http://loinc.org/",
                code: appointmentFormPatientNoteLOINC,
              },
            ],
          },
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
        },
      ],
      resourceType: "Observation",
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
      extension: [
        {
          url: reviewItemExtensionUrl,
          valueBoolean: true,
        },
        {
          url: observationTypeExtensionUrl,
          valueString: reasonForVisitDefinition.type,
        },
        {
          url: observationDisplayNameExtensionUrl,
          valueString: reasonForVisitDefinition.displayName,
        },
      ],
      effectiveDateTime: "2020-06-21T18:34:54+10:00",
      issued: "2020-06-21T18:34:54+10:00",
      id: "97bb8115-21ec-449b-862a-a98dd553e109",
    },
    "observation:OnboardingForm": null,
    // CreditCard: null,
    CreditCard: {
      nameOnCard: "Gavin Holmes",
      cardType: "visa",
      cardNumberLast4: "0000",
      expirationDate: "5/2027",
    },
    ActiveAppointment: mockAppointmentsSerialized[0],
  },
];
