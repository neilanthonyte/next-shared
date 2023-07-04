import { MedicalStaffMember } from "next-shared/src/models/MedicalStaffMember";

import { mockNextLocationsSerialized } from "./mockLocations";

export const mockMedicalStaffMemberSerialized = [
  {
    email: "demo+potts.practitioner@nextpracticehealth.com",
    staffMemberId: "demo-potts-practitioner",
    type: "medicalStaffMember",
    instanceId: 2,
    cmsLocationSlug: mockNextLocationsSerialized[0].slug,
    ehrHelixId: 9,
    ehrHubId: "MD20338",
    ehrId: mockNextLocationsSerialized[0].ehrId,
    fhir: {
      resourceType: "Practitioner",
      id: "MD20338",
      meta: {
        versionId: "MD26578",
        lastUpdated: "2019-09-07T00:37:43.52+00:00",
      },
      extension: [
        {
          url: "http://medicaldirector.com/DomainResource/extension/IsActive",
          valueBoolean: true,
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
          value: "9",
        },
      ],
      active: true,
      name: [
        {
          text: "Dr Torben Sko",
          family: "Sko",
          given: ["Torben"],
          prefix: ["Dr"],
        },
      ],
      practitionerRole: [
        {
          location: [
            {
              reference:
                "https://api.hub.medicaldirector.com/fhir/Location/MD18404",
              display: "",
            },
          ],
        },
      ],
    },
  },
  {
    email: "daniele.peviani+practitioner@nextpracticehealth.com",
    staffMemberId: "asdfqwer1234-drdanielepeviani",
    type: "medicalStaffMember",
    instanceId: 1,
    cmsLocationSlug: mockNextLocationsSerialized[0].slug,
    ehrHelixId: 8,
    ehrHubId: "MD14309",
    ehrId: mockNextLocationsSerialized[1].ehrId,
    fhir: {
      resourceType: "Practitioner",
      id: "MD14309",
      meta: {
        versionId: "MD47576",
        lastUpdated: "2019-07-02T04:07:23.28+00:00",
      },
      extension: [
        {
          url: "http://medicaldirector.com/DomainResource/extension/IsActive",
          valueBoolean: true,
        },
      ],
      identifier: [
        {
          system: "http://medicaldirector.com/hub/identifier/app-id",
          value: "77699511-0600-4ecc-8097-bf4d93998349",
        },
        {
          system: "http://medicaldirector.com/hub/identifier/tenant-id",
          value: "next-staging.helix.medicaldirector.com",
        },
        {
          system:
            "http://medicaldirector.com/hub/identifier/external/resource/object-id",
          value: "8",
        },
      ],
      active: true,
      name: [
        {
          text: "Dr Daniele Peviani",
          family: "Peviani",
          given: ["Daniele"],
          prefix: ["Dr"],
        },
      ],
      telecom: [
        {
          system: "email",
          value: "daniele.peviani+practitioner@nextpracticehealth.com",
        },
      ],
      practitionerRole: [
        {
          location: [
            {
              reference:
                "https://integration-api.hub.medicaldirector.com/fhir/Location/MD68507",
              display: "",
            },
          ],
        },
      ],
    },
  },
];

export const mockMedicalStaffMembers = mockMedicalStaffMemberSerialized.map(
  (m) => MedicalStaffMember.unserialize(m),
);
