import { v4 as uuidv4 } from "uuid";
import faker from "faker";

import { IWlhPatient } from "../models/WlhPatient";
import { IWlhPerson } from "../models/WlhPerson";
import { IWlhProvider } from "../models/WlhProvider";
import { EPersonType } from "../types/EPersonType";

/**
 * Generates a new IWlhPerson object with random mock data.
 *
 * @param {Partial<IWlhPerson>} [overrides] Optional overrides for the default mock data.
 * @returns {IWlhPerson} A new IWlhPerson object with random mock data.
 */
const generateMockWlhPerson = (overrides?: Partial<IWlhPerson>): IWlhPerson => {
  const gender = faker.datatype.number({ min: 1, max: 5 });

  const defaults: IWlhPerson = {
    avatarFilename: faker.datatype.boolean() ? faker.image.avatar() : null,
    birthDate: faker.date.past().toISOString().substring(0, 10),
    displayName: faker.name.findName(),
    firstName: faker.name.firstName(),
    gender: gender,
    lastName: faker.name.lastName(),
    middleName: faker.name.middleName(),
    prefix: faker.name.prefix(),
    suffix: faker.name.suffix(),
    personType: faker.random.arrayElement(Object.values(EPersonType)),
  };

  return { ...defaults, ...overrides };
};

/**
 * Generates a new IWlhPatient object with random mock data.
 *
 * @param {Partial<IWlhPatient>} [overrides] Optional overrides for the default mock data.
 * @returns {IWlhPatient} A new IWlhPatient object with random mock data.
 */
export const generateMockWlhPatient = (
  overrides?: Partial<IWlhPatient>,
): IWlhPatient => {
  const { patientId, ...personOverrides } = overrides || {};
  const person = generateMockWlhPerson(personOverrides);

  const defaults: IWlhPatient = {
    ...person,
    patientId: patientId || uuidv4(),
  };

  return { ...defaults, ...overrides };
};

/**
 * Generates a new IWlhProvider object with random mock data.
 *
 * @param {Partial<IWlhProvider>} [overrides] Optional overrides for the default mock data.
 * @returns {IWlhProvider} A new IWlhProvider object with random mock data.
 */
export const generateMockWlhProvider = (
  overrides?: Partial<IWlhProvider>,
): IWlhProvider => {
  const { providerId, ...personOverrides } = overrides || {};
  const person = generateMockWlhPerson(personOverrides);

  const defaults: IWlhProvider = {
    ...person,
    providerId: providerId || uuidv4(),
  };

  return { ...defaults, ...overrides };
};
