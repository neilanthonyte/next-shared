import {
  patientLastRecordUpdateUrl,
  patientLastRecordSyncUrl,
  auPatientProfileVersion,
  auPatientProfileMedicareSystem,
  extensionPatientCentreLink,
  extensionPatientDVA,
} from "../helpers/constants";
import { currentUnixTimestamp } from "../helpers/currentUnixTimestamp";
import { mockNextLocationsSerialized } from "./mockLocations";

export const mockPatient1Fhir: fhir3.Patient = {
  resourceType: "Patient",
  id: "MD28786",
  name: [
    {
      use: "usual",
      family: "Smith",
      given: ["John"],
      prefix: ["Mr"],
    },
  ],
  telecom: [
    {
      use: "mobile",
      system: "phone",
      value: "+61400111222",
    },
    {
      system: "email",
      value: "demo@nextpracticehealth.com",
    },
  ],
  extension: [
    {
      url: patientLastRecordUpdateUrl,
      valueInteger: currentUnixTimestamp() - 3000,
    },
    {
      url: `${patientLastRecordSyncUrl}/ehrId/${mockNextLocationsSerialized[0].ehrId}`,
      valueInteger: currentUnixTimestamp() - 3000,
    },
  ],
  identifier: [
    {
      system:
        "http://medicaldirector.com/hub/identifier/external/resource/object-id",
      value: "858",
    },
    {
      system: "http://ns.electronichealth.net.au/id/medicare-number",
      value: "22222222001",
      period: {
        end: "2024-12",
      },
      extension: [
        {
          url: "http://connect.nextpracticeclinics.com/fhir/Patient/medicare-card-number",
          valueString: "2222222200",
        },
        {
          url: "http://connect.nextpracticeclinics.com/fhir/Patient/medicare-irn",
          valueInteger: 1,
        },
      ],
    },
    {
      type: {
        coding: [
          {
            system: auPatientProfileVersion,
            code: "PEN",
            display: "Pensioner Concession Card",
          },
        ],
      },
      system: extensionPatientCentreLink,
      value: "203-605-711B",
      period: {
        end: "2023-04-05",
      },
    },
  ],
  gender: "male",
  birthDate: "1991-05-26",
  address: [
    {
      line: ["26a Rivendell"],
      city: "West of the Misty Mountains",
      state: "NSW",
      postalCode: "2228",
      country: "Australia",
    },
  ],
  photo: [
    {
      url: "https://www.fillmurray.com/40/40",
    },
  ],
  contact: [
    {
      relationship: [
        {
          text: "Husband",
        },
      ],
      name: {
        text: "Aragorn II Elessar Telcontar",
      },
      telecom: [
        {
          system: "phone",
          value: "0449 699 811",
        },
      ],
    },
  ],
};

export const mockPatient2Fhir: fhir3.Patient = {
  resourceType: "Patient",
  id: "MD28787",
  name: [
    {
      use: "usual",
      family: "Elessar",
      given: ["Aragorn II"],
      prefix: ["Mr"],
    },
  ],
  telecom: [
    {
      use: "mobile",
      system: "phone",
      value: "0449164111",
    },
    {
      system: "fax",
      value: "0234568723",
    },
    {
      system: "email",
      value: "aragorn@elissar.com",
    },
  ],
  extension: [
    {
      url: patientLastRecordUpdateUrl,
      valueInteger: currentUnixTimestamp() - 3000,
    },
    {
      url: `${patientLastRecordSyncUrl}/ehrId/${mockNextLocationsSerialized[0].ehrId}`,
      valueInteger: currentUnixTimestamp() - 3000 * 60,
    },
  ],
  identifier: [
    {
      system:
        "http://medicaldirector.com/hub/identifier/external/resource/object-id",
      value: "860",
    },
    {
      type: {
        coding: [
          {
            system: auPatientProfileVersion,
            code: "MC",
            display: "Patient's Medicare Number",
          },
        ],
      },
      system: auPatientProfileMedicareSystem,
      value: "22222222001",
      period: {
        end: "2026-05",
      },
    },
    {
      type: {
        coding: [
          {
            system: auPatientProfileVersion,
            code: "DVG",
            display: "DVA Card - Gold",
          },
        ],
      },
      system: extensionPatientDVA,
      value: "ND123456",
      period: {
        end: "2023-06-23",
      },
    },
  ],
  gender: "male",
  birthDate: "1991-04-26",
  address: [
    {
      line: ["26a Rivendell"],
      city: "West of the Misty Mountains",
      state: "NSW",
      postalCode: "2228",
      country: "Australia",
    },
  ],
  contact: [
    {
      relationship: [
        {
          text: "Wife",
        },
      ],
      name: {
        text: "Arwen Undómiel",
      },
      telecom: [
        {
          system: "phone",
          value: "0449 699 111",
        },
      ],
    },
  ],
};

export const mockPatient3Fhir: fhir3.Patient = {
  resourceType: "Patient",
  id: "MD28788",
  name: [
    {
      use: "usual",
      family: "Gloomweaver",
      given: ["Ungoliant"],
      prefix: ["Dr"],
    },
  ],
  telecom: [
    {
      use: "mobile",
      system: "phone",
      value: "0449164122",
    },
    {
      system: "email",
      value: "ungoliant@shelob.com",
    },
  ],
  identifier: [
    {
      system:
        "http://medicaldirector.com/hub/identifier/external/resource/object-id",
      value: "870",
    },
  ],
  gender: "unknown",
  birthDate: "1900-01-01",
  address: [
    {
      line: ["Ered Gorgoroth"],
      city: "Beleriand",
      state: "NSW",
      postalCode: "2228",
      country: "Australia",
    },
  ],
  contact: [
    {
      relationship: [
        {
          text: "Daughter",
        },
      ],
      name: {
        text: "Shelob",
      },
      telecom: [
        {
          system: "phone",
          value: "0449 699 112",
        },
      ],
    },
  ],
};

// do not include this fhir patient in any exported mockPatients
export const mockPatient4FhirNotInNext: fhir3.Patient = {
  resourceType: "Patient",
  id: "MD28788",
  name: [
    {
      use: "usual",
      family: "Mark",
      given: ["Anthony"],
    },
  ],
  telecom: [
    {
      use: "mobile",
      system: "phone",
      value: "0449164122",
    },
    {
      system: "email",
      value: "mark@example.com",
    },
  ],
  identifier: [
    {
      system:
        "http://medicaldirector.com/hub/identifier/external/resource/object-id",
      value: "801",
    },
  ],
  gender: "unknown",
  birthDate: "1960-02-17",
  address: [
    {
      line: ["Ered Gorgoroth"],
      city: "Beleriand",
      state: "NSW",
      postalCode: "2228",
      country: "Australia",
    },
  ],
  contact: [
    {
      relationship: [
        {
          text: "Daughter",
        },
      ],
      name: {
        text: "Shelob",
      },
      telecom: [
        {
          system: "phone",
          value: "0449 699 112",
        },
      ],
    },
  ],
};

export const mockMinimalProvisionalPatientFhir: fhir3.Patient = {
  resourceType: "Patient",
  name: [
    {
      use: "usual",
      family: "Smith",
      given: ["John"],
      prefix: ["Mr"],
    },
  ],
  telecom: [],
  extension: [
    {
      url: patientLastRecordUpdateUrl,
      valueInteger: currentUnixTimestamp() - 3000,
    },
    {
      url: `${patientLastRecordSyncUrl}/ehrId/${mockNextLocationsSerialized[0].ehrId}`,
      valueInteger: currentUnixTimestamp() - 3000,
    },
    {
      url: "http://medicaldirector.com/Patient/extension/Status",
      valueString: "1",
    },
  ],
  identifier: [],
  gender: "male",
  birthDate: "1991-05-26",
  address: [],
  photo: null,
  contact: [],
};

export const mockPatient1Fhir4: fhir4.Patient = {
  resourceType: "Patient",
  id: "mock-patient-uuid-1",
  name: [
    {
      use: "usual",
      family: "Smith",
      given: ["John"],
      prefix: ["Mr"],
    },
  ],
  telecom: [
    {
      use: "mobile",
      system: "phone",
      value: "+61400111222",
    },
    {
      system: "email",
      value: "demo@nextpracticehealth.com",
    },
  ],
  extension: [
    {
      url: patientLastRecordUpdateUrl,
      valueInteger: currentUnixTimestamp() - 3000,
    },
    {
      url: `${patientLastRecordSyncUrl}/ehrId/${mockNextLocationsSerialized[0].ehrId}`,
      valueInteger: currentUnixTimestamp() - 3000,
    },
  ],
  identifier: [
    {
      system:
        "http://medicaldirector.com/hub/identifier/external/resource/object-id",
      value: "858",
    },
    {
      system: "http://ns.electronichealth.net.au/id/medicare-number",
      value: "22222222001",
      period: {
        end: "2024-12",
      },
      extension: [
        {
          url: "http://connect.nextpracticeclinics.com/fhir/Patient/medicare-card-number",
          valueString: "2222222200",
        },
        {
          url: "http://connect.nextpracticeclinics.com/fhir/Patient/medicare-irn",
          valueInteger: 1,
        },
      ],
    },
    {
      type: {
        coding: [
          {
            system: auPatientProfileVersion,
            code: "PEN",
            display: "Pensioner Concession Card",
          },
        ],
      },
      system: extensionPatientCentreLink,
      value: "203-605-711B",
      period: {
        end: "2023-04-05",
      },
    },
  ],
  gender: "male",
  birthDate: "1991-05-26",
  address: [
    {
      line: ["26a Rivendell"],
      city: "West of the Misty Mountains",
      state: "NSW",
      postalCode: "2228",
      country: "Australia",
    },
  ],
  photo: [
    {
      url: "https://www.fillmurray.com/40/40",
    },
  ],
  contact: [
    {
      relationship: [
        {
          text: "Husband",
        },
      ],
      name: {
        text: "Aragorn II Elessar Telcontar",
      },
      telecom: [
        {
          system: "phone",
          value: "0449 699 811",
        },
      ],
    },
  ],
};
