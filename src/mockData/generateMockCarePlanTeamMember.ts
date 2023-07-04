import { v4 as uuidv4 } from "uuid";
import faker from "faker";
import { ICarePlanTeamMember } from "../models/CarePlanTeamMember";
import FhirDirectory from "../types/FhirDirectory";
import { generateMockExternalContactAddress } from "../mockData/generateMockExternalContactAddress";
import { generateMockExternalContactTelecom } from "../mockData/generateMockExternalContactTelecom";

/**
 * Generates a new ICarePlanTeamMember object with random mock data.
 *
 * @param {Partial<ICarePlanTeamMember>} [overrides] Optional overrides for the default mock data.
 * @returns {ICarePlanTeamMember} A new ICarePlanTeamMember object with random mock data.
 */
export const generateMockCarePlanTeamMember = (
  overrides?: Partial<ICarePlanTeamMember>,
): ICarePlanTeamMember => {
  const doctorSpecialties = [
    "Allergist/Immunologist",
    "Anesthesiologist",
    "Cardiologist",
    "Dermatologist",
    "Emergency Medicine Specialist",
    "Endocrinologist",
    "Family Medicine Physician",
    "Gastroenterologist",
    "Hematologist",
    "Infectious Disease Specialist",
    "Internist",
    "Medical Geneticist",
    "Nephrologist",
    "Neurologist",
    "Neurosurgeon",
    "Obstetrician/Gynecologist",
    "Oncologist",
    "Ophthalmologist",
    "Orthopedic Surgeon",
    "Otolaryngologist (ENT)",
    "Pathologist",
    "Pediatrician",
    "Plastic Surgeon",
    "Psychiatrist",
    "Pulmonary Medicine Physician",
    "Radiation Oncologist",
    "Radiologist",
    "Rheumatologist",
    "Sleep Medicine Specialist",
    "Sports Medicine Specialist",
    "Surgeon",
    "Thoracic Surgeon",
    "Urologist",
  ];

  const contactTypes = ["PRACTITIONER_ROLE", "HEALTH_CARE_SERVICE"];

  const carePlanTeamMemberId = uuidv4();
  const roleId = uuidv4();
  const externalContactId = uuidv4();
  const externalContactSource = faker.random.arrayElement([
    FhirDirectory.HEALTHLINK,
    FhirDirectory.MEDICAL_OBJECTS,
    FhirDirectory.LOCAL,
  ]);
  const externalContactSpecialty = faker.random.arrayElement(doctorSpecialties);
  const externalContactOrganisation = faker.company.companyName();
  const externalContactType = faker.random.arrayElement(contactTypes);
  const externalContactAddress = generateMockExternalContactAddress();
  const externalContactTelecom = generateMockExternalContactTelecom();
  const numberOfServices =
    overrides?.numberOfServices ?? faker.datatype.number(10);

  return {
    carePlanTeamMemberId,
    roleId,
    externalContactId,
    externalContactSource,
    externalContactSpecialty,
    externalContactOrganisation,
    externalContactType,
    externalContactAddress,
    externalContactTelecom,
    numberOfServices,
    ...overrides,
  };
};
