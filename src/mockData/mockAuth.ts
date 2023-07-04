import "reflect-metadata";
import moment from "moment";

import { ClientSession } from "next-shared/src/models/ClientSession";

import { createGuid } from "../helpers/guid";
import {
  mockPatientWithAssociation,
  mockProvisionalPatient,
  serializedPatients,
} from "./mockPatients";
import { mockMedicalStaffMembers } from "./mockMedicalStaffMembers";
import {
  companionNoPatient,
  companionWithEhrPatientNoAssociation,
  companionWithPatient,
  roomWithMedicalStaffMember,
  roomWithMedicalStaffMemberAndPatient,
} from "./mockScopes";
import { mockNextLocationsSerialized } from "./mockLocations";
import { currentUnixTimestamp } from "../helpers/currentUnixTimestamp";
import { mockStaffMembers } from "./mockStaffMembers";
import { ISession } from "../models/Session";

export const mockStaffSession = ClientSession.unserialize({
  sessionId: createGuid(),
  expiresAt: currentUnixTimestamp() + 100000,
  appId: null,
  staffMemberId: mockStaffMembers[0].staffMemberId,
  staffMember: mockStaffMembers[0],
  patientId: null,
  patient: null,
  ehrPatient: null,
  ehrPatientId: null,
  app: null,
  createdAt: currentUnixTimestamp(),
  availableLocations: [],
  permissions: [],
});

export const mockStaffMemberSession = ClientSession.unserialize({
  app: null,
  patient: null,
  ehrPatientId: null,
  ehrPatient: null,
  staffMemberId: mockStaffMembers[0].staffMemberId,
  staffMember: mockStaffMembers[0],
  sessionId: "9de8e9ca-09e2-4a66-815d-8b5ba5880c43",
  expiresAt: 1578699187,
  availableLocations: mockNextLocationsSerialized,
  invalidatedMessage: null,
  appId: null,
  patientId: null,
  permissions: [
    "createAction",
    "createFormSubmission",
    "createTask",
    "createTasks",
    "readActions",
    "readFormSubmissions",
    "readSignedFileUrl",
    "readSignedUploadUrl",
    "readTaskChecklist",
    "readTasks",
    "readTaskSummaries",
    "updateAction",
    "updateFormSubmission",
    "updateTask",
    "updateTasks",
    "viewMyNetwork",
    "assignCompanions",
  ],
  createdAt: currentUnixTimestamp(),
});

export const mockMedicalStaffSession = ClientSession.unserialize({
  app: null,
  patient: null,
  ehrPatient: null,
  staffMemberId: mockMedicalStaffMembers[1].staffMemberId,
  staffMember: mockMedicalStaffMembers[1],
  sessionId: "23017ea6-4af9-4fad-8c17-b8af2fb392dc",
  expiresAt: 1578693146,
  availableLocations: mockNextLocationsSerialized,
  invalidatedMessage: null,
  appId: null,
  patientId: null,
  permissions: [
    "createAction",
    "createFormSubmission",
    "createTask",
    "createTasks",
    "readActions",
    "readFormSubmissions",
    "readSignedFileUrl",
    "readSignedUploadUrl",
    "readTaskChecklist",
    "readTasks",
    "readTaskSummaries",
    "updateAction",
    "updateFormSubmission",
    "updateTask",
    "updateTasks",
    "viewMyNetwork",
    "assignCompanions",
    "assignRooms",
  ],
  createdAt: currentUnixTimestamp(),
});

export const mockMedicalStaffSessionWithAppSerialized: ISession = {
  app: {
    appId: "a837e0a9-9fb7-4adf-a6e0-da3ae90ccafb",
    label: "My Companion",
    accessCode: "12345678",
    accessCodeExpiry: 12312313,
    type: "companion",
    scopeId: roomWithMedicalStaffMember.scopeId,
    scope: roomWithMedicalStaffMember,
  },
  patient: null,
  ehrPatient: null,
  sessionId: "4b6a1220-894f-4c93-bd09-519b83773df3",
  expiresAt: 1578699187,
  availableLocations: mockNextLocationsSerialized,
  invalidatedMessage: null,
  appId: null,
  staffMemberId: roomWithMedicalStaffMember.staffMemberId,
  staffMember: roomWithMedicalStaffMember.staffMember,
  patientId: null,
  permissions: [
    "createAction",
    "createFormSubmission",
    "createTask",
    "createTasks",
    "readActions",
    "readFormSubmissions",
    "readSignedFileUrl",
    "readSignedUploadUrl",
    "readTaskChecklist",
    "readTasks",
    "readTaskSummaries",
    "updateAction",
    "updateFormSubmission",
    "updateTask",
    "updateTasks",
    "viewMyNetwork",
    "assignMedicalResources",
  ],
  createdAt: currentUnixTimestamp(),
};
export const mockMedicalStaffSessionWithApp = ClientSession.unserialize(
  mockMedicalStaffSessionWithAppSerialized,
);

export const mockCompanionSessionEmptySerialized: ISession = {
  app: {
    appId: "generated-app-id-companion-empty",
    label: "My Companion",
    accessCode: "12345678",
    accessCodeExpiry: 12312313,
    type: "companion",
    scopeId: companionNoPatient.scopeId,
    scope: companionNoPatient,
  },
  patient: null,
  ehrPatient: null,
  sessionId: `generated-session-id-companion-empty`,
  expiresAt: 1578699187,
  availableLocations: mockNextLocationsSerialized,
  invalidatedMessage: null,
  appId: "generated-app-id-companion-empty",
  staffMemberId: null,
  staffMember: null,
  patientId: null,
  permissions: [
    "createAction",
    "createFormSubmission",
    "createTask",
    "createTasks",
    "readActions",
    "readFormSubmissions",
    "readSignedFileUrl",
    "readSignedUploadUrl",
    "readTaskChecklist",
    "readTasks",
    "readTaskSummaries",
    "updateAction",
    "updateFormSubmission",
    "updateTask",
    "updateTasks",
    "viewMyNetwork",
    "assignMedicalResources",
  ],
  createdAt: currentUnixTimestamp(),
};
export const mockCompanionSessionEmpty = ClientSession.unserialize(
  mockCompanionSessionEmptySerialized,
);

export const mockCompanionSessionWithPatientSerialized: ISession = {
  app: {
    appId: "a837e0a9-9fb7-4adf-a6e0-da3ae90ccafb",
    label: "My Companion",
    accessCode: "12345678",
    accessCodeExpiry: 12312313,
    type: "companion",
    scopeId: companionWithPatient.scopeId,
    scope: companionWithPatient,
  },
  patient: null,
  ehrPatient: null,
  sessionId: "4b6a1220-894f-4c93-bd09-519b83773df3",
  expiresAt: 1578699187,
  availableLocations: mockNextLocationsSerialized,
  invalidatedMessage: null,
  appId: null,
  staffMemberId: companionWithPatient.staffMemberId,
  staffMember: companionWithPatient.staffMember,
  patientId: null,
  permissions: [
    "createAction",
    "createFormSubmission",
    "createTask",
    "createTasks",
    "readActions",
    "readFormSubmissions",
    "readSignedFileUrl",
    "readSignedUploadUrl",
    "readTaskChecklist",
    "readTasks",
    "readTaskSummaries",
    "updateAction",
    "updateFormSubmission",
    "updateTask",
    "updateTasks",
    "viewMyNetwork",
    "assignMedicalResources",
  ],
  createdAt: currentUnixTimestamp(),
};
export const mockCompanionSessionWithPatient = ClientSession.unserialize(
  mockCompanionSessionWithPatientSerialized,
);

export const mockCompanionSessionWithEhrPatientNoAssociationSerialized: ISession =
  {
    app: {
      appId: "a837e0a9-9fb7-4adf-a6e0-da3ae90ccafb",
      label: "My Companion",
      accessCode: "12345678",
      accessCodeExpiry: 12312313,
      type: "companion",
      scopeId: companionWithEhrPatientNoAssociation.scopeId,
      scope: companionWithEhrPatientNoAssociation,
    },
    patient: null,
    ehrPatient: null,
    sessionId: "4b6a1220-894f-4c93-bd09-519b83773df3",
    expiresAt: 1578699187,
    availableLocations: mockNextLocationsSerialized,
    invalidatedMessage: null,
    appId: null,
    staffMemberId: companionWithEhrPatientNoAssociation.staffMemberId,
    staffMember: companionWithEhrPatientNoAssociation.staffMember,
    patientId: null,
    permissions: [
      "createAction",
      "createFormSubmission",
      "createTask",
      "createTasks",
      "readActions",
      "readFormSubmissions",
      "readSignedFileUrl",
      "readSignedUploadUrl",
      "readTaskChecklist",
      "readTasks",
      "readTaskSummaries",
      "updateAction",
      "updateFormSubmission",
      "updateTask",
      "updateTasks",
      "viewMyNetwork",
      "assignMedicalResources",
    ],
    createdAt: currentUnixTimestamp(),
  };
export const mockCompanionSessionWithEhrPatientNoAssociation =
  ClientSession.unserialize(
    mockCompanionSessionWithEhrPatientNoAssociationSerialized,
  );

export const mockMedicalStaffSessionWithAppAndPatient =
  ClientSession.unserialize({
    app: {
      appId: "a837e0a9-9fb7-4adf-a6e0-da3ae90ccafb",
      label: "Dan's Companion",
      accessCode: "12345678",
      accessCodeExpiry: 12312313,
      type: "companion",
      scopeId: roomWithMedicalStaffMemberAndPatient.scopeId,
      scope: roomWithMedicalStaffMemberAndPatient,
    },
    staffMember: roomWithMedicalStaffMemberAndPatient.staffMember,
    staffMemberId:
      roomWithMedicalStaffMemberAndPatient.staffMember.staffMemberId,
    patientId: null,
    patient: null,
    ehrPatientId: null,
    ehrPatient: null,
    sessionId: "be74ed63-f69e-4171-a6d1-d4bc5815a2b6",
    expiresAt: 1578699187,
    availableLocations: mockNextLocationsSerialized,
    invalidatedMessage: null,
    appId: null,
    permissions: [
      "createAction",
      "createFormSubmission",
      "createTask",
      "createTasks",
      "readActions",
      "readFormSubmissions",
      "readSignedFileUrl",
      "readSignedUploadUrl",
      "readTaskChecklist",
      "readTasks",
      "readTaskSummaries",
      "updateAction",
      "updateFormSubmission",
      "updateTask",
      "updateTasks",
      "viewMyNetwork",
      "assignMedicalResources",
    ],
    createdAt: currentUnixTimestamp(),
  });

export const mockStaffSessionWithDashboardAppAndPatient =
  ClientSession.unserialize({
    app: {
      appId: "a837e0a9-9fb7-4adf-a6e0-da3ae90ccafb",
      label: "Dashboard",
      accessCode: null,
      accessCodeExpiry: 12312313,
      type: "dashboard",
      scopeId: roomWithMedicalStaffMemberAndPatient.scopeId,
      scope: roomWithMedicalStaffMemberAndPatient,
    },
    patientId: roomWithMedicalStaffMemberAndPatient.patient.patientId,
    patient: roomWithMedicalStaffMemberAndPatient.patient,
    ehrPatientId: null,
    ehrPatient: null,
    staffMember: roomWithMedicalStaffMemberAndPatient.staffMember,
    staffMemberId: roomWithMedicalStaffMemberAndPatient.staffMemberId,
    sessionId: "be74ed63-f69e-4171-a6d1-d4bc5815a2b6",
    expiresAt: 1578699187,
    availableLocations: mockNextLocationsSerialized,
    invalidatedMessage: null,
    appId: "a837e0a9-9fb7-4adf-a6e0-da3ae90ccafb",
    permissions: ["readSignedFileUrl", "readSignedUploadUrl"],
    createdAt: currentUnixTimestamp(),
  });

export const mockStaffSessionWithNextBarApp = ClientSession.unserialize({
  app: {
    appId: "a837e0a9-9fb7-4adf-a6e0-da3ae90ccafb",
    label: "Helix",
    type: "ehr-extension",
    scopeId: roomWithMedicalStaffMember.scopeId,
    scope: roomWithMedicalStaffMember,
  },
  patient: null,
  patientId: null,
  ehrPatient: null,
  staffMember: roomWithMedicalStaffMember.staffMember,
  staffMemberId: roomWithMedicalStaffMember.staffMemberId,
  sessionId: "be74ed63-f69e-4171-a6d1-d4bc5815a2b6",
  expiresAt: 1578699187,
  availableLocations: mockNextLocationsSerialized,
  invalidatedMessage: null,
  appId: "a837e0a9-9fb7-4adf-a6e0-da3ae90ccafb",
  permissions: ["readSignedFileUrl", "readSignedUploadUrl"],
  createdAt: currentUnixTimestamp(),
});

export const generatePatientSessionWithAssociation = (
  fhirPatient?: fhir3.Patient,
) => {
  // TODO need to add the patient to the patient service, so you receive them
  // when you create a patient socket
  throw new Error("needs updating to cater for sockets");

  // const patient = cloneModelObject(mockPatientWithAssociation);
  // const ehrPatient = cloneModelObject(mockEhrPatientWithAssociation);

  // if (fhirPatient) {
  //   patient.fhir = fhirPatient;
  //   ehrPatient.fhir = fhirPatient;
  // }

  return {
    sessionId: createGuid(),
    expiresAt: moment().add(1, "days").unix(),
    patientId: mockPatientWithAssociation.patientId,
    // patient: patient,
    // ehrPatient: ehrPatient,
  };
};

export const generatePatientSessionFromFhirPatient = (
  fhirPatient: fhir3.Patient,
) => {
  // TODO need to add the patient to the patient service, so you receive them
  // when you create a patient socket
  throw new Error("needs updating to cater for sockets");

  // const patient = serializedPatients[0];
  // patient.fhir = fhirPatient;
  return {
    sessionId: createGuid(),
    expiresAt: moment().add(1, "days").unix(),
    patientId: serializedPatients[0].patientId,
    // patient: patient,
  };
};

export const mockPatientSessionSerialized: ISession = {
  sessionId: createGuid(),
  expiresAt: moment().add(1, "days").unix(),
  // HACK should be a named patient
  patientId: serializedPatients[0].patientId,
  patient: serializedPatients[0],
  createdAt: currentUnixTimestamp(),
  // TODO set to something better
  ehrPatient: null,
  availableLocations: mockNextLocationsSerialized,
  // TODO set to something better
  permissions: [],
};
export const mockPatientSession = ClientSession.unserialize(
  mockPatientSessionSerialized,
);

export const mockProvisionalPatientSessionSerialized: ISession = {
  sessionId: createGuid(),
  expiresAt: moment().add(1, "days").unix(),
  patientId: mockProvisionalPatient.patientId,
  patient: mockProvisionalPatient,
  createdAt: currentUnixTimestamp(),
  // TODO set to something better
  ehrPatient: null,
  availableLocations: mockNextLocationsSerialized,
  // TODO set to something better
  permissions: [],
};
export const mockProvisionalPatientSession = ClientSession.unserialize(
  mockProvisionalPatientSessionSerialized,
);

export const mockPatientSessionWithAssociationSerialized: ISession = {
  sessionId: createGuid(),
  expiresAt: moment().add(1, "days").unix(),
  patientId: mockPatientWithAssociation.patientId,
  patient: mockPatientWithAssociation,
  createdAt: currentUnixTimestamp(),
  // TODO set to something better
  ehrPatient: null,
  availableLocations: mockNextLocationsSerialized,
  // TODO set to something better
  permissions: [],
};
export const mockPatientSessionWithAssociation = ClientSession.unserialize(
  mockPatientSessionWithAssociationSerialized,
);

// mock patients 0 and 1 ids are used as keys in the mockCreditCards file
export const mockPatientSessionWithCreditCard = ClientSession.unserialize({
  sessionId: createGuid(),
  expiresAt: moment().add(1, "days").unix(),
  // HACK should be a named patient
  patientId: serializedPatients[0].patientId,
  patient: serializedPatients[0],
  createdAt: currentUnixTimestamp(),
  // TODO set to something better
  ehrPatient: null,
  availableLocations: mockNextLocationsSerialized,
  // TODO set to something better
  permissions: [],
});

export const mockPatientSessionWithoutCreditCard = ClientSession.unserialize({
  sessionId: createGuid(),
  expiresAt: moment().add(1, "days").unix(),
  // HACK should be a named patient
  patientId: serializedPatients[1].patientId,
  patient: serializedPatients[1],
  createdAt: currentUnixTimestamp(),
  // TODO set to something better
  ehrPatient: null,
  availableLocations: mockNextLocationsSerialized,
  // TODO set to something better
  permissions: [],
});

export const mockPatientSessionWithExpiredCreditCard =
  ClientSession.unserialize({
    sessionId: createGuid(),
    expiresAt: moment().add(1, "days").unix(),
    // HACK should be a named patient
    patientId: serializedPatients[2].patientId,
    patient: serializedPatients[2],
    createdAt: currentUnixTimestamp(),
    // TODO set to something better
    ehrPatient: null,
    availableLocations: mockNextLocationsSerialized,
    // TODO set to something better
    permissions: [],
  });

// this will be looked into the setSessionFromSessionId in the AuthModuleMock
// when using the session persistence from AppHandler
export const mockRestorableSessions: ClientSession[] = [
  mockStaffSession,
  mockStaffMemberSession,
  mockStaffSessionWithDashboardAppAndPatient,
  mockStaffSessionWithNextBarApp,
  mockMedicalStaffSession,
  mockMedicalStaffSessionWithApp,
  mockMedicalStaffSessionWithAppAndPatient,
  mockCompanionSessionEmpty,
  mockCompanionSessionWithPatient,
  mockCompanionSessionWithEhrPatientNoAssociation,
  mockPatientSession,
  mockPatientSessionWithCreditCard,
  mockPatientSessionWithExpiredCreditCard,
  mockPatientSessionWithoutCreditCard,
];
