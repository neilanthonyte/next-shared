import { ICmsImageStd } from "../types/ICmsImage";
import {
  IAppointmentType,
  AppointmentType,
} from "next-shared/src/models/AppointmentType";
import { IAggregateResponse } from "./Rating";
import { ISerializable } from "../types/ISerializable";
import { cloneModelObject } from "../helpers/cloneModelObject";

export interface IHcpRole {
  label: string;
  value: string;
}

export interface IHcp {
  title: string; // name
  type: "practitioner" | "clinicalStaff";
  suffix?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  role?: IHcpRole;
  slug: string;
  ehrId: string; // helix id
  npServicesId: string;
  worksAt: string; // practice slug
  bioShort: string;
  bioLong: string;
  profileImage: ICmsImageStd;
  description: string;
  appointmentMessage: null | string;
  microsoftCalendarId?: string;
  appointmentTypeSlugs: string[];
  appointmentTypes?: IAppointmentType[];
  tourDecorationImage?: string;
  providerNumber?: string;
  // types underneath here are added by np services.
  // they will also only be available if the practitioner is classed as a "MedicalStaffMember"
  hubId?: string;
  fhirDisplayName?: string;
  rating?: IAggregateResponse;
  url?: string;
  displayPriority?: number;
}

export class Hcp implements ISerializable {
  public title: string;
  public type: "practitioner" | "clinicalStaff";
  public suffix: string;
  public firstName: string;
  public lastName: string;
  public gender: string;
  public role: IHcpRole;
  public slug: string;
  public ehrId: string; // helix id
  public npServicesId: string;
  public worksAt: string; // practice slug
  public bioShort: string;
  public bioLong: string;
  public profileImage: ICmsImageStd;
  public description: string;
  public appointmentMessage: null | string;
  public microsoftCalendarId: string;
  public appointmentTypeSlugs: string[];
  public appointmentTypes: AppointmentType[] = [];
  public tourDecorationImage: string;
  public providerNumber: string;
  public hubId: string;
  public fhirDisplayName: string;
  public rating: IAggregateResponse;
  public url: string;
  public displayPriority: number;

  public serialize() {
    return {
      title: this.title,
      type: this.type,
      suffix: this.suffix,
      firstName: this.firstName,
      lastName: this.lastName,
      gender: this.gender,
      role: this.role,
      slug: this.slug,
      ehrId: this.ehrId,
      npServicesId: this.npServicesId,
      worksAt: this.worksAt,
      bioShort: this.bioShort,
      bioLong: this.bioLong,
      profileImage: this.profileImage,
      description: this.description,
      appointmentMessage: this.appointmentMessage,
      microsoftCalendarId: this.microsoftCalendarId,
      appointmentTypeSlugs: this.appointmentTypeSlugs || [],
      appointmentTypes: (this.appointmentTypes || []).map((appt) =>
        appt.serialize(),
      ),
      tourDecorationImage: this.tourDecorationImage,
      providerNumber: this.providerNumber,
      hubId: this.hubId,
      fhirDisplayName: this.fhirDisplayName,
      rating: this.rating,
      url: this.url,
      displayPriority: this.displayPriority,
    };
  }

  public static unserialize(data: IHcp): Hcp {
    const newHcp = new Hcp();

    newHcp.title = data.title;
    newHcp.type = data.type;
    newHcp.suffix = data.suffix;
    newHcp.firstName = data.firstName;
    newHcp.lastName = data.lastName;
    newHcp.gender = data.gender;
    newHcp.role = data.role;
    newHcp.slug = data.slug;
    newHcp.ehrId = data.ehrId;
    newHcp.npServicesId = data.npServicesId;
    newHcp.worksAt = data.worksAt;
    newHcp.bioShort = data.bioShort;
    newHcp.bioLong = data.bioLong;
    newHcp.profileImage = data.profileImage;
    newHcp.description = data.description;
    newHcp.appointmentMessage = data.appointmentMessage;
    newHcp.microsoftCalendarId = data.microsoftCalendarId;
    newHcp.appointmentTypeSlugs = data.appointmentTypeSlugs || [];
    newHcp.appointmentTypes = (data.appointmentTypes || []).map((appt) =>
      AppointmentType.unserialize(appt),
    );
    newHcp.tourDecorationImage = data.tourDecorationImage;
    newHcp.providerNumber = data.providerNumber;
    newHcp.hubId = data.hubId;
    newHcp.fhirDisplayName = data.fhirDisplayName;
    newHcp.rating = data.rating;
    newHcp.url = data.url;
    newHcp.displayPriority = data.displayPriority;

    return newHcp;
  }

  public filterSensitiveData(): this {
    const clone = cloneModelObject(this);
    // delete clone.;
    return clone;
  }

  public attachAppointmentDetails(types: AppointmentType[]) {
    this.appointmentTypes = (types || []).filter((a) =>
      this.appointmentTypeSlugs.includes(a.slug),
    );
  }
}
