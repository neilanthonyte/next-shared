import { IStaffMember } from "../models/StaffMember";
import { mockNextLocations } from "./mockLocations";

export const mockStaffMembers: IStaffMember[] = [
  {
    email: "demo+mock.staff.01@nextpracticehealth.com",
    staffMemberId: "1",
    type: "staffMember",
    ehrId: null,
    cmsLocationSlug: mockNextLocations[0].slug,
    passwordHash: null,
    passwordResetToken: null,
    passwordResetTokenExpiry: null,
    twoFactorCode: null,
    twoFactorCodeExpiry: null,
  },
];
