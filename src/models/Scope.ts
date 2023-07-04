import { ISerializable } from "../types/ISerializable";
import { ISerializedPatient, Patient } from "./Patient";
import { cloneModelObject } from "../helpers/cloneModelObject";
import { IStaffMember, StaffMember } from "./StaffMember";
import { unserializeAnyStaffMember } from "../helpers/unserializeAnyStaffMember";
import { scopeUrlToSummary } from "../helpers/scopeUrlToSummary";
import { MedicalStaffMember } from "./MedicalStaffMember";
import { InvalidModelError } from "../errors/InvalidModelError";
import { EhrPatient, IEhrPatient } from "./EhrPatient";
import { EEhrKey } from "../types/EEhrKey";

export type TScopeBluetoothDeviceType = "weight-scale" | "blood-pressure";

// LEGACY support for named colours
const knownColors: { [key: string]: string } = {
  black: "#404040",
  blue: "#1F85DE",
  green: "#09C727",
  red: "#DD3838",
  yellow: "#DDD038",
  purple: "#7438DD",
  orange: "#EA9108",
  aqua: "#08D1EA",
};

export interface IScopeBluetoothDevice {
  type: TScopeBluetoothDeviceType;
  serial: string;
}

export interface ISerializedScope {
  scopeId: string;
  type: "room" | "companion";
  ehrId: string;
  cmsLocationSlug: string;
  label: string;
  state: any;
  lastActivity: number | null;

  staffMemberId: string;
  patientId: string;
  ehrPatientId: string;

  staffMember: IStaffMember | null;
  patient: ISerializedPatient | null;
  ehrPatient: IEhrPatient | null;

  bleDevices: IScopeBluetoothDevice[] | null;
  patientLoading: false | string; // patientName
  virtual: boolean;
  underlyingEhr: EEhrKey;
}

export type TScopeType = "room" | "companion";

export class Scope implements ISerializable {
  public scopeId: string;
  public type: TScopeType;
  public ehrId: string;
  public cmsLocationSlug: string;
  public state: any;
  public lastActivity: number | null = null;

  public staffMemberId: string;
  public patientId: string;
  public ehrPatientId: string;

  public staffMember: StaffMember | MedicalStaffMember | null;
  public patient: Patient | null;
  public ehrPatient: EhrPatient | null;

  public bleDevices: IScopeBluetoothDevice[] | null;
  public patientLoading: false | string; // patientName
  public virtual: boolean;

  public underlyingEhr?: EEhrKey;

  private _hexValue: string;
  private _label: string;

  public get hexColor() {
    return this._hexValue;
  }
  public get displayLabel() {
    return this._label;
  }

  public get label() {
    return this._hexValue ? `${this._label} [${this._hexValue}]` : this._label;
  }

  public set label(newLabel: string) {
    // pull the colour out of the label - expecting something like: "First room [#5dbcd2]"
    const match = newLabel.match(/^(.*?)\s*(\[(#[0-9a-f]{3,6})\])?$/i);
    if (!match) {
      throw new Error("label format is unknown");
    }
    this._label = match[1];
    this._hexValue = match.length > 3 ? match[3] : null;

    // LEGACY check for known colours
    const labelLower = newLabel.toLowerCase();
    Object.keys(knownColors).forEach((c) => {
      if (labelLower.includes(c)) {
        this._hexValue = knownColors[c];
      }
    });
  }

  public getPatientLabel() {
    if (!this.ehrPatient) {
      return null;
    }
    return `${this.ehrPatient.getDisplayName()} (${this.ehrPatient.getAge()}yo)`;
  }

  public getPractitionerLabel() {
    if (!(this.staffMember instanceof MedicalStaffMember)) {
      return null;
    }
    return this.staffMember.getDisplayName();
  }

  public getScopeSummary() {
    // if there is a patient but no url, give a default message
    if (!this.state.url && !!this.ehrPatient) {
      return "?";
    }
    if (!this.ehrPatient) {
      return "";
    }
    switch (this.type) {
      case "companion":
        return scopeUrlToSummary(this.state.url);
    }
    return null;
  }

  public filterSensitiveData() {
    const clone = cloneModelObject(this);

    if (clone.staffMember) {
      clone.staffMember = clone.staffMember.filterSensitiveData();
    }

    if (clone.patient) {
      clone.patient = clone.patient.filterSensitiveData();
    }

    if (clone.ehrPatient) {
      clone.ehrPatient = clone.ehrPatient.filterSensitiveData();
    }

    return clone;
  }

  public serialize(): ISerializedScope {
    return {
      scopeId: this.scopeId,
      type: this.type,
      ehrId: this.ehrId,
      cmsLocationSlug: this.cmsLocationSlug,
      label: this.label,
      state: this.state,
      lastActivity: this.lastActivity,

      staffMemberId: this.staffMemberId,
      patientId: this.patientId,
      ehrPatientId: this.ehrPatientId,

      staffMember: this.staffMember ? this.staffMember.serialize() : null,
      patient: this.patient ? this.patient.serialize() : null,
      ehrPatient: this.ehrPatient ? this.ehrPatient.serialize() : null,
      bleDevices: this.bleDevices,
      patientLoading: this.patientLoading,
      virtual: this.virtual,

      underlyingEhr: this.underlyingEhr,
    };
  }

  public static unserialize(data: ISerializedScope): Scope {
    // validate the data object
    if (["companion", "room"].indexOf(data?.type) === -1) {
      throw new InvalidModelError("scope.type must be companion or room");
    }

    if (!data.label) {
      throw new InvalidModelError("label is required");
    }

    const newScope = new Scope();

    newScope.label = data.label;
    newScope.scopeId = data.scopeId;
    newScope.type = data.type;
    newScope.ehrId = data.ehrId;
    newScope.cmsLocationSlug = data.cmsLocationSlug;
    newScope.state = data.state || {};
    newScope.lastActivity = data.lastActivity || null;

    newScope.staffMemberId = data.staffMemberId;
    newScope.patientId = data.patientId;
    newScope.ehrPatientId = data.ehrPatientId;

    newScope.staffMember = data.staffMember
      ? unserializeAnyStaffMember(data.staffMember)
      : null;
    newScope.patient = data.patient ? Patient.unserialize(data.patient) : null;
    newScope.ehrPatient = data.ehrPatient
      ? EhrPatient.unserialize(data.ehrPatient)
      : null;
    newScope.bleDevices = data.bleDevices;

    newScope.patientLoading = data.patientLoading;
    newScope.virtual = data.virtual;

    newScope.underlyingEhr = data.underlyingEhr;

    return newScope;
  }
}
