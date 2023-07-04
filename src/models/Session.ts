import {
  IsInt,
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsArray,
  validate,
} from "class-validator";

import { ISerializable } from "../types/ISerializable";
import { App, IApp } from "./App";
import { ISerializedPatient, Patient } from "./Patient";
import { IStaffMember, StaffMember } from "./StaffMember";
import { cloneModelObject } from "../helpers/cloneModelObject";
import { unserializeAnyStaffMember } from "../helpers/unserializeAnyStaffMember";
import { unixTimestamp } from "next-shared/src/types/dateTypes";
import { ISerializedNextLocation, NextLocation } from "./NextLocation";
import { ValidationError } from "../helpers/errorTypes";
import { EhrPatient, IEhrPatient } from "./EhrPatient";
import { currentUnixTimestamp } from "../helpers/currentUnixTimestamp";

export interface ISession {
  sessionId: string;
  createdAt: unixTimestamp;
  expiresAt: number; // unix timestamp
  patientId?: string;
  patient: ISerializedPatient;
  ehrPatientId?: string; // patient owning the session (correct), patient seeing staff member (wrong)
  ehrPatient: IEhrPatient;
  cmsLocationSlug?: string;
  appId?: string;
  app?: null | IApp;
  staffMemberId?: string;
  staffMember?: null | IStaffMember; // directly assigned staff member
  availableLocations: ISerializedNextLocation[];
  invalidatedMessage?: string;
  permissions: string[];
}

export class Session implements ISerializable {
  @IsString()
  @IsNotEmpty()
  public sessionId: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  public expiresAt: unixTimestamp; // unix timestamp

  @IsString()
  @IsOptional()
  public invalidatedMessage: null | string; // set if the session has been externally invalidated

  @IsArray()
  @IsOptional()
  public availableLocations: NextLocation[];

  @IsArray()
  public permissions: string[];

  @IsOptional()
  @IsInt()
  public createdAt: unixTimestamp;

  // only one of these should ever be set
  @IsOptional()
  @IsString()
  public appId: string;

  @IsOptional()
  @IsString()
  public staffMemberId: string;

  @IsOptional()
  @IsString()
  public patientId: string;

  @IsOptional()
  @IsString()
  public ehrPatientId: string;

  // @ts-ignore
  get id() {
    return this.sessionId;
  }

  set id(newId: string) {
    this.sessionId = newId;
  }

  private _ehrPatient: null | EhrPatient = null; // directly assigned ehr patient

  // only one of these should ever be set (the getters allow us to always access the appropriate patient/staff member)
  public app: null | App = null;
  // next patient
  private _patient: null | Patient = null; // directly assigned patient
  private _staffMember: null | StaffMember = null; // directly assigned staff member

  get locationId() {
    if (this.app) {
      return this.app.scope.cmsLocationSlug;
    }
    return this.staffMember?.cmsLocationSlug;
  }

  get patient() {
    if (this.app) {
      return this.app.scope.patient;
    }
    return this._patient;
  }
  set patient(newPatient: null | Patient) {
    if (this.app) {
      throw new Error("Cannot set patient on app session");
    }
    this._patient = newPatient;
  }

  get ehrPatient() {
    if (this.app) {
      return this.app.scope.ehrPatient;
    }
    return this._ehrPatient;
  }

  set ehrPatient(newEhrPatient: null | EhrPatient) {
    if (this.app) {
      throw new Error("Cannot set ehr patient on app session");
    }
    this._ehrPatient = newEhrPatient;
  }

  get staffMember() {
    if (this.app) {
      return this.app.scope.staffMember;
    }
    return this._staffMember;
  }
  set staffMember(newStaffMember: null | StaffMember) {
    if (this.app) {
      throw new Error("Cannot set staff member on app session");
    }
    this._staffMember = newStaffMember;
  }

  /**
   * Check whether a session has expired given the current time stamp.
   */
  public hasExpired(): boolean {
    return this.expiresAt !== null && this.expiresAt <= currentUnixTimestamp();
  }

  public filterSensitiveData() {
    const clone = cloneModelObject(this);

    if (clone.app) {
      clone.app = clone.app.filterSensitiveData();
    }

    if (clone._patient) {
      clone._patient = clone._patient.filterSensitiveData();
    }

    if (clone._ehrPatient) {
      clone._ehrPatient = clone._ehrPatient.filterSensitiveData();
    }

    if (clone._staffMember) {
      clone._staffMember = clone._staffMember.filterSensitiveData();
    }

    return clone;
  }

  public serialize(): ISession {
    const serializedLocations = this.availableLocations
      ?.map((availableLocation) => availableLocation?.serialize() || null)
      .filter((location) => !!location);
    return {
      sessionId: this.sessionId,
      expiresAt: this.expiresAt,
      invalidatedMessage: this.invalidatedMessage,
      availableLocations: serializedLocations,
      permissions: this.permissions,
      createdAt: this.createdAt,

      appId: this.appId,
      staffMemberId: this.staffMemberId,
      patientId: this.patientId,
      ehrPatientId: this.ehrPatientId,

      app: this.app ? this.app.serialize() : null,
      patient: this._patient ? this._patient.serialize() : null,
      staffMember: this._staffMember ? this._staffMember.serialize() : null,
      ehrPatient: this._ehrPatient ? this._ehrPatient.serialize() : null,
    };
  }

  public static unserialize(data: ISession) {
    const newSession = new Session();
    newSession.sessionId = data.sessionId;
    newSession.createdAt = data.createdAt;
    newSession.expiresAt = data.expiresAt;
    newSession.availableLocations = (data.availableLocations || []).map(
      (x: any) => NextLocation.unserialize(x),
    );
    newSession.invalidatedMessage = data.invalidatedMessage;

    newSession.appId = data.appId;
    newSession.staffMemberId = data.staffMemberId;
    newSession.patientId = data.patientId;
    newSession.ehrPatientId = data.ehrPatientId;
    newSession.permissions = data.permissions;

    newSession.app = data.app ? App.unserialize(data.app) : null;
    newSession._patient = data.patient
      ? Patient.unserialize(data.patient)
      : null;
    newSession._staffMember = data.staffMember
      ? unserializeAnyStaffMember(data.staffMember)
      : null;
    newSession._ehrPatient = data.ehrPatient
      ? EhrPatient.unserialize(data.ehrPatient)
      : null;

    return newSession;
  }

  public async validate(): Promise<boolean> {
    const validated = await validate(this);
    if (validated.length > 0) {
      throw new ValidationError(validated);
    }
    return true;
  }
}
