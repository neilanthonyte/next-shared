import { NextLocation } from "../models/NextLocation";
import { ISuburb } from "./ISuburb";
import { Hcp } from "../models/Hcp";
import { AppointmentType } from "../models/AppointmentType";

export type TSearchableDataType = "hcps" | "locations" | "appointmentTypes";

export interface INetworkSearchResults {
  suburbs: ISuburb[]; // always shown at the top, not included in "displayOrder"
  hcps: Hcp[];
  locations: NextLocation[];
  appointmentTypes: AppointmentType[];
  displayOrder: TSearchableDataType[]; // specify the order to show these lists
  hasResults: boolean; // only considers bookable entries, not "suburbs"
}

export enum EBookingBillingType {
  private = "private",
  bulk = "bulk",
}

export enum EGender {
  male = "male",
  female = "female",
}

export enum EDeliveryMethod {
  physical = "physical",
  digital = "digital",
}

export enum EOpenHours {
  today = "today",
  afterHours = "afterHours",
  weekends = "weekends",
}

export interface INetworkSearchFilters {
  gender?: EGender;
  billing?: EBookingBillingType;
  deliveryMethod?: EDeliveryMethod;
  openHours?: EOpenHours;
}
