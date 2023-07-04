import {
  IPatientDataSection,
  EPatientDataSectionNames,
  EPatientDataSelection,
} from "../types/IPatientDataSection";
import {
  auPatientProfileMedicareSystem,
  extensionPatientCentreLink,
  extensionPatientDVA,
} from "./constants";

/**
 * Map object with supported patient data sections and relative fhir property maps and filters
 */
export const defaultPatientDataSections: IPatientDataSection[] = [
  {
    name: EPatientDataSectionNames.Identifiers,
    maps: ["name.0.given.0", "name.0.family", "name.0.prefix.0", "birthDate"],
    selection: EPatientDataSelection.Ehr,
    icon: "avatar-genderless",
  },
  {
    name: EPatientDataSectionNames.Contact,
    maps: [
      {
        map: "telecom",
        filters: [{ key: "system", value: "phone" }],
      },
      { map: "telecom", filters: [{ key: "system", value: "email" }] },
    ],
    selection: EPatientDataSelection.Ehr,
    icon: "contact-info",
  },
  {
    name: EPatientDataSectionNames.Address,
    maps: ["address"],
    selection: EPatientDataSelection.Ehr,
    icon: "address",
  },
  {
    name: EPatientDataSectionNames.EmergencyContact,
    maps: ["contact"],
    selection: EPatientDataSelection.Ehr,
    icon: "emergency-contact",
  },
  {
    name: EPatientDataSectionNames.Medicare,
    maps: [
      {
        map: "identifier",
        filters: [
          {
            key: "system",
            value: auPatientProfileMedicareSystem,
          },
        ],
      },
    ],
    selection: EPatientDataSelection.Ehr,
    icon: "medical-cards",
  },
  {
    name: EPatientDataSectionNames.Dva,
    maps: [
      {
        map: "identifier",
        filters: [
          {
            key: "system",
            value: extensionPatientDVA,
          },
        ],
      },
    ],
    selection: EPatientDataSelection.Ehr,
    icon: "medical-cards",
  },
  {
    name: EPatientDataSectionNames.Crn,
    maps: [
      {
        map: "identifier",
        filters: [
          {
            key: "system",
            value: extensionPatientCentreLink,
          },
        ],
      },
    ],
    selection: EPatientDataSelection.Ehr,
    icon: "medical-cards",
  },
];
