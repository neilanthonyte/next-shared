import { IsString, validate } from "class-validator";
import { User, IUser } from "./User";
import { ValidationError } from "../helpers/errorTypes";

export interface IStaffMember extends IUser {
  staffMemberId: string;
  type: "staffMember" | "medicalStaffMember";
  cmsLocationSlug: string;
  ehrId: null | string;
}

export class StaffMember extends User {
  @IsString()
  public type: "staffMember" | "medicalStaffMember";

  @IsString()
  public staffMemberId: string;
  public cmsLocationSlug: string;
  public ehrId: null | string;

  public serialize(): IStaffMember {
    return {
      ...super.serialize(),
      staffMemberId: this.staffMemberId,
      type: this.type,
      ehrId: this.ehrId,
      cmsLocationSlug: this.cmsLocationSlug,
    };
  }

  public static unserialize(data: IStaffMember): StaffMember {
    const newStaffMember = super.unserialize(data) as any as StaffMember;

    newStaffMember.staffMemberId = data.staffMemberId;
    newStaffMember.type = data.type;
    newStaffMember.cmsLocationSlug = data.cmsLocationSlug;
    newStaffMember.ehrId = data.ehrId;

    return newStaffMember;
  }

  public async validate(): Promise<boolean> {
    const validated = await validate(this);
    if (validated.length > 0) {
      throw new ValidationError(validated);
    }
    return true;
  }
}
