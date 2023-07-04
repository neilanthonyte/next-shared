import { IOperationalPeriod } from "./IOperationalPeriod";

// google places
// TODO: deprecate

export interface ILocationPlaces {
  formattedAddress: string;
  formattedPhoneNumber: string;
  state: string;
  openingHours: {
    openNow: boolean;
    periods: IOperationalPeriod[];
    weekdayText: string[];
  };
}
