import { unixTimestamp } from "next-shared/src/types/dateTypes";
import { ISerializable } from "../types/ISerializable";
import { cloneModelObject } from "../helpers/cloneModelObject";
import {
  PatientLabResultType,
  PatientDocumentType,
} from "next-shared/src/types/types";
import { IReleasableData } from "../types/IReleasableData";

export interface ISerializedPatientLabResult {
  id: number;
  patientEhrId: string;
  hcpId: number;
  date: unixTimestamp;
  name: string;
  artefactClassification: PatientLabResultType;
  documentClassification: PatientDocumentType;
  artefactType: number;
  staffMemberId: string;
  documentId: number;
  released: false | unixTimestamp;
  ehrId: string;
  cmsLocationSlug: string;
}

export class PatientLabResult implements ISerializable, IReleasableData {
  id: number;
  patientEhrId: string;
  hcpId: number;
  date: unixTimestamp;
  name: string;
  artefactClassification: PatientLabResultType;
  documentClassification: PatientDocumentType;
  artefactType: number;
  staffMemberId: string;
  documentId: number;
  released: false | unixTimestamp;
  ehrId: string;
  cmsLocationSlug: string;

  public serialize() {
    return {
      id: this.id,
      patientEhrId: this.patientEhrId,
      hcpId: this.hcpId,
      date: this.date,
      name: this.name,
      artefactClassification: this.artefactClassification,
      documentClassification: this.documentClassification,
      artefactType: this.artefactType,
      staffMemberId: this.staffMemberId,
      documentId: this.documentId,
      released: this.released,
      ehrId: this.ehrId,
      cmsLocationSlug: this.cmsLocationSlug,
    };
  }

  public static unserialize(data: any): PatientLabResult {
    const newLabResult = new PatientLabResult();
    newLabResult.id = data.id;
    newLabResult.patientEhrId = data.patientEhrId;
    newLabResult.artefactClassification = data.artefactClassification;
    newLabResult.documentClassification = data.documentClassification;
    newLabResult.artefactType = data.artefactType;
    newLabResult.documentId = data.documentId;
    newLabResult.staffMemberId = data.staffMemberId;
    newLabResult.date = data.date;
    newLabResult.name = data.name;
    newLabResult.hcpId = data.hcpId;
    newLabResult.released = data.released;
    newLabResult.ehrId = data.ehrId;
    newLabResult.cmsLocationSlug = data.cmsLocationSlug;

    return newLabResult;
  }

  public filterSensitiveData(): this {
    return cloneModelObject(this);
  }
}
