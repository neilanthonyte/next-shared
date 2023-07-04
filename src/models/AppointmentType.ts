import { ISerializable } from "../interfaces/ISerializable";
import { cloneModelObject } from "../helpers/cloneModelObject";

export type TAppointmentTypeServiceMethod = "physical" | "digital" | "either";
export type TAppointmentTypeVisibility = "public" | "private";
export type TAppointmentTypePatientType = "new" | "returning" | "all";
export type TAppointmentTypePayment =
  | "none"
  | "preBooking"
  | "postBooking"
  | "optional";

/**
 * Interface of the appointment type response coming from the CMS.
 */
export interface IAppointmentType {
  lengthMinutes: number;
  lengthOverrides: {
    newPatient: number;
  };
  label: string;
  description: string;
  slug: string;
  method: TAppointmentTypeServiceMethod;
  patientType: TAppointmentTypePatientType;
  visibility: TAppointmentTypeVisibility;
  order?: number;
  price: number;
  rebate: number;
  deposit?: number;
  requireCard?: boolean;
  helixId: number;
  locationSlug?: string;
  reasonForVisitForm?: string;
  externalIdentifiers: {
    helix: string | null;
    helloHealth: string | null;
    bestPractice: string | null;
  };
  // LEGACY
  payment?: TAppointmentTypePayment;
}

/**
 * Appointment type key/value pair to represent an EHR appointment type.
 * For the appointment type coming from the CMS that contains full details like
 * duration etc, please see IAppointmentType
 */
export interface IEhrAppointmentType {
  appointmentTypeId: string;
  appointmentTypeName: string;
}

/**
 * Model of the appointment type object coming from the CMS.
 */
export class AppointmentType implements IAppointmentType, ISerializable {
  public lengthMinutes: number;
  public lengthOverrides: {
    newPatient: number;
  };
  public label: string;
  public description: string;
  public slug: string;
  public method: TAppointmentTypeServiceMethod;
  public patientType: TAppointmentTypePatientType;
  public visibility: TAppointmentTypeVisibility;

  public order?: number;
  public price: number;
  public rebate: number;
  public deposit: number;
  public requireCard: boolean;
  public helixId: number;

  public payment: TAppointmentTypePayment;
  // for muting, but not hiding appointment
  public disabledReason?: string;

  public locationSlug?: string;

  public reasonForVisitForm?: string;

  public externalIdentifiers: {
    helix: string | null;
    helloHealth: string | null;
    bestPractice: string | null;
  };

  // TODO: see if appointmentType.helixLabel (hard-coded type, Helix-specific) can just
  // revert to appointmentType.label (from CMS), to make this EHR-agnostic
  public get helixLabel(): string {
    return this.externalIdentifiers?.helix;
  }

  public get supplementaryDetailsRequired(): boolean {
    return this.slug.toLowerCase().match(/covid/) !== null;
  }

  public isBulkBilled(): boolean {
    return this.rebate > 0 && (this.price === this.rebate || this.price === 0);
  }

  public requireCreditCard(): boolean {
    return this.requireCard || this.deposit > 0;
  }

  public serialize(): IAppointmentType {
    return {
      slug: this.slug,
      lengthMinutes: this.lengthMinutes,
      lengthOverrides: this.lengthOverrides,
      label: this.label,
      description: this.description,
      method: this.method,
      patientType: this.patientType,
      visibility: this.visibility,
      order: this.order,
      price: this.price || 0,
      rebate: this.rebate || 0,
      deposit: this.deposit || 0,
      requireCard: this.requireCard || false,
      helixId: this.helixId,
      locationSlug: this.locationSlug,
      reasonForVisitForm: this.reasonForVisitForm,
      externalIdentifiers: this.externalIdentifiers,
      // LEGACY
      payment: this.payment,
    };
  }

  public static unserialize(data: IAppointmentType): AppointmentType {
    const newType = new AppointmentType();
    newType.lengthMinutes = data.lengthMinutes;
    newType.lengthOverrides = data.lengthOverrides;
    newType.label = data.label;
    newType.description = data.description;
    newType.slug = data.slug;
    newType.method = data.method;
    newType.patientType = data.patientType;
    newType.visibility = data.visibility;
    newType.order = data.order;
    newType.price = data.price;
    newType.rebate = data.rebate;
    newType.deposit = data.deposit;
    newType.requireCard = data.requireCard;
    newType.helixId = data.helixId;
    newType.locationSlug = data.locationSlug;
    newType.reasonForVisitForm = data.reasonForVisitForm;
    newType.externalIdentifiers = data.externalIdentifiers;
    // LEGACY
    newType.payment = data.payment;

    return newType;
  }

  public filterSensitiveData(): this {
    return cloneModelObject(this);
  }
}
