import { Session } from "../../models/Session";
import { generateMockSession } from "../../mockData/generateMockSession";
import { isPathPatient } from "../authRules";
import { mockPatientWithAssociation } from "../../mockData/mockPatients";

describe("authRule - isPathPatient", () => {
  it("should return invalid session message if the session is not a valid Session class", () => {
    const mockSession = {
      sessionId: "bad_session_object",
    } as unknown as Session;

    const mockReq: any = {
      params: {
        patientId: "fake_patient_001",
      },
    };

    expect(isPathPatient(mockSession, mockReq)).toEqual("Invalid session");
  });

  it("should return error message to inform that the session does not contain a patient", () => {
    // generate mock session has patient set to null by default
    const mockSession = generateMockSession();

    const mockReq: any = {
      params: {
        patientId: "fake_patient_001",
      },
    };

    expect(isPathPatient(mockSession, mockReq)).toEqual(
      "Session does not container a patient",
    );
  });

  it("should return resource forbidden message if the session patient is not the patient that the resource is intended", () => {
    const mockSession = generateMockSession({
      patient: {
        ...mockPatientWithAssociation,
      },
    });

    const mockReq: any = {
      params: {
        patientId: "definitely_not_the_one_in_mock_patient_with_association",
      },
    };

    expect(isPathPatient(mockSession, mockReq)).toEqual(
      "Resource for this patient is forbidden to current user",
    );
  });

  it("should return true if the session patient matches the path patient", () => {
    const mockSession = generateMockSession({
      patient: {
        ...mockPatientWithAssociation,
      },
    });

    const mockReq: any = {
      params: {
        patientId: mockPatientWithAssociation.patientId,
      },
    };

    expect(isPathPatient(mockSession, mockReq)).toEqual(true);
  });
});
