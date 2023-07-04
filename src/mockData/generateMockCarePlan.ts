import { v4 as uuidv4 } from "uuid";
import faker from "faker";
import { ECarePlanTypes, ICarePlan } from "../models/CarePlan";

const getRandomCarePlanType = (): ECarePlanTypes => {
  const availableTypes = Object.values(ECarePlanTypes);
  const index = Math.floor(Math.random() * availableTypes.length);
  return availableTypes[index];
};

const generateMockCarePlanTitle = (carePlanType: ECarePlanTypes): string => {
  const fakePatientName = faker.name.firstName();
  if (carePlanType === ECarePlanTypes.GPMP) {
    return `GP Mental Health Treatment Plans for ${fakePatientName}`;
  }
  if (carePlanType === ECarePlanTypes.TCA) {
    return `Team Care Arrangement for ${fakePatientName}`;
  }
  return `Care Plan for ${fakePatientName}`;
};

/**
 * Generates a mock plain Care Plan object.
 * To use as model do:
 * ```
 * const carePlanData = generateMockCarePlan();
 * const carePlan = new CarePlan(carePlanData);
 */
export const generateMockCarePlan = (
  overrides: Partial<ICarePlan> = {},
): ICarePlan => {
  const { type: overrideType, ...overrideProps } = overrides;
  const type = overrideType ?? getRandomCarePlanType();

  const providerId = uuidv4();

  const mockCarePlan: ICarePlan = {
    carePlanId: uuidv4(),
    patientId: uuidv4(),
    clinicLocationId: uuidv4(),
    providerId,
    title: generateMockCarePlanTitle(type),
    type,
    finalisedAt: null,
    parentCarePlanId: null,
    rootCarePlanId: null,
    notes: null,
    carePlanModuleVersion: `v2.20.0`,
    authorUserId: providerId,
    finalisedByUserId: null,
  };

  return {
    ...mockCarePlan,
    ...overrideProps,
  };
};
