import { unixTimestamp } from "next-shared/src/types/dateTypes";
import { ISerializable } from "../types/ISerializable";
import { cloneModelObject } from "../helpers/cloneModelObject";
import { PatientLetterType } from "next-shared/src/types/types";
import { IReleasableData } from "../types/IReleasableData";

export interface ISerializedPatientLetter {
  id: number;
  patientEhrId: string;
  letterTemplateName: string;
  staffMemberId: string;
  letterType: PatientLetterType;
  date: unixTimestamp;
  hcpId: number;
  released: false | unixTimestamp;
  ehrId: string;
  cmsLocationSlug: string;
}

/**
 * Model for the patient letter. The `released` prop indicates
 * whether this letter has been released to the patient.
 * It's a timestamp if released or false if it's not.
 */
export class PatientLetter implements ISerializable, IReleasableData {
  public id: number;
  public patientEhrId: string;
  public letterTemplateName: string;
  public staffMemberId: string;
  public letterType: PatientLetterType;
  public date: unixTimestamp;
  public hcpId: number;
  public released: false | unixTimestamp;
  public ehrId: string;
  public cmsLocationSlug: string;

  public serialize() {
    return {
      id: this.id,
      patientEhrId: this.patientEhrId,
      letterTemplateName: this.letterTemplateName,
      letterType: this.letterTemplateName,
      staffMemberId: this.staffMemberId,
      date: this.date,
      hcpId: this.hcpId,
      released: this.released,
      ehrId: this.ehrId,
      cmsLocationSlug: this.cmsLocationSlug,
    };
  }

  public static unserialize(data: any): PatientLetter {
    const newLetter = new PatientLetter();
    newLetter.id = data.id;
    newLetter.patientEhrId = data.patientEhrId;
    newLetter.letterTemplateName = data.letterTemplateName;
    newLetter.letterType = data.letterTemplateName;
    newLetter.staffMemberId = data.staffMemberId;
    newLetter.date = data.date;
    newLetter.hcpId = data.hcpId;
    newLetter.released = data.released;
    newLetter.ehrId = data.ehrId;
    newLetter.cmsLocationSlug = data.cmsLocationSlug;

    return newLetter;
  }

  public filterSensitiveData(): this {
    return cloneModelObject(this);
  }

  public get name(): string {
    return this.letterTemplateName;
  }
}
