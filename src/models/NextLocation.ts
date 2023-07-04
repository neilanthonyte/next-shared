import { IsBoolean, IsString, IsArray, IsNumber } from "class-validator";
import moment from "moment-timezone";

import { ISerializable } from "../types/ISerializable";
import { ICmsImageStd } from "../types/ICmsImage";
import { ICmsSubscription } from "../types/ICmsSubscription";
import { ILocationAddress } from "../types/ILocationAddress";
import { IGeoLocation } from "../types/IGeoLocation";
import { IGeo } from "../types/IGeo";
import { IAppointmentTypesAndFees, IOpeningHours } from "../types/nextLocation";
import { distanceBetweenTwoLocations } from "../helpers/distanceBetweenTwoLocations";
import { IFoyerMode } from "../types/IFoyerMode";
import { IsTimezoneValid } from "../decorators/locations";
import { ILocationFeatures } from "../types/ILocationFeatures";
import { ITimezone } from "../types/ITimezone";
import { cloneModelObject } from "../helpers/cloneModelObject";
import { ISODate, unixTimestamp } from "../types/dateTypes";
import { isoDateFormat } from "../helpers/constants";

export interface ISerializedNextLocation {
  title: string;
  id: string;
  slug: string;
  address: ILocationAddress;
  // googlePlaces: ILocationPlaces;
  // openingHours?: IOperationalPeriod[] | IOpeningHours[];
  locationFeatures: ILocationFeatures[];
  timezone: ITimezone;
  // region: TRegion;
  // regionCode?: string; // TODO: remove this when structure for retail location has been formalised
  // abnNumber?: string; // TODO: move this to retail location when implemented

  url: string;
  externalBookingUrl: null | string;

  posterImage: ICmsImageStd;
  contactEmail: string;
  contactNumber: string;
  contactFax: string;
  ehrId: string; // helix ID
  ehrHubId: string; // hub id
  allowBookings: boolean;
  appointmentMessage: null | string;
  cancellationHours: null | number;
  environment: string;
  videos: {
    [key: string]: null | {
      poster: string;
      video: string;
    }; // welcome video for companion
  };
  gawEvents: {
    bookingSuccess: null | string;
    eoiSuccess: null | string;
  };
  paydockServiceId: null | string;
  subscriptions: ICmsSubscription[];
  appointmentTypeSlugs: string[];

  geolocation?: IGeoLocation;
  appointmentTypesAndFees?: IAppointmentTypesAndFees[];
  comingSoon?: boolean;
  openingHours?: IOpeningHours[];

  foyerModes?: IFoyerMode[];

  bookingFeatureTimingOverridesEnabled: boolean;
  bookingPrimarySelection: "hcp" | "appointmentType";

  formSlugs: {
    onboard: null | string;
    booking: null | string;
    return: null | string;
    reasonForVisit: null | string;
    patientHistory: null | string;
  };
}

export class NextLocation implements ISerializable {
  @IsString()
  title: string;

  @IsString()
  id: string;

  @IsNumber()
  intId: number;

  @IsString()
  slug: string;

  address: ILocationAddress;

  // TODO: fix this discrepancy across location models
  // googlePlaces field should be removed and this should only be typed as
  // IOperationPeriod[]
  // @IsArray()
  // @ArrayNotEmpty()
  // @IsOpeningHoursValid()
  // @IsOptional()
  // openingHours: IOperationalPeriod[] | IOpeningHours[];

  locationFeatures: ILocationFeatures[];

  @IsTimezoneValid()
  timezone: ITimezone;

  // @IsOptional()
  // @IsString()
  // region: TRegion | null;

  // @IsOptional()
  // @IsString()
  // regionCode: string | null;

  // @IsOptional()
  // @IsString()
  // abnNumber: string | null;

  @IsString()
  url: string;

  @IsString()
  externalBookingUrl: null | string;

  posterImage: ICmsImageStd;

  @IsString()
  contactEmail: string;

  @IsString()
  contactNumber: string;

  @IsString()
  contactFax: string;

  @IsString()
  ehrId: string; // helix ID

  @IsString()
  ehrHubId: string; // hub id

  @IsBoolean()
  allowBookings: boolean;

  @IsArray()
  appointmentTypeSlugs: string[];

  @IsString()
  appointmentMessage: null | string;

  @IsNumber()
  cancellationHours: null | number;

  @IsString()
  environment: string;

  geolocation: IGeoLocation;

  @IsArray()
  appointmentTypesAndFees: IAppointmentTypesAndFees[];

  @IsBoolean()
  comingSoon: boolean;

  @IsArray()
  openingHours: IOpeningHours[];

  videos: {
    [key: string]: null | {
      poster: string;
      video: string;
    }; // welcome video for companion
  };

  gawEvents: {
    bookingSuccess: null | string;
    eoiSuccess: null | string;
  };

  @IsString()
  paydockServiceId: null | string;

  @IsBoolean()
  bookingFeatureTimingOverridesEnabled: boolean;

  @IsString()
  bookingPrimarySelection: "hcp" | "appointmentType";

  formSlugs: {
    onboard: null | string;
    booking: null | string;
    return: null | string;
    reasonForVisit: null | string;
    patientHistory: null | string;
  };

  // HACK - from ICmsLocation
  subscriptions: ICmsSubscription[];
  foyerModes: IFoyerMode[];

  get isOnline(): boolean {
    return this.isBookable();
  }

  /**
   * Allows for remapping to a non midnight-to-noon period
   */
  public getOperationalDay(timestamp: unixTimestamp): ISODate {
    const theDateTime = moment.unix(timestamp);
    const dayOfWeek = theDateTime.format("dddd");
    const isOpen = !!this.openingHours.find(
      (day) => day.label === dayOfWeek && day.opening !== "Closed",
    );
    return isOpen ? theDateTime.format(isoDateFormat) : null;
  }

  public findNextOperationalDay(date: ISODate): ISODate | null {
    const theDate = moment(date);
    const dayAsNumber = theDate.day();

    const daysOfTheWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    const daysInOrderOfClosest = daysOfTheWeek
      .slice(dayAsNumber)
      .concat(daysOfTheWeek.slice(0, dayAsNumber));

    const mapFromDayNameToNumberOfDaysAway = Object.fromEntries(
      daysInOrderOfClosest.map((d, i) => [d, i + 1]),
    );

    // doing a filter here instead of find, in case this.openingHours is out of order
    const possibilitiesForNumberOfDaysAway = this.openingHours
      .filter(({ opening }) => opening !== "Closed")
      .map(({ label }) => mapFromDayNameToNumberOfDaysAway[label]);

    if (possibilitiesForNumberOfDaysAway.length <= 0) {
      return null;
    }

    const daysAway = Math.min(...possibilitiesForNumberOfDaysAway);

    return moment(date).add(daysAway, "day").format(isoDateFormat);
  }

  public getBusinessHoursForOperationalDay(date: ISODate): {
    openingTime: unixTimestamp | null;
    closingTime: unixTimestamp | null;
    isOpenToday: boolean;
  } {
    return this.getOpeningTimesForDate(moment(date).unix());
  }

  /**
   * Gets the opening hours for a given day
   */
  public getOpeningTimesForDate(timestamp: unixTimestamp): {
    openingTime: unixTimestamp | null;
    closingTime: unixTimestamp | null;
    isOpenToday: boolean;
  } {
    // ensure we have a timezone
    const timezoneId = this.timezone?.timeZoneId;
    // calculate the current local time and day of the week
    const operationalDay = moment
      .tz(moment.unix(timestamp), timezoneId)
      .hours(0)
      .minutes(0)
      .seconds(0);
    const dayOfWeek = operationalDay.format("dddd");
    const day = this.openingHours.find((day) => day.label === dayOfWeek);

    if (!day || day.opening === "Closed")
      return {
        openingTime: null,
        closingTime: null,
        isOpenToday: false,
      };

    const opening = moment(day.opening, "hh:mma");
    const closing = moment(day.closing, "hh:mma");

    return {
      openingTime: operationalDay
        .hours(opening.hours())
        .minutes(opening.minutes())
        .unix(),
      closingTime: operationalDay
        .hours(closing.hours())
        .minutes(closing.minutes())
        .unix(),
      isOpenToday: true,
    };
  }

  public filterSensitiveData() {
    return cloneModelObject(this);
  }

  public static unserialize(location: ISerializedNextLocation): NextLocation {
    const newLocation = new NextLocation();

    newLocation.title = location.title;
    // craft seems to sometimes send ids as strings
    newLocation.id = location.id.toString();
    newLocation.intId = parseInt(newLocation.id, 10);
    newLocation.slug = location.slug;
    newLocation.address = location.address;
    newLocation.locationFeatures = location.locationFeatures;
    newLocation.timezone = location.timezone;
    // newLocation.googlePlaces = location.googlePlaces;
    // newLocation.region = location.region;
    // newLocation.regionCode = location.regionCode;
    // newLocation.abnNumber = location.abnNumber;
    // newLocation.region = location.region;
    newLocation.openingHours = location.openingHours || [];
    newLocation.allowBookings = location.allowBookings;
    newLocation.appointmentMessage = location.appointmentMessage;
    newLocation.appointmentTypesAndFees =
      location.appointmentTypesAndFees || [];
    newLocation.appointmentTypeSlugs = location.appointmentTypeSlugs;
    newLocation.cancellationHours = location.cancellationHours;
    newLocation.comingSoon = location.comingSoon;
    newLocation.contactEmail = location.contactEmail;
    newLocation.contactFax = location.contactFax;
    newLocation.contactNumber = location.contactNumber;
    newLocation.ehrHubId = location.ehrHubId;
    newLocation.ehrId = location.ehrId;
    newLocation.environment = location.environment;
    newLocation.gawEvents = location.gawEvents;
    newLocation.geolocation = location.geolocation;
    newLocation.openingHours = location.openingHours || [];
    newLocation.paydockServiceId = location.paydockServiceId;
    newLocation.posterImage = location.posterImage;
    newLocation.subscriptions = location.subscriptions;
    newLocation.videos = location.videos;
    newLocation.url = location.url;
    newLocation.externalBookingUrl = location.externalBookingUrl;
    newLocation.timezone = location.timezone;
    newLocation.locationFeatures = location.locationFeatures;
    newLocation.bookingFeatureTimingOverridesEnabled =
      location.bookingFeatureTimingOverridesEnabled;
    newLocation.bookingPrimarySelection = location.bookingPrimarySelection;
    newLocation.formSlugs = location.formSlugs;

    return newLocation;
  }

  public serialize(): ISerializedNextLocation {
    return {
      title: this.title,
      id: this.id,
      slug: this.slug,
      address: this.address,
      openingHours: this.openingHours,
      locationFeatures: this.locationFeatures,
      timezone: this.timezone,
      // googlePlaces: this.googlePlaces,
      // region: this.region,
      // onlineStatus: this.onlineStatus,
      // prontoId: this.prontoId,
      // regionCode: this.regionCode,
      // abnNumber: this.abnNumber,
      allowBookings: this.allowBookings,
      appointmentMessage: this.appointmentMessage,
      appointmentTypesAndFees: this.appointmentTypesAndFees,
      appointmentTypeSlugs: this.appointmentTypeSlugs,
      cancellationHours: this.cancellationHours,
      comingSoon: this.comingSoon,
      contactEmail: this.contactEmail,
      contactFax: this.contactFax,
      contactNumber: this.contactNumber,
      ehrHubId: this.ehrHubId,
      ehrId: this.ehrId,
      environment: this.environment,
      gawEvents: this.gawEvents,
      geolocation: this.geolocation,
      paydockServiceId: this.paydockServiceId,
      posterImage: this.posterImage,
      subscriptions: this.subscriptions,
      url: this.url,
      externalBookingUrl: this.externalBookingUrl,
      videos: this.videos,
      bookingFeatureTimingOverridesEnabled:
        this.bookingFeatureTimingOverridesEnabled,
      bookingPrimarySelection: this.bookingPrimarySelection,
      formSlugs: this.formSlugs,
    };
  }

  // TODO remove this override when the base model implements geolocation field
  public getLocationsDistance(latLng: IGeo): number {
    if (!this.geolocation.latitude || !this.geolocation.longitude) {
      return null;
    }
    return distanceBetweenTwoLocations(latLng, {
      lat: this.geolocation.latitude,
      lng: this.geolocation.longitude,
    });
  }

  public usesExternalBookings(): boolean {
    return !this.allowBookings && !!this.externalBookingUrl;
  }

  public isBookable(): boolean {
    return this.allowBookings || this.usesExternalBookings();
  }
}
