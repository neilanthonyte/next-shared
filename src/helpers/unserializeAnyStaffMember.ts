import {
  IMedicalStaffMember,
  MedicalStaffMember,
} from "../models/MedicalStaffMember";
import { IStaffMember, StaffMember } from "../models/StaffMember";

export function unserializeAnyStaffMember(
  data: IStaffMember | IMedicalStaffMember,
): StaffMember | MedicalStaffMember {
  if (data.type === "medicalStaffMember") {
    // this is a medical staff member
    return MedicalStaffMember.unserialize(data);
  }

  return StaffMember.unserialize(data);
}
