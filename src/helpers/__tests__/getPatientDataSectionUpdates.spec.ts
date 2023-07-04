import {
  mockPatient1Fhir,
  mockPatient2Fhir,
} from "../../mockData/mockFhirPatients";
import { cloneDeep } from "lodash";
import { getPatientDataSectionsUpdates } from "../getPatientDataSectionsUpdates";
import {
  auPatientProfileMedicareSystem,
  extensionPatientCentreLink,
  extensionPatientDVA,
} from "../constants";

it("returns matching for all sections when the FHIR is the same", () => {
  const ehrPatient = cloneDeep(mockPatient1Fhir);
  const nextPatient = cloneDeep(mockPatient1Fhir);

  const result = getPatientDataSectionsUpdates(ehrPatient, nextPatient);

  expect(result.map((r) => r.status).every((s) => s === "matching")).toBe(true);
});

it("correctly flags updates to the given name", () => {
  const ehrPatient = cloneDeep(mockPatient1Fhir);
  const nextPatient = cloneDeep(mockPatient1Fhir);

  nextPatient.name[0].given = ["Fred"];

  const result = getPatientDataSectionsUpdates(ehrPatient, nextPatient);

  expect(result.find((s) => s.name === "Identifiers").status).toBe("updated");
});

it("correctly flags updates to the family name", () => {
  const ehrPatient = cloneDeep(mockPatient1Fhir);
  const nextPatient = cloneDeep(mockPatient1Fhir);

  nextPatient.name[0].family = "Johnson";

  const result = getPatientDataSectionsUpdates(ehrPatient, nextPatient);

  expect(result.find((s) => s.name === "Identifiers").status).toBe("updated");
});

it("correctly flags updates to the patient's title", () => {
  const ehrPatient = cloneDeep(mockPatient1Fhir);
  const nextPatient = cloneDeep(mockPatient1Fhir);

  nextPatient.name[0].prefix = ["Dr"];

  const result = getPatientDataSectionsUpdates(ehrPatient, nextPatient);

  expect(result.find((s) => s.name === "Identifiers").status).toBe("updated");
});

it("correctly flags updates to the patient's birth date", () => {
  const ehrPatient = cloneDeep(mockPatient1Fhir);
  const nextPatient = cloneDeep(mockPatient1Fhir);

  nextPatient.birthDate = "2000-05-26";

  const result = getPatientDataSectionsUpdates(ehrPatient, nextPatient);

  expect(result.find((s) => s.name === "Identifiers").status).toBe("updated");
});

it("correctly flags updates to the patient's phone number", () => {
  const ehrPatient = cloneDeep(mockPatient1Fhir);
  const nextPatient = cloneDeep(mockPatient1Fhir);

  const telecom = nextPatient.telecom.find((t) => t.system === "phone");
  telecom.value = "+61491572983";

  const result = getPatientDataSectionsUpdates(ehrPatient, nextPatient);

  expect(result.find((s) => s.name === "Contact").status).toBe("updated");
});

it("correctly flags updates to the patient's email address", () => {
  const ehrPatient = cloneDeep(mockPatient1Fhir);
  const nextPatient = cloneDeep(mockPatient1Fhir);

  const telecom = nextPatient.telecom.find((t) => t.system === "email");
  telecom.value = "test@test.com";

  const result = getPatientDataSectionsUpdates(ehrPatient, nextPatient);

  expect(result.find((s) => s.name === "Contact").status).toBe("updated");
});

it("correctly flags updates to the patient's address", () => {
  const ehrPatient = cloneDeep(mockPatient1Fhir);
  const nextPatient = cloneDeep(mockPatient1Fhir);

  nextPatient.address[0].country = "New Zealand";

  const result = getPatientDataSectionsUpdates(ehrPatient, nextPatient);

  expect(result.find((s) => s.name === "Address").status).toBe("updated");
});

it("correctly flags updates to the patient's emergency contact", () => {
  const ehrPatient = cloneDeep(mockPatient1Fhir);
  const nextPatient = cloneDeep(mockPatient1Fhir);

  nextPatient.contact[0].name.family = "Dumbledore";

  const result = getPatientDataSectionsUpdates(ehrPatient, nextPatient);

  expect(result.find((s) => s.name === "Emergency").status).toBe("updated");
});

it("correctly flags updates to the patient's medicare details", () => {
  const ehrPatient = cloneDeep(mockPatient1Fhir);
  const nextPatient = cloneDeep(mockPatient1Fhir);

  const medicare = nextPatient.identifier.find(
    (id) => id.system === auPatientProfileMedicareSystem,
  );
  medicare.period.end = "2030-03";

  const result = getPatientDataSectionsUpdates(ehrPatient, nextPatient);

  expect(result.find((s) => s.name === "Medicare").status).toBe("updated");
});

it("correctly flags updates to the patient's DVA details", () => {
  const ehrPatient = cloneDeep(mockPatient2Fhir);
  const nextPatient = cloneDeep(mockPatient2Fhir);

  const dva = nextPatient.identifier.find(
    (id) => id.system === extensionPatientDVA,
  );
  dva.value = "ND736291";

  const result = getPatientDataSectionsUpdates(ehrPatient, nextPatient);

  expect(result.find((s) => s.name === "Dva").status).toBe("updated");
});

it("correctly flags updates to the patient's Centrelink details", () => {
  const ehrPatient = cloneDeep(mockPatient1Fhir);
  const nextPatient = cloneDeep(mockPatient1Fhir);

  const crn = nextPatient.identifier.find(
    (id) => id.system === extensionPatientCentreLink,
  );
  crn.value = "203-723-837B";

  const result = getPatientDataSectionsUpdates(ehrPatient, nextPatient);

  expect(result.find((s) => s.name === "Crn").status).toBe("updated");
});
