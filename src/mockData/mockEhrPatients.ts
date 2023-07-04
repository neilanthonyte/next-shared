import * as uuid from "uuid";

import { EhrPatient, IEhrPatient } from "../models/EhrPatient";
import {
  mockNextLocations,
  mockNextLocationsSerialized,
} from "./mockLocations";
import {
  mockPatientInHelixWithAssociation,
  mockPatientInHelixWithAssociationAndUpdates,
  mockPatientInHelixNoAssociationWithMatch,
  mockPatientInHelixNoAssociation,
  mockPatientWithAssociation,
  mockPatientWithAssociationAndUpdates,
  mockPatientNoAssociationWithMatch,
  mockPatientNoAssociation,
} from "./mockPatients";

// used to mock signup up scenarios from entering access code in app
export enum EMockLinkingAccessCodes {
  Invalid = "0000000",
  PhoneMismatch = "1111111",
  Existing = "2222222",
}

// used to mock signup up scenarios via two factor code when linking from companion
export enum EMockLinkingTwoFactorCodes {
  Invalid = "0000000",
  PhoneMismatch = "1111111",
  AccountMismatch = "2222222",
}

// used to mock signin scenarios
export enum EMockSigninTwoFactorCodes {
  Invalid = "0000000",
}

export const mockEhrPatientWithAssociation: IEhrPatient = {
  fhir: mockPatientWithAssociation.fhir,
  association: {
    patientId: mockPatientWithAssociation.patientId,
    ehrId: mockNextLocationsSerialized[0].ehrId,
    ehrPatientId: mockPatientInHelixWithAssociation.id.toString(),
    ehrPatientIdAlt: mockPatientWithAssociation.fhir.id,
    lastVisitedClinic: 1573795800,
    createdAt: 1573755800,
    linkedAt: 1573795800,
    cmsLocationSlug: mockNextLocations[0].slug,
  },
};

export const mockEhrPatientWithAssociationAndUpdates: IEhrPatient = {
  fhir: {
    ...mockPatientWithAssociationAndUpdates.fhir,
    telecom: mockPatientWithAssociationAndUpdates.fhir.telecom
      .filter((t) => t.use !== "mobile")
      .concat({ system: "phone", use: "mobile", value: "0400 000 000" }),
    contact: [],
    address: [],
  },
  association: {
    patientId: mockPatientWithAssociationAndUpdates.patientId,
    ehrId: mockNextLocationsSerialized[0].ehrId,
    ehrPatientId: mockPatientInHelixWithAssociationAndUpdates.id.toString(),
    ehrPatientIdAlt: mockPatientWithAssociationAndUpdates.fhir.id,
    lastVisitedClinic: 1573795800,
    createdAt: 1573755800,
    linkedAt: 1573795800,
    cmsLocationSlug: mockNextLocations[0].slug,
  },
};

export const mockEhrPatientNoAssociation: IEhrPatient = {
  fhir: mockPatientNoAssociationWithMatch.fhir,
  association: {
    patientId: null,
    ehrId: mockNextLocationsSerialized[0].ehrId,
    ehrPatientId: mockPatientInHelixNoAssociationWithMatch.id.toString(),
    ehrPatientIdAlt: mockPatientNoAssociationWithMatch.fhir.id,
    lastVisitedClinic: 1573795800,
    createdAt: 1573755800,
    linkedAt: null,
    cmsLocationSlug: mockNextLocations[0].slug,
    appAccessCode: "5463678",
  },
};

export const mockEhrPatientNoAssociationOrMatch: IEhrPatient = {
  fhir: mockPatientNoAssociation.fhir,
  association: {
    patientId: null,
    ehrId: mockNextLocationsSerialized[0].ehrId,
    ehrPatientId: mockPatientInHelixNoAssociation.id.toString(),
    ehrPatientIdAlt: mockPatientNoAssociationWithMatch.fhir.id,
    lastVisitedClinic: 1573795800,
    createdAt: 1573755800,
    linkedAt: null,
    cmsLocationSlug: mockNextLocations[0].slug,
    appAccessCode: "5463679",
  },
};

// Access codes mocks
export const mockEhrPatientWithPhoneMismatchCode: IEhrPatient = {
  ...mockEhrPatientNoAssociation,
  association: {
    ...mockEhrPatientNoAssociation.association,
    ehrPatientId: uuid.v4(),
    appAccessCode: EMockLinkingAccessCodes.PhoneMismatch,
  },
};

export const mockEhrPatientWithExistingNextPatientCode: IEhrPatient = {
  ...mockEhrPatientNoAssociation,
  association: {
    ...mockEhrPatientNoAssociation.association,
    ehrPatientId: uuid.v4(),
    appAccessCode: EMockLinkingAccessCodes.Existing,
  },
};

export const serializedEhrPatients: IEhrPatient[] = [
  mockEhrPatientWithAssociation,
  mockEhrPatientWithAssociationAndUpdates,
  mockEhrPatientNoAssociation,
  mockEhrPatientNoAssociationOrMatch,
  mockEhrPatientWithPhoneMismatchCode,
  mockEhrPatientWithExistingNextPatientCode,
];

export const mockEhrPatients = serializedEhrPatients.map((x) =>
  EhrPatient.unserialize(x),
);
