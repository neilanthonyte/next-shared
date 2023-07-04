import { ICmsImageStd } from "./ICmsImage";
import { ICmsSubscription } from "./ICmsSubscription";
import { IFoyerMode } from "./IFoyerMode";
import { IGeoLocation } from "./IGeoLocation";

export interface ICmsLocationAddress {
  streetAddress: string;
  suburb: string;
  state: string;
  postcode: string;
}

export interface ICmsLocation {
  id: number;
  title: string;
  slug: string;
  url?: string;
  posterImage: ICmsImageStd;
  contactEmail: string;
  contactNumber: string;
  contactFax: string;
  ehrId: string; // helix ID
  ehrHubId: string; // hub id
  allowBookings: boolean;
  comingSoon: boolean;
  appointmentMessage: null | string;
  cancellationHours: null | number;
  environment: string;
  videos: {
    [key: string]: null | {
      poster: string;
      video: string;
    }; // welcome video for companion
  };
  openingHours: Array<{
    label: string; // "Monday", "Tuesday", "Weekends", "Public Holidays"
    opening: string;
    closing: string;
  }>;
  appointmentTypesAndFees: Array<{
    label: string; // "Standard", "Long", "Procedure"
    duration: number; // in minutes
    price: string; // "$80"
  }>;
  geolocation: IGeoLocation;
  address: ICmsLocationAddress;
  gawEvents: {
    bookingSuccess: null | string;
    eoiSuccess: null | string;
  };
  paydockServiceId: null | string;
  subscriptions: ICmsSubscription[];
  foyerModes?: IFoyerMode[];
}
