import { IsNotEmpty, IsString } from "class-validator";
import { StaffMember, IStaffMember } from "./StaffMember";
import { fhirUtil } from "next-shared/src/fhirUtil";
import { FhirPersonUtil } from "next-shared/src/fhirUtil/utilClasses/FhirPersonUtil";

export interface IMedicalStaffMember extends IStaffMember {
  ehrStaffMemberId: null | string;
  ehrStaffMemberIdAlt: null | string;
  fhir: fhir3.Practitioner;
}

export class MedicalStaffMember extends StaffMember {
  public type: "medicalStaffMember";

  // only applicable to practitioners
  @IsString()
  @IsNotEmpty()
  public ehrStaffMemberId: null | string;

  @IsString()
  @IsNotEmpty()
  public ehrStaffMemberIdAlt: null | string;

  public fhir: fhir3.Practitioner;

  public getDisplayName(): string | null {
    if (!this.fhir) {
      return null;
    }
    return fhirUtil<FhirPersonUtil>(this.fhir).getDisplayName();
  }

  public serialize() {
    return {
      ...super.serialize(),
      ehrStaffMemberId: this.ehrStaffMemberId,
      ehrStaffMemberIdAlt: this.ehrStaffMemberIdAlt,

      fhir: this.fhir,
    };
  }

  public static unserialize(data: any): MedicalStaffMember {
    const newPractitioner = super.unserialize(
      data,
    ) as any as MedicalStaffMember;

    newPractitioner.ehrStaffMemberId = data.ehrStaffMemberId;
    newPractitioner.ehrStaffMemberIdAlt = data.ehrStaffMemberIdAlt;
    newPractitioner.fhir = data.fhir;

    return newPractitioner;
  }
}
