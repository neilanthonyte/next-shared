import { ISerializedScope, Scope } from "../models/Scope";
import { mockPatients } from "./mockPatients";
import {
  mockEhrPatientNoAssociation,
  mockEhrPatients,
} from "./mockEhrPatients";
import { mockMedicalStaffMembers } from "./mockMedicalStaffMembers";
import { mockNextLocations } from "./mockLocations";
import { EEhrKey } from "../types/EEhrKey";

export const companionNoPatient: ISerializedScope = {
  scopeId: "3088b4b0-3b25-45de-bba3-497147314f9a",
  type: "companion",
  ehrId: "d25e14f9-0952-4709-81f0-896a983d5a78",
  cmsLocationSlug: mockNextLocations[0].slug,
  label: "Monkey fresh [#38e]",
  state: {},
  lastActivity: 1554736532,
  staffMemberId: null,
  patientId: null,
  staffMember: null,
  patient: null,
  ehrPatient: null,
  ehrPatientId: null,
  bleDevices: null,
  patientLoading: false,
  virtual: false,
  underlyingEhr: EEhrKey.Helix,
};

export const companionNoPatient2: ISerializedScope = {
  scopeId: "f05f4c99-dff2-4dd9-a79b-d2b1871c73",
  type: "companion",
  ehrId: "d25e14f9-0952-4709-81f0-896a983d5a78",
  cmsLocationSlug: mockNextLocations[0].slug,
  label: "Bright Ocean [#e67]",
  state: { lastStateUpdateFrom: "7389875092" },
  lastActivity: 1554736532,
  staffMemberId: null,
  patientId: null,
  staffMember: null,
  patient: null,
  ehrPatient: null,
  ehrPatientId: null,
  bleDevices: null,
  patientLoading: false,
  virtual: false,
  underlyingEhr: EEhrKey.Helix,
};

export const companionWithPatient: ISerializedScope = {
  scopeId: "340120e6-cccd-4b91-b254-b925c044bfce",
  type: "companion",
  ehrId: "d25e14f9-0952-4709-81f0-896a983d5a78",
  cmsLocationSlug: mockNextLocations[0].slug,
  label: "Green Test iPad",
  state: {},
  lastActivity: 1562040151,
  staffMemberId: null,
  patientId: mockPatients[0].patientId,
  staffMember: null,
  patient: mockPatients[0],
  ehrPatient: mockEhrPatients[0],
  ehrPatientId: mockEhrPatients[0].association.ehrPatientId,
  bleDevices: null,
  patientLoading: false,
  virtual: false,
  underlyingEhr: EEhrKey.Helix,
};

export const companionWithEhrPatientNoAssociation: ISerializedScope = {
  scopeId: "340120e6-cccd-4b91-b254-b925c044bfce",
  type: "companion",
  ehrId: "d25e14f9-0952-4709-81f0-896a983d5a78",
  cmsLocationSlug: mockNextLocations[0].slug,
  label: "Green Test iPad",
  state: {},
  lastActivity: 1562040151,
  staffMemberId: null,
  staffMember: null,
  patientId: null,
  patient: null,
  ehrPatientId: mockEhrPatientNoAssociation.association.patientId,
  ehrPatient: mockEhrPatientNoAssociation,
  bleDevices: null,
  patientLoading: false,
  virtual: false,
  underlyingEhr: EEhrKey.Helix,
};

export const roomWithMedicalStaffMember: ISerializedScope = {
  scopeId: "9ff71476-2f24-4217-b755-505fc239401c",
  type: "room",
  ehrId: "d25e14f9-0952-4709-81f0-896a983d5a78",
  cmsLocationSlug: mockNextLocations[0].slug,
  label: "Room 2",
  state: {
    url: "/",
    store: {
      resourceReview: {
        pendingIds: [],
        acceptedIds: [],
      },
      anatomyState: {
        camera: null,
      },
      scrollSync: {},
      showAccessCode: false,
      prescribedEducation: {
        prescribedArticles: null,
        readArticles: null,
      },
    },
    lastStateUpdateFrom: "6898250324",
  },
  lastActivity: 1561340449,
  staffMemberId: mockMedicalStaffMembers[0].staffMemberId,
  patientId: null,
  staffMember: mockMedicalStaffMembers[0],
  patient: null,
  ehrPatient: null,
  ehrPatientId: null,
  bleDevices: null,
  patientLoading: false,
  virtual: false,
  underlyingEhr: EEhrKey.Helix,
};

export const roomWithMedicalStaffMemberAndPatient: ISerializedScope = {
  scopeId: "16df96da-846e-4d09-9901-e2c86467de58",
  type: "room",
  ehrId: "d25e14f9-0952-4709-81f0-896a983d5a78",
  cmsLocationSlug: mockNextLocations[0].slug,
  label: "Room 1",
  state: {
    url: "/",
    store: {
      resourceReview: {
        pendingIds: [],
        acceptedIds: [],
      },
      anatomyState: {
        camera: null,
      },
      scrollSync: {},
      showAccessCode: false,
      prescribedEducation: {
        prescribedArticles: null,
        readArticles: null,
      },
    },
    lastStateUpdateFrom: "6898250324",
  },
  lastActivity: 1561340449,
  staffMemberId: mockMedicalStaffMembers[0].staffMemberId,
  staffMember: mockMedicalStaffMembers[0],
  patientId: "46d56889-4fa7-41ea-9bee-aa634b2d30c4",
  patient: mockPatients[0],
  ehrPatient: mockEhrPatients[0],
  ehrPatientId: mockEhrPatients[0].association.ehrPatientId,
  bleDevices: null,
  patientLoading: false,
  virtual: false,
  underlyingEhr: EEhrKey.Helix,
};

export const emptyRoom: ISerializedScope = {
  scopeId: "ba1874f1-3ce4-473d-bf3c-426932d78c86",
  type: "room",
  ehrId: "d25e14f9-0952-4709-81f0-896a983d5a78",
  cmsLocationSlug: mockNextLocations[0].slug,
  label: "Empty Room",
  state: {},
  lastActivity: 1561340449,
  staffMemberId: null,
  patientId: null,
  staffMember: null,
  patient: null,
  ehrPatient: null,
  ehrPatientId: null,
  bleDevices: null,
  patientLoading: false,
  virtual: false,
  underlyingEhr: EEhrKey.Helix,
};

export const mockScopesSerialized = [
  companionNoPatient,
  companionWithPatient,
  roomWithMedicalStaffMember,
  roomWithMedicalStaffMemberAndPatient,
  emptyRoom,
  companionNoPatient2,
];

export const mockScopes = mockScopesSerialized.map((x) => Scope.unserialize(x));
