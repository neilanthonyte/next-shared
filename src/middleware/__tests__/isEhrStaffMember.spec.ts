import { Request } from "express-serve-static-core";
import { Session } from "../../models/Session";
import { generateMockSession } from "../../mockData/generateMockSession";
import { mockStaffMembers } from "../../mockData/mockStaffMembers";
import { isEhrStaffMember } from "../authRules";

describe("authRule - isEhrStaffMember", () => {
  it("should return invalid session message if the session is not a valid Session class", () => {
    const mockSession = {
      sessionId: "bad_session_object",
    } as unknown as Session;

    const mockReq = {} as unknown as Request;

    expect(isEhrStaffMember(mockSession, mockReq)).toEqual("Invalid session");
  });

  it("should return resource requires EHR message if does not have a staff member EHR id", () => {
    const mockSession = generateMockSession({
      staffMember: {
        ...mockStaffMembers[0],
      },
    });

    const mockReq = {} as unknown as Request;

    expect(isEhrStaffMember(mockSession, mockReq)).toEqual(
      "Resource requires a staff member which EHR",
    );
  });

  it("should return true if the session staff member has an EHR ID", () => {
    const mockSession = generateMockSession({
      staffMember: {
        ...mockStaffMembers[0],
        ehrId: "a_valid_ehr_id",
      },
    });

    const mockReq = {} as unknown as Request;

    expect(isEhrStaffMember(mockSession, mockReq)).toEqual(true);
  });
});
