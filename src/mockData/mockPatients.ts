import * as faker from "faker";
import { IEhrPatientSummary } from "next-shared/src/types/IEhrPatientSummary";
import { EStaffAlertType } from "next-shared/src/types/staffAlerts";
import { Patient, ISerializedPatient } from "next-shared/src/models/Patient";

import { fhirUtil } from "../fhirUtil";
import { FhirPatientUtil } from "../fhirUtil/utilClasses/FhirPatientUtil";
import { currentUnixTimestamp } from "../helpers/currentUnixTimestamp";
import {
  mockNextLocations,
  mockNextLocationsSerialized,
} from "./mockLocations";
import { mockSubscriptions } from "./mockSubscriptions";
import {
  EPatientDataSectionNames,
  IPatientDataSectionWithStatus,
} from "../types/IPatientDataSection";
import {
  mockPatient4FhirNotInNext,
  mockPatient1Fhir,
  mockPatient2Fhir,
  mockPatient3Fhir,
  mockMinimalProvisionalPatientFhir,
} from "./mockFhirPatients";

export const serializedPatientNotInNext: ISerializedPatient = {
  patientId: "80",
  acceptedTerms: "1.0.0",
  dateSignedUpToApp: 1573708284,
  email: "mark@example.com",
  fhir: mockPatient4FhirNotInNext,
  hasAcceptedLatestTerms: true,
  passwordHash: undefined,
  passwordResetToken: undefined,
  passwordResetTokenExpiry: undefined,
  paydockCustomerId: null,
  subscriptions: [],
  staffAlerts: [],
  twoFactorCode: undefined,
  twoFactorCodeExpiry: undefined,
  irisPatientId: null,
  ehrPatients: [],
  paymentInformationUpdatedAt: null,
  demographicInformationUpdatedAt: null,
  lastObservationAt: null,
  lastNotificationAt: null,
  tourLastSeenAt: null,
};

export const mockPatientWithAssociationSerialized: ISerializedPatient = {
  patientId: "76",
  acceptedTerms: "1.0.0",
  dateSignedUpToApp: 1573708284,
  email: "arwen@evenstar.com",
  fhir: mockPatient1Fhir,
  hasAcceptedLatestTerms: true,
  passwordHash: undefined,
  passwordResetToken: undefined,
  passwordResetTokenExpiry: undefined,
  paydockCustomerId: "5dc0c9df71a3e413700d2a56",
  subscriptions: [
    {
      _id: "1",
      description: mockSubscriptions[0].description,
      reference: mockSubscriptions[0].uuid,
      created_at: "2019-03-20T04:37:40.038Z",
      updated_at: "2015-07-15T10:01:30.978Z",
      amount: mockSubscriptions[0].price,
      status: "active",
      archived: false,
      customer: {
        _id: "5c917c79ae803a38a4a20f7e",
      },
      statistics: {
        total_collected_amount: 0,
        successful_transactions: 0,
      },
      schedule: {
        interval: mockSubscriptions[0].interval,
        start_date: "2019-03-20T05:37:39.000Z",
        last_assessment: "2015-07-15T09:58:19.120Z",
        next_assessment: "2015-07-16T09:58:12.441Z",
        first_assessment: "2015-07-15T09:58:12.441Z",
        status: "inprogress",
        locked: false,
        completed_count: 0,
        retry_count: 0,
        frequency: mockSubscriptions[0].frequency.toString(),
      },

      gateway_type: "Pin",
      gateway_name: "Pin Payments",
      gateway_mode: "test",
      gateway_id: mockNextLocationsSerialized[0].paydockServiceId,
    },
  ],
  staffAlerts: [
    {
      type: EStaffAlertType.Info,
      icon: "alert-reason-for-visit-available",
      text: "Reason for visit available",
      description: "Reason for visit available",
    },
    {
      type: EStaffAlertType.Info,
      icon: "alert-credit-card-available",
      text: "Credit card available",
      description: "Credit card available",
    },
  ],
  twoFactorCode: undefined,
  twoFactorCodeExpiry: undefined,
  irisPatientId: null,
  ehrPatients: [
    {
      patientId: "76",
      ehrId: mockNextLocationsSerialized[0].ehrId,
      ehrPatientId: fhirUtil<FhirPatientUtil>(mockPatient1Fhir).getHelixId(),
      ehrPatientIdAlt: mockPatient1Fhir.id,
      lastVisitedClinic: 1573795800,
      createdAt: currentUnixTimestamp() - 24 * 60,
      linkedAt: currentUnixTimestamp() - 24 * 60,
      cmsLocationSlug: mockNextLocations[0].slug,
    },
  ],
  paymentInformationUpdatedAt: null,
  demographicInformationUpdatedAt: null,
  lastObservationAt: null,
  lastNotificationAt: null,
  tourLastSeenAt: null,
};
export const mockPatientWithAssociation = Patient.unserialize(
  mockPatientWithAssociationSerialized,
);
export const mockPatientWithAssociationAndUpdatesSerialized: ISerializedPatient =
  {
    patientId: "77",
    acceptedTerms: "1.0.0",
    dateSignedUpToApp: 1573708284,
    email: "aragorn@elissar.com",
    fhir: mockPatient2Fhir,
    hasAcceptedLatestTerms: true,
    passwordHash: undefined,
    passwordResetToken: undefined,
    passwordResetTokenExpiry: undefined,
    paydockCustomerId: null,
    subscriptions: [],
    staffAlerts: [],
    twoFactorCode: undefined,
    twoFactorCodeExpiry: undefined,
    irisPatientId: null,
    ehrPatients: [
      {
        patientId: "77",
        ehrId: mockNextLocationsSerialized[0].ehrId,
        ehrPatientId: fhirUtil<FhirPatientUtil>(mockPatient2Fhir).getHelixId(),
        ehrPatientIdAlt: mockPatient2Fhir.id,
        lastVisitedClinic: 1573795800,
        createdAt: 1573755800,
        linkedAt: 1573755800,
        cmsLocationSlug: mockNextLocations[0].slug,
      },
    ],
    paymentInformationUpdatedAt: null,
    demographicInformationUpdatedAt: null,
    lastObservationAt: null,
    lastNotificationAt: null,
    tourLastSeenAt: null,
  };
export const mockPatientWithAssociationAndUpdates = Patient.unserialize(
  mockPatientWithAssociationAndUpdatesSerialized,
);
export const mockPatientNoAssociationWithMatchSerialized: ISerializedPatient = {
  patientId: "78",
  acceptedTerms: "1.0.0",
  dateSignedUpToApp: 1573708284,
  email: "ungoliant@shelob.com",
  fhir: mockPatient3Fhir,
  hasAcceptedLatestTerms: true,
  passwordHash: undefined,
  passwordResetToken: undefined,
  passwordResetTokenExpiry: undefined,
  paydockCustomerId: "5dc0c9df71a3e413700d2a57",
  subscriptions: [],
  staffAlerts: [
    {
      type: EStaffAlertType.Info,
      icon: "alert-subscription-active",
      text: "Active subscription",
      description: "Active subscription",
    },
    {
      type: EStaffAlertType.Danger,
      icon: "alert-email-in-use",
      text: `Email already registered`,
      description: `Email already registered`,
    },
    {
      type: EStaffAlertType.Info,
      icon: "alert-credit-card-available",
      text: "Credit card available",
      description: "Credit card available",
    },
    {
      type: EStaffAlertType.Warning,
      icon: "alert-not-signed-latest-terms",
      text: "Has not signed the latest terms",
      description: "Has not signed the latest terms",
    },
    {
      type: EStaffAlertType.Info,
      icon: "alert-reason-for-visit-available",
      text: "Reason for visit available",
      description: "Reason for visit available",
    },
    {
      type: EStaffAlertType.Warning,
      icon: "alert-app-code",
      text: "App Code: 12345678",
      description: "App Code: 12345678",
    },
  ],
  twoFactorCode: undefined,
  twoFactorCodeExpiry: undefined,
  irisPatientId: null,
  ehrPatients: [],
  paymentInformationUpdatedAt: null,
  demographicInformationUpdatedAt: null,
  lastObservationAt: null,
  lastNotificationAt: null,
  tourLastSeenAt: null,
};
export const mockPatientNoAssociationWithMatch = Patient.unserialize(
  mockPatientNoAssociationWithMatchSerialized,
);
export const mockProvisionalPatientSerialized: ISerializedPatient = {
  patientId: "76",
  acceptedTerms: "1.0.0",
  dateSignedUpToApp: null,
  email: null,
  fhir: mockMinimalProvisionalPatientFhir,
  hasAcceptedLatestTerms: false,
  passwordHash: undefined,
  passwordResetToken: undefined,
  passwordResetTokenExpiry: undefined,
  paydockCustomerId: null,
  subscriptions: null,
  staffAlerts: null,
  twoFactorCode: undefined,
  twoFactorCodeExpiry: undefined,
  irisPatientId: null,
  ehrPatients: null,
  paymentInformationUpdatedAt: null,
  demographicInformationUpdatedAt: null,
  lastObservationAt: null,
  lastNotificationAt: null,
  tourLastSeenAt: null,
};
export const mockProvisionalPatient = Patient.unserialize(
  mockProvisionalPatientSerialized,
);
mockMinimalProvisionalPatientFhir;

export const serializedPatients: ISerializedPatient[] = [
  mockPatientWithAssociationSerialized,
  mockPatientWithAssociationAndUpdatesSerialized,
  mockPatientNoAssociationWithMatchSerialized,
];

export const mockPatients = serializedPatients.map((x) =>
  Patient.unserialize(x),
);

export const mockPatientNoAssociation = Patient.unserialize(
  serializedPatientNotInNext,
);

export const mockPatientInHelixWithAssociation: IEhrPatientSummary = {
  DOB: mockPatientWithAssociation.fhir.birthDate + "T00:00:00",
  email: fhirUtil<FhirPatientUtil>(
    mockPatientWithAssociation.fhir,
  ).getPrimaryEmail(),
  id: parseInt(
    fhirUtil<FhirPatientUtil>(mockPatientWithAssociation.fhir).getHelixId(),
    10,
  ),
  name: fhirUtil<FhirPatientUtil>(
    mockPatientWithAssociation.fhir,
  ).getDisplayName(),
};

export const mockPatientInHelixWithAssociationAndUpdates: IEhrPatientSummary = {
  DOB: mockPatientWithAssociationAndUpdates.fhir.birthDate + "T00:00:00",
  email: fhirUtil<FhirPatientUtil>(
    mockPatientWithAssociationAndUpdates.fhir,
  ).getPrimaryEmail(),
  id: parseInt(
    fhirUtil<FhirPatientUtil>(
      mockPatientWithAssociationAndUpdates.fhir,
    ).getHelixId(),
    10,
  ),
  name: fhirUtil<FhirPatientUtil>(
    mockPatientWithAssociation.fhir,
  ).getDisplayName(),
};

export const mockPatientInHelixNoAssociationWithMatch: IEhrPatientSummary = {
  DOB: mockPatientNoAssociationWithMatch.fhir.birthDate + "T00:00:00",
  email: fhirUtil<FhirPatientUtil>(
    mockPatientNoAssociationWithMatch.fhir,
  ).getPrimaryEmail(),
  id: parseInt(
    fhirUtil<FhirPatientUtil>(
      mockPatientNoAssociationWithMatch.fhir,
    ).getHelixId(),
    10,
  ),
  name: fhirUtil<FhirPatientUtil>(
    mockPatientNoAssociationWithMatch.fhir,
  ).getDisplayName(),
};

export const mockPatientInHelixNoAssociation: IEhrPatientSummary = {
  DOB: mockPatientNoAssociation.fhir.birthDate + "T00:00:00",
  email: fhirUtil<FhirPatientUtil>(
    mockPatientNoAssociation.fhir,
  ).getPrimaryEmail(),
  id: parseInt(
    fhirUtil<FhirPatientUtil>(mockPatientNoAssociation.fhir).getHelixId(),
    10,
  ),
  name: fhirUtil<FhirPatientUtil>(
    mockPatientNoAssociation.fhir,
  ).getDisplayName(),
};

export const mockPatientsInHelix: IEhrPatientSummary[] = [
  {
    DOB: mockPatient1Fhir.birthDate + "T00:00:00",
    email: "arwen@evenstar.com",
    id: parseInt(mockPatients[0].patientId, 10),
    name: "Arwen Undómiel",
  },
  {
    DOB: mockPatient2Fhir.birthDate + "T00:00:00",
    email: "aragorn@elissar.com",
    id: parseInt(mockPatients[1].patientId, 10),
    name: "Aragorn II Elessar Telcontar",
  },
  {
    DOB: mockPatient3Fhir.birthDate + "T00:00:00",
    email: "ungoliant@shelob.com",
    id: parseInt(mockPatients[2].patientId, 10),
    name: "Ungoliant Gloomweaver",
  },
];

export const incompleteFhirPatient: fhir3.Patient = {
  resourceType: "Patient",
  id: "MD28786",
  name: [
    {
      given: ["John"],
      family: faker.name.lastName(),
      prefix: ["Mr"],
    },
  ],
  telecom: [
    {
      system: "phone",
      value: "0412 234 654",
      use: "home",
    },
    {
      system: "fax",
      value: "02 5432 4533",
    },
  ],
  identifier: [
    {
      system:
        "http://medicaldirector.com/hub/identifier/external/resource/object-id",
      value: "123",
    },
  ],
  gender: "male",
  address: [
    {
      use: "home",
      line: ["Unit 45", "123 George Street"],
      city: "East of the Mirror Lake",
      state: "NSW",
      postalCode: "2349",
      country: "Australia",
    },
  ],
};

// used for testing PatientsComparison component
export const mockBareFhirPatient: fhir3.Patient = {
  resourceType: "Patient",
  name: [
    {
      family: faker.name.lastName(),
      given: [faker.name.firstName()],
    },
  ],
  telecom: [
    {
      system: "phone",
      value: "0412 234 456",
    },
  ],
};

// minimum required Next patient (not fully onboarded)
export const mockBareNextFhirPatient: fhir3.Patient = {
  resourceType: "Patient",
  name: [
    {
      use: "usual",
      family: faker.name.lastName(),
      given: [faker.name.firstName()],
      prefix: [faker.name.prefix()],
    },
  ],
  telecom: [
    {
      use: "mobile",
      system: "phone",
      value: "0412 234 456",
    },
    {
      system: "email",
      value: faker.internet.email(),
    },
  ],
  gender: "male",
  birthDate: "1981-05-26",
};

// multiple address, emergency contacts and telecoms
export const mockRichFhirPatient: fhir3.Patient = {
  resourceType: "Patient",
  name: [
    {
      use: "usual",
      family: faker.name.lastName(),
      given: [faker.name.firstName()],
      prefix: [faker.name.prefix()],
    },
  ],
  telecom: [
    {
      use: "mobile",
      system: "phone",
      value: "0412 234 456",
    },
    {
      use: "home",
      system: "phone",
      value: "02 0345 0342",
    },
    {
      use: "home",
      system: "fax",
      value: "02 1234 5678",
    },
    {
      use: "home",
      system: "email",
      value: faker.internet.email(),
    },
    {
      use: "work",
      system: "email",
      value: faker.internet.email(),
    },
  ],
  address: [
    {
      use: "home",
      line: ["Unit 45", "123 George Street"],
      city: "East of the Mirror Lake",
      state: "NSW",
      postalCode: "2349",
      country: "Australia",
    },
    {
      use: "work",
      line: ["159-175 Church Street"],
      city: "Parramatta",
      state: "NSW",
      postalCode: "2150",
      country: "Australia",
    },
  ],
  contact: [
    {
      gender: "female",
      address: {
        use: "home",
        line: ["Unit 45", "123 George Street"],
        city: "East of the Mirror Lake",
        state: "NSW",
        postalCode: "2349",
        country: "Australia",
      },
      relationship: [
        {
          text: "Daughter",
        },
      ],
      name: {
        text: "Maria",
      },
      telecom: [
        {
          system: "phone",
          value: "0449 699 112",
        },
      ],
    },
    {
      gender: "male",
      address: {
        line: ["34 Pitt street"],
        city: "Sydney",
        state: "NSW",
        postalCode: "2000",
        country: "Australia",
      },
      relationship: [
        {
          coding: [
            {
              code: "N",
              display: "Next-of-Kin",
            },
          ],
          text: "Next-of-Kin",
        },
      ],
      name: {
        text: "Mark",
      },
      telecom: [
        {
          system: "phone",
          value: "0442 123 567",
        },
      ],
    },
  ],
  gender: "male",
  birthDate: "1981-05-26",
};

export const mockPatientDataSectionsWithStatus: IPatientDataSectionWithStatus[] =
  [
    { name: EPatientDataSectionNames.Identifiers, status: "matching" },
    { name: EPatientDataSectionNames.Contact, status: "updated" },
    { name: EPatientDataSectionNames.Address, status: "matching" },
    { name: EPatientDataSectionNames.EmergencyContact, status: "matching" },
    { name: EPatientDataSectionNames.Medicare, status: "updated" },
    { name: EPatientDataSectionNames.Dva, status: "updated" },
    { name: EPatientDataSectionNames.Crn, status: "updated" },
  ];
