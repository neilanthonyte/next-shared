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

import { unixTimestamp } from "next-shared/src/types/dateTypes";

import { ISerializable } from "../types/ISerializable";
import { App, IApp } from "./App";
import { StaffMember } from "./StaffMember";
import { cloneModelObject } from "../helpers/cloneModelObject";
import { unserializeAnyStaffMember } from "../helpers/unserializeAnyStaffMember";
import { NextLocation } from "./NextLocation";
import { ValidationError } from "../helpers/errorTypes";
import { ISession } from "./Session";

/**
 * Remove non-synced data on the client side.
 */
type IClientSession =
  | {
      app: null | Omit<IApp, "scope">;
    }
  | Omit<ISession, "patient" | "ehrPatient" | "ehrPatientId">;

export class ClientSession implements ISerializable {
  @IsString()
  @IsNotEmpty()
  public sessionId: string;

  @IsOptional()
  @IsInt()
  public createdAt: unixTimestamp;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  public expiresAt: number; // unix timestamp

  // @ts-ignore
  get id() {
    return this.sessionId;
  }

  set id(newId: string) {
    this.sessionId = newId;
  }

  @IsOptional()
  @IsString()
  public patientId: string;

  @IsOptional()
  @IsString()
  public cmsLocationSlug: string;

  @IsString()
  @IsOptional()
  public invalidatedMessage: null | string; // set if the session has been externally invalidated

  @IsArray()
  @IsOptional()
  public availableLocations: NextLocation[];

  @IsArray()
  public permissions: string[];

  // private _ehrPatient: null | EhrPatient = null; // directly assigned ehr patient

  @IsOptional()
  @IsString()
  public appId: string;
  // only one of these should ever be set (the getters allow us to always access the appropriate patient/staff member)
  public app: null | Omit<App, "scope"> = null;

  @IsOptional()
  @IsString()
  public staffMemberId: string;
  public staffMember: null | StaffMember = null; // directly assigned staff member

  get locationId() {
    return this.cmsLocationSlug;
  }

  public filterSensitiveData() {
    const clone = cloneModelObject(this);

    if (clone.app) {
      clone.app = clone.app.filterSensitiveData();
    }

    if (clone.staffMember) {
      clone.staffMember = clone.staffMember.filterSensitiveData();
    }

    return clone;
  }

  public serialize(): IClientSession {
    return {
      sessionId: this.sessionId,
      createdAt: this.createdAt,
      expiresAt: this.expiresAt,
      invalidatedMessage: this.invalidatedMessage,
      availableLocations: this.availableLocations.map((l) => l.serialize()),
      permissions: this.permissions,

      appId: this.appId,
      app: this.app ? this.app.serialize() : null,

      staffMemberId: this.staffMemberId,
      staffMember: this.staffMember ? this.staffMember.serialize() : null,

      // DO NOT COPY THE PATIENT OR SCOPE ACROSS
      // we remove all unsynced data and expect the client to open a socket connection
    };
  }

  public static unserialize(data: ISession) {
    const newSession = new ClientSession();
    newSession.sessionId = data.sessionId;
    newSession.createdAt = data.createdAt;
    newSession.expiresAt = data.expiresAt;
    newSession.availableLocations = (data.availableLocations || []).map(
      (x: any) => NextLocation.unserialize(x),
    );
    newSession.invalidatedMessage = data.invalidatedMessage;

    newSession.permissions = data.permissions;

    newSession.appId = data.appId;
    newSession.app = data.app ? App.unserialize(data.app) : null;

    if (data.app) {
      newSession.cmsLocationSlug = data.app.scope?.cmsLocationSlug;
    } else {
      newSession.cmsLocationSlug = data.staffMember?.cmsLocationSlug;
      newSession.staffMemberId = data.staffMemberId;
      newSession.staffMember = data.staffMember
        ? unserializeAnyStaffMember(data.staffMember)
        : null;
    }

    // set patient id only if patient session (e.g. no app or staff member)
    if (!data.app && !data.staffMember) {
      newSession.patientId = data.patientId;
    }

    // DO NOT COPY THE PATIENT OR SCOPE ACROSS
    // we remove all unsynced data and expect the client to open a socket connection

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
