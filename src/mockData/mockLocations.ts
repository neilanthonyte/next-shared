import {
  ISerializedNextLocation,
  NextLocation,
} from "next-shared/src/models/NextLocation";
import {
  mockAppointmentTypesSerializedLocA,
  mockAppointmentTypesSerializedLocB,
} from "./mockAppointmentTypes";
import { mockPaydockServiceIds } from "./mockPaydockServiceIds";
import { mockSubscriptions } from "./mockSubscriptions";

export const makeFakeLocation = () =>
  NextLocation.unserialize({
    id: "1",
    title: "Surry Hills",
    slug: "location-surry-hills",
    url: "https://website-dev.nextpracticeclinics.com/locations/next-head-office-dev",
    externalBookingUrl: null,
    ehrId: "1",
    ehrHubId: "MD68507",
    posterImage: {
      full: "https://d1qr34qzhiwpdo.cloudfront.net/poster-images/4k-wallpaper-close-up-dew-2137388.jpg?mtime=20190825233037",
      largePosterImage:
        "https://d1qr34qzhiwpdo.cloudfront.net/poster-images/_largeHeroHeader/4k-wallpaper-close-up-dew-2137388.jpg?mtime=20190825233037",
      squareLarge:
        "https://d1qr34qzhiwpdo.cloudfront.net/poster-images/_largeHeroHeader/4k-wallpaper-close-up-dew-2137388.jpg?mtime=20190825233037",
      squareMedium:
        "https://d1qr34qzhiwpdo.cloudfront.net/poster-images/_squareMedium/4k-wallpaper-close-up-dew-2137388.jpg?mtime=20190825233037",
      squareSmall:
        "https://d1qr34qzhiwpdo.cloudfront.net/poster-images/_squareSmall/4k-wallpaper-close-up-dew-2137388.jpg?mtime=20190825233037",
    },
    contactEmail: "dev.team@example.com",
    contactNumber: "0400 111 222",
    contactFax: null,
    address: {
      fullAddress: "80 Wentworth Avenue, Surry Hills, NSW",
      streetAddress: "80 Wentworth Avenue",
      suburb: "Surry Hills",
      state: "NSW",
      postcode: "2010",
      country: "Australia",
      lat: -33.8802399,
      lng: 151.2159392,
    },
    geolocation: { latitude: -33.8802399, longitude: 151.2159392 },
    comingSoon: false,
    environment: "development",
    allowBookings: true,
    appointmentMessage: null,
    cancellationHours: null,
    gawEvents: {
      bookingSuccess: null,
      eoiSuccess: null,
    },
    videos: {
      welcome: {
        video: null,
        poster: null,
      },
    },
    paydockServiceId: mockPaydockServiceIds.surryHills,
    subscriptions: mockSubscriptions,
    bookingFeatureTimingOverridesEnabled: true,
    bookingPrimarySelection: "appointmentType",
    formSlugs: {
      onboard: null,
      booking: null,
      return: null,
      // HACK - use an object reference
      reasonForVisit: "reasonForVisit",
      patientHistory: null,
    },
    locationFeatures: [],
    timezone: {
      dstOffset: 3600,
      rawOffset: 36000,
      status: "OK",
      timeZoneId: "Australia/Sydney",
      timeZoneName: "Australian Eastern Daylight Time",
    },
    // region: null,
    appointmentTypeSlugs: mockAppointmentTypesSerializedLocA.map((a) => a.slug),
    appointmentTypesAndFees: [
      {
        label: "Standard",
        duration: 15,
        price: "$80",
      },
      {
        label: "Long",
        duration: 30,
        price: "$140",
      },
      {
        label: "Procedure",
        duration: 60,
        price: "$50 gap",
      },
      {
        label: "Prescription refill",
        duration: 5,
        price: "$37",
      },
    ],
    openingHours: [
      {
        label: "Monday",
        opening: "8am",
        closing: "8pm",
      },
      {
        label: "Tuesday",
        opening: "8am",
        closing: "8pm",
      },
      {
        label: "Wednesday",
        opening: "8am",
        closing: "8pm",
      },
      {
        label: "Thursday",
        opening: "8am",
        closing: "8pm",
      },
      {
        label: "Friday",
        opening: "8am",
        closing: "6pm",
      },
      {
        label: "Saturday ",
        opening: "9am",
        closing: "12pm",
      },
      {
        label: "Sunday",
        opening: "10am",
        closing: "12pm",
      },
    ],
  });

export const mockNextLocationsSerialized: ISerializedNextLocation[] = [
  {
    id: "1",
    title: "Surry Hills",
    slug: "location-surry-hills",
    url: "https://website-dev.nextpracticeclinics.com/locations/next-head-office-dev",
    externalBookingUrl: null,
    ehrId: "1",
    ehrHubId: "MD68507",
    posterImage: {
      full: "https://d1qr34qzhiwpdo.cloudfront.net/poster-images/4k-wallpaper-close-up-dew-2137388.jpg?mtime=20190825233037",
      largePosterImage:
        "https://d1qr34qzhiwpdo.cloudfront.net/poster-images/_largeHeroHeader/4k-wallpaper-close-up-dew-2137388.jpg?mtime=20190825233037",
      squareLarge:
        "https://d1qr34qzhiwpdo.cloudfront.net/poster-images/_largeHeroHeader/4k-wallpaper-close-up-dew-2137388.jpg?mtime=20190825233037",
      squareMedium:
        "https://d1qr34qzhiwpdo.cloudfront.net/poster-images/_squareMedium/4k-wallpaper-close-up-dew-2137388.jpg?mtime=20190825233037",
      squareSmall:
        "https://d1qr34qzhiwpdo.cloudfront.net/poster-images/_squareSmall/4k-wallpaper-close-up-dew-2137388.jpg?mtime=20190825233037",
    },
    contactEmail: "dev.team@example.com",
    contactNumber: "0400 111 222",
    contactFax: null,
    address: {
      fullAddress: "80 Wentworth Avenue, Surry Hills, NSW",
      streetAddress: "80 Wentworth Avenue",
      suburb: "Surry Hills",
      state: "NSW",
      postcode: "2010",
      country: "Australia",
      lat: -33.8802399,
      lng: 151.2159392,
    },
    geolocation: { latitude: -33.8802399, longitude: 151.2159392 },
    comingSoon: false,
    environment: "development",
    allowBookings: true,
    appointmentMessage: null,
    cancellationHours: null,
    gawEvents: {
      bookingSuccess: null,
      eoiSuccess: null,
    },
    videos: {
      welcome: {
        video: null,
        poster: null,
      },
    },
    paydockServiceId: mockPaydockServiceIds.surryHills,
    subscriptions: mockSubscriptions,
    bookingFeatureTimingOverridesEnabled: true,
    bookingPrimarySelection: "appointmentType",
    formSlugs: {
      onboard: null,
      booking: null,
      return: null,
      // HACK - use an object reference
      reasonForVisit: "reasonForVisit",
      patientHistory: null,
    },
    // faqs: [],
    // googlePlaces: {
    //   formattedAddress: "80 Wentworth Avenue, Surry Hills, NSW",
    //   formattedPhoneNumber: "(01) 1111 2222",
    //   state: "NSW",
    //   openingHours: {
    //     periods: [
    //       { close: { day: 0, time: "2200" }, open: { day: 0, time: "1100" } },
    //       { close: { day: 1, time: "2200" }, open: { day: 1, time: "1000" } },
    //       { close: { day: 2, time: "2200" }, open: { day: 2, time: "1000" } },
    //       { close: { day: 5, time: "0000" }, open: { day: 4, time: "1000" } },
    //       { close: { day: 6, time: "0200" }, open: { day: 5, time: "1000" } },
    //       { close: { day: 0, time: "0200" }, open: { day: 6, time: "1100" } },
    //     ],
    //     openNow: true,
    //     weekdayText: [
    //       "Monday: 10:00 AM – 10:00 PM",
    //       "Tuesday: 10:00 AM – 10:00 PM",
    //       "Wednesday: Closed",
    //       "Thursday: 10:00 AM – 12:00 AM",
    //       "Friday: 10:00 AM – 2:00 AM",
    //       "Saturday: 11:00 AM – 2:00 AM",
    //       "Sunday: 11:00 AM – 10:00 PM",
    //     ],
    //   },
    // },
    locationFeatures: [],
    timezone: {
      dstOffset: 3600,
      rawOffset: 36000,
      status: "OK",
      timeZoneId: "Australia/Sydney",
      timeZoneName: "Australian Eastern Daylight Time",
    },
    // region: null,
    appointmentTypeSlugs: mockAppointmentTypesSerializedLocA.map((a) => a.slug),
    appointmentTypesAndFees: [
      {
        label: "Standard",
        duration: 15,
        price: "$80",
      },
      {
        label: "Long",
        duration: 30,
        price: "$140",
      },
      {
        label: "Procedure",
        duration: 60,
        price: "$50 gap",
      },
      {
        label: "Prescription refill",
        duration: 5,
        price: "$37",
      },
    ],
    openingHours: [
      {
        label: "Monday",
        opening: "8am",
        closing: "8pm",
      },
      {
        label: "Tuesday",
        opening: "8am",
        closing: "8pm",
      },
      {
        label: "Wednesday",
        opening: "8am",
        closing: "8pm",
      },
      {
        label: "Thursday",
        opening: "8am",
        closing: "8pm",
      },
      {
        label: "Friday",
        opening: "8am",
        closing: "6pm",
      },
      {
        label: "Saturday ",
        opening: "9am",
        closing: "12pm",
      },
      {
        label: "Sunday",
        opening: "10am",
        closing: "12pm",
      },
      {
        label: "",
        opening: "",
        closing: "",
      },
    ],
  },
  {
    id: "2",
    title: "Manly Corso",
    slug: "location-manly-corso",
    url: "https://website-dev.nextpracticeclinics.com/locations/next-head-office-dev",
    externalBookingUrl: null,
    ehrId: "2",
    ehrHubId: "2",
    posterImage: {
      full: "https://d1qr34qzhiwpdo.cloudfront.net/poster-images/4k-wallpaper-close-up-dew-2137388.jpg?mtime=20190825233037",
      largePosterImage:
        "https://d1qr34qzhiwpdo.cloudfront.net/poster-images/_largeHeroHeader/4k-wallpaper-close-up-dew-2137388.jpg?mtime=20190825233037",
      squareLarge:
        "https://d1qr34qzhiwpdo.cloudfront.net/poster-images/_largeHeroHeader/4k-wallpaper-close-up-dew-2137388.jpg?mtime=20190825233037",
      squareMedium:
        "https://d1qr34qzhiwpdo.cloudfront.net/poster-images/_squareMedium/4k-wallpaper-close-up-dew-2137388.jpg?mtime=20190825233037",
      squareSmall:
        "https://d1qr34qzhiwpdo.cloudfront.net/poster-images/_squareSmall/4k-wallpaper-close-up-dew-2137388.jpg?mtime=20190825233037",
    },
    contactEmail: "dev.team@example.com",
    contactNumber: "0400 111 222",
    contactFax: null,
    address: {
      fullAddress: "The Corso, Manly, NSW",
      streetAddress: "The Corso",
      suburb: "Manly",
      state: "NSW",
      postcode: "2095",
      country: "Australia",
      lat: -33.7965547,
      lng: 151.28367,
    },
    geolocation: {
      latitude: -33.7965547,
      longitude: 151.28367,
    },
    comingSoon: false,
    environment: "development",
    allowBookings: true,
    appointmentMessage: null,
    cancellationHours: null,
    gawEvents: {
      bookingSuccess: null,
      eoiSuccess: null,
    },
    videos: {
      welcome: {
        video: null,
        poster: null,
      },
    },
    paydockServiceId: mockPaydockServiceIds.manly,
    bookingFeatureTimingOverridesEnabled: true,
    bookingPrimarySelection: "appointmentType",
    formSlugs: {
      onboard: null,
      booking: null,
      return: null,
      reasonForVisit: null,
      patientHistory: null,
    },
    subscriptions: [],
    // faqs: [],
    // googlePlaces: {
    //   formattedAddress: "80 Wentworth Avenue, Surry Hills, NSW",
    //   formattedPhoneNumber: "(01) 1111 2222",
    //   state: "NSW",
    //   openingHours: null,
    // },
    locationFeatures: [],
    timezone: null,
    // region: null,
    appointmentTypeSlugs: mockAppointmentTypesSerializedLocB.map((a) => a.slug),
    appointmentTypesAndFees: [
      {
        label: "Standard",
        duration: 15,
        price: "$80",
      },
      {
        label: "Long",
        duration: 30,
        price: "$140",
      },
    ],
    openingHours: [
      {
        label: "Monday",
        opening: "8am",
        closing: "8pm",
      },
      {
        label: "Tuesday",
        opening: "8am",
        closing: "8pm",
      },
      {
        label: "Wednesday",
        opening: "8am",
        closing: "8pm",
      },
      {
        label: "Thursday",
        opening: "8am",
        closing: "8pm",
      },
      {
        label: "Friday",
        opening: "8am",
        closing: "6pm",
      },
      {
        label: "Saturday",
        opening: "Closed",
        closing: "",
      },
      {
        label: "Sunday",
        opening: "Closed",
        closing: "",
      },
    ],
  },
  {
    id: "3",
    title: "Darling Darlo",
    slug: "location-darling-darlo",
    url: "https://website-dev.nextpracticeclinics.com/locations/next-head-office-dev",
    externalBookingUrl: "https://automedsystems.com.au/",
    // externalBookingUrl: null,
    ehrId: "3",
    ehrHubId: "3",
    posterImage: {
      full: "https://d1qr34qzhiwpdo.cloudfront.net/poster-images/4k-wallpaper-close-up-dew-2137388.jpg?mtime=20190825233037",
      largePosterImage:
        "https://d1qr34qzhiwpdo.cloudfront.net/poster-images/_largeHeroHeader/4k-wallpaper-close-up-dew-2137388.jpg?mtime=20190825233037",
      squareLarge:
        "https://d1qr34qzhiwpdo.cloudfront.net/poster-images/_largeHeroHeader/4k-wallpaper-close-up-dew-2137388.jpg?mtime=20190825233037",
      squareMedium:
        "https://d1qr34qzhiwpdo.cloudfront.net/poster-images/_squareMedium/4k-wallpaper-close-up-dew-2137388.jpg?mtime=20190825233037",
      squareSmall:
        "https://d1qr34qzhiwpdo.cloudfront.net/poster-images/_squareSmall/4k-wallpaper-close-up-dew-2137388.jpg?mtime=20190825233037",
    },
    contactEmail: "dev.team@example.com",
    contactNumber: "0400 111 222",
    contactFax: null,
    address: {
      fullAddress: "Stanley street, Darlinghurst, NSW",
      streetAddress: "The Darlo",
      suburb: "Darlinghurst",
      state: "NSW",
      postcode: "2010",
      country: "Australia",
      lat: -33.87574,
      lng: 151.215153,
    },
    geolocation: {
      latitude: -33.87574,
      longitude: 151.215153,
    },
    comingSoon: false,
    environment: "development",
    allowBookings: false,
    appointmentMessage: null,
    cancellationHours: null,
    gawEvents: {
      bookingSuccess: null,
      eoiSuccess: null,
    },
    videos: {
      welcome: {
        video: null,
        poster: null,
      },
    },
    paydockServiceId: mockPaydockServiceIds.darlinghurst,
    bookingFeatureTimingOverridesEnabled: true,
    bookingPrimarySelection: "appointmentType",
    formSlugs: {
      onboard: null,
      booking: null,
      return: null,
      reasonForVisit: null,
      patientHistory: null,
    },
    subscriptions: [],
    // faqs: [],
    // googlePlaces: {
    //   formattedAddress: "10 Stanley street, Darlinghurst, NSW",
    //   formattedPhoneNumber: "(01) 1111 2222",
    //   state: "NSW",
    //   openingHours: null,
    // },
    locationFeatures: [],
    timezone: null,
    // region: null,
    appointmentTypeSlugs: mockAppointmentTypesSerializedLocB.map((a) => a.slug),
    appointmentTypesAndFees: [],
    openingHours: [
      {
        label: "Monday",
        opening: "8am",
        closing: "8pm",
      },
      {
        label: "Tuesday",
        opening: "8am",
        closing: "8pm",
      },
      {
        label: "Wednesday",
        opening: "8am",
        closing: "8pm",
      },
      {
        label: "Thursday",
        opening: "8am",
        closing: "8pm",
      },
      {
        label: "Friday",
        opening: "8am",
        closing: "6pm",
      },
      {
        label: "Saturday",
        opening: "Closed",
        closing: "",
      },
      {
        label: "Sunday",
        opening: "Closed",
        closing: "",
      },
    ],
  },
];

export const mockNextLocations: NextLocation[] =
  mockNextLocationsSerialized.map(
    (l) => NextLocation.unserialize(l) as NextLocation,
  );
