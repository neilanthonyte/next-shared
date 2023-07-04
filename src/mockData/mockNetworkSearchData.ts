import {
  TSearchableDataType,
  INetworkSearchResults,
  EGender,
  EDeliveryMethod,
  EBookingBillingType,
  EOpenHours,
} from "next-shared/src/types/INetworkSearchResults";
import { Hcp } from "next-shared/src/models/Hcp";
import { ISerializedNextLocation } from "next-shared/src/models/NextLocation";
import { IAppointmentType } from "next-shared/src/models/AppointmentType";
import { mockNextLocations } from "./mockLocations";
import { mockAppointmentTypes } from "./mockAppointmentTypes";
import { ISuburb } from "next-shared/src/types/ISuburb";
import { mockHcps, mockHcpsSerialized } from "./mockHcps";
import { ISearchFilter } from "../types/ISearchFilter";

export const mockSuburbs: ISuburb[] = [
  {
    name: "surry hills",
    state: "NSW",
    postcode: "2010",
    geo: { lat: -33.8844644, lng: 151.2012775 },
  },
  {
    name: "paddington",
    state: "NSW",
    postcode: "2021",
    geo: { lat: -33.8833264, lng: 151.2191276 },
  },
  {
    name: "waverly",
    state: "NSW",
    postcode: "2024",
    geo: { lat: -33.9019877, lng: 151.2515755 },
  },
];

export const mockOutOfRangeSuburb: ISuburb[] = [
  {
    name: "melbourne",
    state: "VIC",
    postcode: "3004",
    geo: { lat: -37.971237, lng: 144.4926947 },
  },
];

export const data: {
  searchResults: {
    hcps: Hcp[];
    locations: ISerializedNextLocation[];
    appointmentTypes: IAppointmentType[];
    displayOrder: TSearchableDataType[];
    suburbs: ISuburb[];
  };
} = {
  searchResults: {
    hcps: [
      //@ts-ignore
      {
        title: "Dr Alfaz Emadi",
        type: "practitioner",
        url: "https://website-dev.nextpracticeclinics.com/hcps/dr-alfaz-emadi",
        slug: "dr-alfaz-emadi",
        ehrId: "14",
        firstName: "Alfaz",
        lastName: "Emadi",
        npServicesId: "a8dad1ea-dea8-4388-ad48-bb90eb004f56",
        worksAt: "vic-black-rock",
        description: "General Practitioner",
        bioShort:
          "General Practitioner - FRACGP, MRCGP, MBBS, DCH, DFFP, PGCTPC",
        bioLong:
          "<p><strong><em>\"I'm here with Next Practice to explore a different way to provide primary care\"</em></strong></p>\n<p>Dr Alfaz Emadi graduated from the University of London, Guy's, King's and St Thomas' Medical School in 2001 with a Bachelor of Medicine &amp; Bachelor of Surgery. Upon graduation, Alfaz worked at various hospitals covering a variety of specialties including surgery, general medicine, paediatrics, obstetrics and gynecology, emergency medicine, psychiatry, geriatric medicine, respiratory medicine and gastroenterology. He also worked in Emergency Medicine in Australia; on the Central Coast of NSW. <br /><br />Alfaz has vast experience in all branches of medicine and as a GP and has undertaken further qualifications in child health (Royal College of Paediatrics, UK) and sexual/reproductive health (Royal College of Obstetrics and &amp; Gynaecology, UK). He also has postgraduate qualifications as a GP Trainer for GP Registrars and Medical Students from the University of Westminster, London. He trains Medical Students from the University of Melbourne and GP Registrars. <br /><br />Alfaz is a Fellow of the Royal College of General Practitioners in Australia and also a Member of the Royal College of General Practitioners in the UK. He is passionate about delivering good quality and evidence-based General Practice.<br /><br />In 2016 he decided to leave the UK and start a new life with his young family in Melbourne and he is pleased to call Bayside home now. <br /><br />In his spare time, he enjoys travelling, cooking, cycling, running and exploring the great outdoors in Victoria with his family. He splits his time between being a GP and a Dad to two young boys.</p>",
        // googleCalendarId:
        //   "nextpracticehealth.com_b8bo8qlk22eufpfqrkloefo2tc@group.calendar.google.com",
        profileImage: {
          full: "https://d1qr34qzhiwpdo.cloudfront.net/profile-images/BLACK-ROCK_09_ALF.jpg?mtime=20191121094116&focal=none",
          squareMedium:
            "https://d1qr34qzhiwpdo.cloudfront.net/profile-images/_squareMedium/BLACK-ROCK_09_ALF.jpg?mtime=20191121094116&focal=none",
          squareSmall:
            "https://d1qr34qzhiwpdo.cloudfront.net/profile-images/_squareSmall/BLACK-ROCK_09_ALF.jpg?mtime=20191121094116&focal=none",
        },
        role: { label: "Medical", value: "medical" },
        appointmentMessage:
          "If you are a new patient and haven't booked in for a new patient consultation please call us on (03) 8202 3000 to speak to one of our friendly patient advocates. \n\nPlease arrive 10 minutes prior to your appointment start time to complete important information to assist your healthcare team during your consultation. \n\nYou cannot cancel within 24 hours of the appointment date. Please contact your clinic if you require further assistance.",
        tourDecorationImage:
          "https://d1qr34qzhiwpdo.cloudfront.net/app/tours/_appTourDecoration/BLACK-ROCK_09_ALF.jpg?mtime=20191121094146&focal=none",
        appointmentTypeSlugs: [
          "dr-maureen-burke-immunisation",
          "dr-maureen-burke-flu-shot",
          "dr-maureen-burke-telehealth-long-consult",
          "dr-maureen-burke-telehealth-standard-consult",
          "dr-maureen-burke-new-patient-consult-telehealth",
        ],
      },
      //@ts-ignore
      {
        title: "Dr Allara Walsh-Howe",
        type: "practitioner",
        url: "https://website-dev.nextpracticeclinics.com/hcps/dr-allara-walsh-howe",
        slug: "dr-allara-walsh-howe",
        ehrId: "25",
        firstName: "Allara",
        lastName: "Walsh-Howe",
        npServicesId: "97040cda-b17c-45f4-a764-24c526e33744",
        worksAt: "vic-black-rock",
        description: "General Practitioner",
        bioShort: "General Practitioner - MBBS (hons), B.Nut.Diet, DCH, FRACGP",
        bioLong:
          "<p>Dr Allara has grown up in Sydney and Melbourne and is a bayside local. She completed a Bachelor of Nutrition and Dietetics prior to completing her medical degree, both at Monash University. Dr Allara has worked at a variety of hospitals in Victoria and Canberra before completing her GP training in Metropolitan Melbourne. Dr Allara has completed a Diploma of Child Health and has a special interest in paediatric and adolescent medicine &amp; mental health, though she enjoys all aspects of general practice. She is passionate about providing empathetic and individualised care to her patients.</p>\n<p> In her spare time, Dr Allara enjoys exploring hiking trails, reading and discovering interesting podcasts.</p>",
        // googleCalendarId:
        //   "nextpracticehealth.com_pv335fiof9sap0ecrsh078jsh4@group.calendar.google.com",
        profileImage: {
          full: "https://d1qr34qzhiwpdo.cloudfront.net/profile-images/BLACK-ROCK_14_ALLARA.jpg?mtime=20200526114930&focal=none",
          squareMedium:
            "https://d1qr34qzhiwpdo.cloudfront.net/profile-images/_squareMedium/BLACK-ROCK_14_ALLARA.jpg?mtime=20200526114930&focal=none",
          squareSmall:
            "https://d1qr34qzhiwpdo.cloudfront.net/profile-images/_squareSmall/BLACK-ROCK_14_ALLARA.jpg?mtime=20200526114930&focal=none",
        },
        role: { label: "Medical", value: "medical" },
        tourDecorationImage:
          "https://d1qr34qzhiwpdo.cloudfront.net/app/tours/_appTourDecoration/BLACK-ROCK_14_ALLARA.jpg?mtime=20200526115039&focal=none",
        appointmentTypeSlugs: [
          "dr-maureen-burke-immunisation",
          "dr-maureen-burke-telehealth-long-consult",
          "dr-maureen-burke-telehealth-standard-consult",
          "dr-maureen-burke-new-patient-consult-telehealth",
        ],
      },
    ],
    locations: [
      {
        title: "DEV CLINIC - REPLACE ME",
        id: "4703",
        intId: 4703,
        slug: "next-head-office-dev",
        address: {
          streetAddress: "80 Wentworth Avenue",
          suburb: "Surry Hills",
          state: "NSW",
          postcode: "2010",
          lat: -33.8796398,
          lng: 151.2096382,
          fullAddress: "80 Wentworth Avenue, Surry Hills, NSW, 2010",
        },
        googlePlaces: {
          formattedAddress: "Shop 1/20 Bridge St, Sydney NSW 2000, Australia",
          formattedPhoneNumber: "(02) 8311 3580",
          openingHours: {
            periods: [
              {
                close: { day: 1, time: "1800" },
                open: { day: 1, time: "0800" },
              },
              {
                close: { day: 2, time: "1800" },
                open: { day: 2, time: "0800" },
              },
              {
                close: { day: 3, time: "1800" },
                open: { day: 3, time: "0800" },
              },
              {
                close: { day: 4, time: "1800" },
                open: { day: 4, time: "0800" },
              },
              {
                close: { day: 5, time: "1800" },
                open: { day: 5, time: "0800" },
              },
            ],
            openNow: false,
            weekdayText: [
              "Monday: 8:00 AM – 6:00 PM",
              "Tuesday: 8:00 AM – 6:00 PM",
              "Wednesday: 8:00 AM – 6:00 PM",
              "Thursday: 8:00 AM – 6:00 PM",
              "Friday: 8:00 AM – 6:00 PM",
              "Saturday: Closed",
              "Sunday: Closed",
            ],
          },
        },
        locationFeatures: [],
        timezone: {
          dstOffset: 0,
          rawOffset: 36000,
          status: "OK",
          timeZoneId: "Australia/Sydney",
          timeZoneName: "Australian Eastern Standard Time",
        },
        url: "https://website-dev.nextpracticeclinics.com/locations/next-head-office-dev",
        posterImage: {
          full: "https://d1qr34qzhiwpdo.cloudfront.net/poster-images/4k-wallpaper-close-up-dew-2137388.jpg?mtime=20190825233039&focal=none",
          largeHeroHeader:
            "https://d1qr34qzhiwpdo.cloudfront.net/poster-images/_largeHeroHeader/4k-wallpaper-close-up-dew-2137388.jpg?mtime=20190825233039&focal=none",
          squareMedium:
            "https://d1qr34qzhiwpdo.cloudfront.net/poster-images/_squareMedium/4k-wallpaper-close-up-dew-2137388.jpg?mtime=20190825233039&focal=none",
          squareSmall:
            "https://d1qr34qzhiwpdo.cloudfront.net/poster-images/_squareSmall/4k-wallpaper-close-up-dew-2137388.jpg?mtime=20190825233039&focal=none",
        },
        contactEmail: "dev.team@nextpracticehealth.com",
        contactNumber: "024354554656",
        contactFax: null,
        ehrId: "1",
        ehrHubId: "MD68507",
        allowBookings: true,
        appointmentMessage: null,
        cancellationHours: null,
        environment: "development",
        videos: {
          welcome: {
            video:
              "https://d1qr34qzhiwpdo.cloudfront.net/locations/videos/welcome-default_190219_095551.mp4?mtime=20190219205552&focal=none",
            poster:
              "https://d1qr34qzhiwpdo.cloudfront.net/locations/videos/welcome-default_190219_095546.jpg?mtime=20190219205548&focal=none",
          },
        },
        paydockServiceId: "5c8f40f94aba3c6d7f3e3245",
        subscriptions: [
          {
            uuid: "next-head-office-dev-6180",
            description: "Gold membership",
            price: 120,
            interval: "month",
            frequency: 1,
            length: 3,
          },
        ],
        appointmentTypeSlugs: [
          "dev-new-patient",
          "dev-standard",
          "dev-standard-private",
          "dev-telehealth-gap",
          "dev-telehealth",
        ],
      },
    ] as any,
    appointmentTypes: [
      {
        lengthMinutes: 20,
        lengthOverrides: {
          newPatient: 15,
        },
        label: "Food Allergy Assessment",
        description:
          "8 common food panel OR 9 common nut panel | $50 out-of-pocket per panel for Medicare card holders | NB: You need to be off anti-histamines for at 7 days prior to testing.",
        slug: "dr-kelvin-hon-food-allergy-assessment",
        method: "physical",
        patientType: "all",
        visibility: "public",
        price: 0,
        rebate: 0,
        requireCard: false,
        helixId: 8,
        payment: "none",
        externalIdentifiers: {
          helix: "standard",
          bestPractice: "standard",
          helloHealth: "standard",
        },
      },
      {
        lengthMinutes: 20,
        lengthOverrides: {
          newPatient: 15,
        },
        label: "Airborne Allergy Assessment",
        description:
          "18 common airborne | $100 out-of-pocket for Medicare card holders | NB: You need to be off anti-histamines for at 7 days prior to testing.",
        slug: "dr-kelvin-hon-airborne-allergy-assessment",
        method: "physical",
        patientType: "all",
        visibility: "public",
        price: 0,
        rebate: 0,
        requireCard: false,
        helixId: 8,
        payment: "none",
        externalIdentifiers: {
          helix: "standard",
          bestPractice: "standard",
          helloHealth: "standard",
        },
      },
      {
        lengthMinutes: 20,
        lengthOverrides: {
          newPatient: 15,
        },
        label: "Rapid Allergy Check",
        description:
          "Tests NSW Grass mix and Dust mite mix | $20 out-of-pocket for Medicare card holders | NB: You need to be off anti-histamines for at 7 days prior to testing",
        slug: "dr-kelvin-hon-rapid-allergy-check",
        method: "physical",
        patientType: "all",
        visibility: "public",
        price: 0,
        rebate: 0,
        requireCard: false,
        helixId: 8,
        payment: "none",
        externalIdentifiers: {
          helix: "standard",
          bestPractice: "standard",
          helloHealth: "standard",
        },
      },
    ],
    suburbs: [
      {
        name: "adelaide river",
        geo: { lat: -13.1661, lng: 131.1674 },
        state: "NT",
        postcode: "0846",
      },
      {
        name: "adelaide lead",
        geo: { lat: -37.086, lng: 143.6693 },
        state: "VIC",
        postcode: "3465",
      },
      {
        name: "adelaide park",
        geo: { lat: -23.0955, lng: 150.6962 },
        state: "QLD",
        postcode: "4703",
      },
      {
        name: "adelaide",
        geo: { lat: -34.9256, lng: 138.6002 },
        state: "SA",
        postcode: "5000",
      },
      {
        name: "adelaide airport",
        geo: { lat: -34.9476, lng: 138.5335 },
        state: "SA",
        postcode: "5950",
      },
    ],
    displayOrder: ["hcps", "appointmentTypes", "locations"],
  },
};

export const mockSearchResults: INetworkSearchResults = {
  suburbs: mockSuburbs,
  hcps: mockHcps,
  locations: mockNextLocations,
  appointmentTypes: mockAppointmentTypes,
  hasResults: true,
  displayOrder: ["hcps", "appointmentTypes", "locations"],
};

export const mockSearchFilters: ISearchFilter[] = [
  {
    title: "Practitioner gender",
    options: { Any: null, Male: EGender.male, Female: EGender.female },
    value: null,
  },
  {
    title: "Appointment delivery",
    options: {
      Any: null,
      Telehealth: EDeliveryMethod.digital,
      "Face to face": EDeliveryMethod.physical,
    },
    value: EDeliveryMethod.digital,
  },
  {
    title: "Billing",
    options: {
      Any: null,
      Private: EBookingBillingType.private,
      "Bulk bill": EBookingBillingType.bulk,
    },
    value: null,
  },
  {
    title: "Time of the day",
    options: {
      Any: null,
      Today: EOpenHours.today,
      "After hours": EOpenHours.afterHours,
      Weekends: EOpenHours.weekends,
    },
    value: EOpenHours.today,
  },
];

export const mockEmptySearchFilters: ISearchFilter[] = [
  {
    title: "Practitioner gender",
    options: { Any: null, Male: EGender.male, Female: EGender.female },
    value: null,
  },
  {
    title: "Appointment delivery",
    options: {
      Any: null,
      Telehealth: EDeliveryMethod.digital,
      "Face to face": EDeliveryMethod.physical,
    },
    value: null,
  },
  {
    title: "Billing",
    options: {
      Any: null,
      Private: EBookingBillingType.private,
      "Bulk bill": EBookingBillingType.bulk,
    },
    value: null,
  },
  {
    title: "Time of the day",
    options: {
      Any: null,
      Today: EOpenHours.today,
      "After hours": EOpenHours.afterHours,
      Weekends: EOpenHours.weekends,
    },
    value: null,
  },
];
