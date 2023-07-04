import moment from "moment";

import { IAppointmentWithDetails } from "../types/IAppointmentWithDetails";
import { mockAppointmentTypes } from "./mockAppointmentTypes";
import { mockCreditCard } from "./mockCreditCard";
import { mockReasonForVisit } from "./mockFhirPatientResources";
import { mockHcps } from "./mockHcps";
import { mockNextLocations } from "./mockLocations";

export const mockAppointmentsSerialized: fhir3.Appointment[] = [
  {
    resourceType: "Appointment",
    id: "MD1085231",
    meta: {
      versionId: "MD2081923",
      lastUpdated: "2020-03-12T23:10:30.158+00:00",
    },
    extension: [
      {
        url: "http://medicaldirector.com/Schedule/extension/Appointment-Type",
        valueQuantity: {
          extension: [
            {
              url: "http://medicaldirector.com/Appointment-Type/extension/Name",
              valueString: "Standard",
            },
            {
              url: "http://medicaldirector.com/Appointment-Type/extension/ExternalId",
              valueString: "1",
            },
          ],
          value: 10,
          unit: "min",
        },
      },
      {
        url: "http://nextpracticehealth.com/extension/appointment/cancellation-token",
        valueString: "4d36b220-b21c-43e9-9c51-dd2ec4bdb2e3",
      },
      {
        url: "http://nextpracticehealth.com/extension/appointment-cms-location-id",
        valueString: mockNextLocations[0].id,
      },
      {
        url: "http://nextpracticehealth.com/extension/appointment/slug",
        valueString: mockAppointmentTypes[0].slug,
      },
      {
        url: "http://nextpracticehealth.com/extension/appointment/label",
        valueString: mockAppointmentTypes[0].label,
      },
    ],
    identifier: [
      {
        system: "http://medicaldirector.com/hub/identifier/app-id",
        value: "77699511-0600-4ecc-8097-bf4d93998349",
      },
      {
        system: "http://medicaldirector.com/hub/identifier/tenant-id",
        value: "next-demo.helix.medicaldirector.com",
      },
      {
        system:
          "http://medicaldirector.com/hub/identifier/external/resource/object-id",
        value: "214",
      },
    ],
    status: "arrived",
    start: "2020-03-13T10:30:00+11:00",
    end: "2020-03-13T10:40:00+11:00",
    comment: "Source: Next Practice",
    participant: [
      {
        type: [
          {
            coding: [
              { system: "http://hl7.org/fhir/participant-type", code: "PPRF" },
            ],
          },
        ],
        actor: {
          reference:
            "https://api.hub.medicaldirector.com/fhir/Practitioner/MD20338",
          display: "",
        },
        status: "accepted",
      },
      {
        type: [
          {
            coding: [
              { system: "http://hl7.org/fhir/participant-type", code: "LOC" },
            ],
          },
        ],
        actor: {
          reference:
            "https://api.hub.medicaldirector.com/fhir/Location/MD18404",
          display: "",
        },
        status: "accepted",
      },
      {
        type: [
          {
            coding: [
              { system: "http://hl7.org/fhir/participant-type", code: "DST" },
            ],
          },
        ],
        actor: {
          reference:
            "https://api.hub.medicaldirector.com/fhir/HealthcareService/MD1853",
          display: "",
        },
        status: "accepted",
      },
      {
        type: [
          {
            coding: [
              { system: "http://hl7.org/fhir/participant-type", code: "SBJ" },
            ],
          },
        ],
        actor: {
          reference:
            "https://api.hub.medicaldirector.com/fhir/Patient/MD440281",
          display: "",
        },
        status: "accepted",
      },
    ],
  },
  {
    resourceType: "Appointment",
    id: "MD1087024",
    meta: {
      versionId: "MD2086631",
      lastUpdated: "2020-03-15T01:56:51.225+00:00",
    },
    extension: [
      {
        url: "http://medicaldirector.com/Schedule/extension/Appointment-Type",
        valueQuantity: {
          extension: [
            {
              url: "http://medicaldirector.com/Appointment-Type/extension/Name",
              valueString: "Standard",
            },
            {
              url: "http://medicaldirector.com/Appointment-Type/extension/ExternalId",
              valueString: "1",
            },
          ],
          value: 10,
          unit: "min",
        },
      },
      {
        url: "http://nextpracticehealth.com/extension/appointment/cancellation-token",
        valueString: "c18027c9-046f-4dfc-9712-138e72f728af",
      },
      {
        url: "http://nextpracticehealth.com/extension/appointment-cms-location-id",
        valueString: "740",
      },
    ],
    identifier: [
      {
        system: "http://medicaldirector.com/hub/identifier/app-id",
        value: "77699511-0600-4ecc-8097-bf4d93998349",
      },
      {
        system: "http://medicaldirector.com/hub/identifier/tenant-id",
        value: "next-demo.helix.medicaldirector.com",
      },
      {
        system:
          "http://medicaldirector.com/hub/identifier/external/resource/object-id",
        value: "217",
      },
    ],
    status: "booked",
    start: "2020-03-16T09:00:00+11:00",
    end: "2020-03-16T09:10:00+11:00",
    comment: "Source: Next Practice",
    participant: [
      {
        type: [
          {
            coding: [
              { system: "http://hl7.org/fhir/participant-type", code: "PPRF" },
            ],
          },
        ],
        actor: {
          reference:
            "https://api.hub.medicaldirector.com/fhir/Practitioner/MD20338",
          display: "",
        },
        status: "accepted",
      },
      {
        type: [
          {
            coding: [
              { system: "http://hl7.org/fhir/participant-type", code: "LOC" },
            ],
          },
        ],
        actor: {
          reference:
            "https://api.hub.medicaldirector.com/fhir/Location/MD18404",
          display: "",
        },
        status: "accepted",
      },
      {
        type: [
          {
            coding: [
              { system: "http://hl7.org/fhir/participant-type", code: "DST" },
            ],
          },
        ],
        actor: {
          reference:
            "https://api.hub.medicaldirector.com/fhir/HealthcareService/MD1853",
          display: "",
        },
        status: "accepted",
      },
      {
        type: [
          {
            coding: [
              { system: "http://hl7.org/fhir/participant-type", code: "SBJ" },
            ],
          },
        ],
        actor: {
          reference:
            "https://api.hub.medicaldirector.com/fhir/Patient/MD440281",
          display: "",
        },
        status: "accepted",
      },
    ],
  },
  {
    resourceType: "Appointment",
    id: "MD1087090",
    meta: {
      versionId: "MD2086631",
      lastUpdated: "2020-03-15T01:56:51.225+00:00",
    },
    extension: [
      {
        url: "http://medicaldirector.com/Schedule/extension/Appointment-Type",
        valueQuantity: {
          extension: [
            {
              url: "http://medicaldirector.com/Appointment-Type/extension/Name",
              valueString: "Standard",
            },
            {
              url: "http://medicaldirector.com/Appointment-Type/extension/ExternalId",
              valueString: "1",
            },
          ],
          value: 10,
          unit: "min",
        },
      },
      {
        url: "http://nextpracticehealth.com/extension/appointment/cancellation-token",
        valueString: "c18027c9-046f-4dfc-9712-138e72f728af",
      },
      {
        url: "http://nextpracticehealth.com/extension/appointment-cms-location-id",
        valueString: "750",
      },
    ],
    identifier: [
      {
        system: "http://medicaldirector.com/hub/identifier/app-id",
        value: "77699511-0600-4ecc-8097-bf4d93998349",
      },
      {
        system: "http://medicaldirector.com/hub/identifier/tenant-id",
        value: "next-demo.helix.medicaldirector.com",
      },
      {
        system:
          "http://medicaldirector.com/hub/identifier/external/resource/object-id",
        value: "217",
      },
    ],
    status: "booked",
    start: "2020-03-16T09:00:00+11:00",
    end: "2020-03-16T09:10:00+11:00",
    comment: "Source: Next Practice",
    participant: [
      {
        type: [
          {
            coding: [
              { system: "http://hl7.org/fhir/participant-type", code: "PPRF" },
            ],
          },
        ],
        actor: {
          reference:
            "https://api.hub.medicaldirector.com/fhir/Practitioner/MD20338",
          display: "",
        },
        status: "accepted",
      },
      {
        type: [
          {
            coding: [
              { system: "http://hl7.org/fhir/participant-type", code: "LOC" },
            ],
          },
        ],
        actor: {
          reference:
            "https://api.hub.medicaldirector.com/fhir/Location/MD18404",
          display: "",
        },
        status: "accepted",
      },
      {
        type: [
          {
            coding: [
              { system: "http://hl7.org/fhir/participant-type", code: "DST" },
            ],
          },
        ],
        actor: {
          reference:
            "https://api.hub.medicaldirector.com/fhir/HealthcareService/MD1853",
          display: "",
        },
        status: "accepted",
      },
      {
        type: [
          {
            coding: [
              { system: "http://hl7.org/fhir/participant-type", code: "SBJ" },
            ],
          },
        ],
        actor: {
          reference:
            "https://api.hub.medicaldirector.com/fhir/Patient/MD440281",
          display: "",
        },
        status: "accepted",
      },
    ],
  },
  {
    resourceType: "Appointment",
    id: "MD1085931",
    meta: {
      versionId: "MD1085931",
      lastUpdated: "2020-03-12T23:10:30.158+00:00",
    },
    extension: [
      {
        url: "http://medicaldirector.com/Schedule/extension/Appointment-Type",
        valueQuantity: {
          extension: [
            {
              url: "http://medicaldirector.com/Appointment-Type/extension/Name",
              valueString: "Standard",
            },
            {
              url: "http://medicaldirector.com/Appointment-Type/extension/ExternalId",
              valueString: "1",
            },
          ],
          value: 10,
          unit: "min",
        },
      },
      {
        url: "http://nextpracticehealth.com/extension/appointment/cancellation-token",
        valueString: "4d36b220-b21c-43e9-9c51-dd2ec4bdb2e3",
      },
      {
        url: "http://nextpracticehealth.com/extension/appointment-cms-location-id",
        valueString: mockNextLocations[0].id,
      },
      {
        url: "http://nextpracticehealth.com/extension/appointment/slug",
        valueString: mockAppointmentTypes[0].slug,
      },
      {
        url: "http://nextpracticehealth.com/extension/appointment/label",
        valueString: mockAppointmentTypes[0].label,
      },
    ],
    identifier: [
      {
        system: "http://medicaldirector.com/hub/identifier/app-id",
        value: "77699511-0600-4ecc-8097-bf4d93998349",
      },
      {
        system: "http://medicaldirector.com/hub/identifier/tenant-id",
        value: "next-demo.helix.medicaldirector.com",
      },
      {
        system:
          "http://medicaldirector.com/hub/identifier/external/resource/object-id",
        value: "214",
      },
    ],
    status: "arrived",
    start: "2020-03-13T10:30:00+11:00",
    end: "2020-03-13T10:40:00+11:00",
    comment: "Source: Next Practice",
    participant: [
      {
        type: [
          {
            coding: [
              { system: "http://hl7.org/fhir/participant-type", code: "PPRF" },
            ],
          },
        ],
        actor: {
          reference:
            "https://api.hub.medicaldirector.com/fhir/Practitioner/MD20338",
          display: "",
        },
        status: "accepted",
      },
      {
        type: [
          {
            coding: [
              { system: "http://hl7.org/fhir/participant-type", code: "LOC" },
            ],
          },
        ],
        actor: {
          reference:
            "https://api.hub.medicaldirector.com/fhir/Location/MD18404",
          display: "",
        },
        status: "accepted",
      },
      {
        type: [
          {
            coding: [
              { system: "http://hl7.org/fhir/participant-type", code: "DST" },
            ],
          },
        ],
        actor: {
          reference:
            "https://api.hub.medicaldirector.com/fhir/HealthcareService/MD1853",
          display: "",
        },
        status: "accepted",
      },
      {
        type: [
          {
            coding: [
              { system: "http://hl7.org/fhir/participant-type", code: "SBJ" },
            ],
          },
        ],
        actor: {
          reference:
            "https://api.hub.medicaldirector.com/fhir/Patient/MD440281",
          display: "",
        },
        status: "accepted",
      },
    ],
  },
];

const cancelledAppointment: fhir3.Appointment = {
  resourceType: "Appointment",
  id: "MD1012931",
  meta: {
    versionId: "MD1085931",
    lastUpdated: "2020-03-12T23:10:30.158+00:00",
  },
  extension: [
    {
      url: "http://medicaldirector.com/Schedule/extension/Appointment-Type",
      valueQuantity: {
        extension: [
          {
            url: "http://medicaldirector.com/Appointment-Type/extension/Name",
            valueString: "Standard",
          },
          {
            url: "http://medicaldirector.com/Appointment-Type/extension/ExternalId",
            valueString: "1",
          },
        ],
        value: 10,
        unit: "min",
      },
    },
    {
      url: "http://nextpracticehealth.com/extension/appointment/cancellation-token",
      valueString: "4d36b220-b21c-43e9-9c51-dd2ec4bdb2e3",
    },
    {
      url: "http://nextpracticehealth.com/extension/appointment-cms-location-id",
      valueString: mockNextLocations[0].id,
    },
    {
      url: "http://nextpracticehealth.com/extension/appointment/slug",
      valueString: mockAppointmentTypes[0].slug,
    },
    {
      url: "http://nextpracticehealth.com/extension/appointment/label",
      valueString: mockAppointmentTypes[0].label,
    },
  ],
  identifier: [
    {
      system: "http://medicaldirector.com/hub/identifier/app-id",
      value: "77699511-0600-4ecc-8097-bf4d93998349",
    },
    {
      system: "http://medicaldirector.com/hub/identifier/tenant-id",
      value: "next-demo.helix.medicaldirector.com",
    },
    {
      system:
        "http://medicaldirector.com/hub/identifier/external/resource/object-id",
      value: "214",
    },
  ],
  status: "cancelled",
  start: "2020-03-13T10:30:00+11:00",
  end: "2020-03-13T10:40:00+11:00",
  comment: "Source: Next Practice",
  participant: [
    {
      type: [
        {
          coding: [
            { system: "http://hl7.org/fhir/participant-type", code: "PPRF" },
          ],
        },
      ],
      actor: {
        reference:
          "https://api.hub.medicaldirector.com/fhir/Practitioner/MD20338",
        display: "",
      },
      status: "accepted",
    },
    {
      type: [
        {
          coding: [
            { system: "http://hl7.org/fhir/participant-type", code: "LOC" },
          ],
        },
      ],
      actor: {
        reference: "https://api.hub.medicaldirector.com/fhir/Location/MD18404",
        display: "",
      },
      status: "accepted",
    },
    {
      type: [
        {
          coding: [
            { system: "http://hl7.org/fhir/participant-type", code: "DST" },
          ],
        },
      ],
      actor: {
        reference:
          "https://api.hub.medicaldirector.com/fhir/HealthcareService/MD1853",
        display: "",
      },
      status: "accepted",
    },
    {
      type: [
        {
          coding: [
            { system: "http://hl7.org/fhir/participant-type", code: "SBJ" },
          ],
        },
      ],
      actor: {
        reference: "https://api.hub.medicaldirector.com/fhir/Patient/MD440281",
        display: "",
      },
      status: "accepted",
    },
  ],
};

const momentNow = moment();
const momentStartFuture = momentNow.clone().add(2, "days");
const momentStartPast = momentNow.clone().subtract(2, "weeks");
// TODO appointments ids don't match location and practitioners ids
export const mockUpcomingAppointmentWithDetailsWithoutForm: IAppointmentWithDetails =
  {
    appointment: {
      ...mockAppointmentsSerialized[0],
      id: "generated-appointment-id-upcoming-details-no-form",
      start: momentStartFuture.toISOString(),
      end: momentStartFuture.clone().add(15, "minutes").toISOString(),
    },
    hcp: mockHcps[0],
    location: mockNextLocations.find((l) => l.slug === mockHcps[0].worksAt),
    forms: null,
  };

export const mockUpcomingAppointmentWithDetailsWithPayment: IAppointmentWithDetails =
  {
    appointment: {
      ...mockAppointmentsSerialized[0],
      id: "generated-appointment-id-upcoming-details-payments",
      start: momentStartFuture.toISOString(),
      end: momentStartFuture.clone().add(30, "minutes").toISOString(),
    },
    hcp: mockHcps[0],
    location: mockNextLocations.find((l) => l.slug === mockHcps[0].worksAt),
    payment: mockCreditCard,
  };

export const mockUpcomingAppointmentWithDetailsWithForm: IAppointmentWithDetails =
  {
    appointment: {
      ...mockAppointmentsSerialized[1],
      id: "generated-appointment-id-upcoming-details-form",
      start: momentStartFuture.clone().add(2, "days").toISOString(),
      end: momentStartFuture.clone().add(15, "minutes").toISOString(),
    },
    hcp: mockHcps[0],
    location: mockNextLocations.find((l) => l.slug === mockHcps[0].worksAt),
    forms: [mockReasonForVisit[0]],
    payment: mockCreditCard,
  };

export const mockUpcomingAppointmentWithDetailsNotCancellable: IAppointmentWithDetails =
  {
    appointment: {
      ...mockAppointmentsSerialized[3],
      id: "generated-appointment-id-upcoming-details-no-cancel",
      start: momentNow.clone().add(20, "hours").toISOString(),
      end: momentNow.clone().add(21, "hours").toISOString(),
    },
    hcp: mockHcps[0],
    location: mockNextLocations.find((l) => l.slug === mockHcps[0].worksAt),
    forms: [mockReasonForVisit[0]],
  };

export const mockUpcomingAppointmentWithDetailsCancelled: IAppointmentWithDetails =
  {
    appointment: {
      ...cancelledAppointment,
      id: "generated-appointment-id-upcoming-details-cancelled",
      start: momentStartFuture.clone().add(2, "days").toISOString(),
      end: momentStartFuture.clone().add(15, "minutes").toISOString(),
    },
    hcp: mockHcps[0],
    location: mockNextLocations.find((l) => l.slug === mockHcps[0].worksAt),
    forms: [mockReasonForVisit[0]],
  };

export const mockPastAppointmentWithDetailsWithForm: IAppointmentWithDetails = {
  appointment: {
    ...mockAppointmentsSerialized[2],
    id: "generated-appointment-id-past-details-form",
    start: momentStartPast.toISOString(),
    end: momentStartPast.clone().add(15, "minutes").toISOString(),
    status: "fulfilled",
  },
  hcp: mockHcps[0],
  location: mockNextLocations.find((l) => l.slug === mockHcps[0].worksAt),
  forms: [mockReasonForVisit[0]],
};

export const mockAppointmentsWithDetails = [
  mockUpcomingAppointmentWithDetailsWithoutForm,
  mockUpcomingAppointmentWithDetailsWithForm,
  mockUpcomingAppointmentWithDetailsWithPayment,
  mockUpcomingAppointmentWithDetailsNotCancellable,
  mockUpcomingAppointmentWithDetailsCancelled,
  mockPastAppointmentWithDetailsWithForm,
];
