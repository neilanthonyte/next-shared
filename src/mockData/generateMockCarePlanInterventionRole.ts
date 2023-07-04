import faker from "faker";
import { v4 as uuidv4 } from "uuid";
import { ICarePlanInterventionRole } from "../models/CarePlanInterventionRole";

/**
 * Generates a CarePlanInterventionRole. All values are random
 * by default. isAlliedHealth is `false` by default.
 *
 * Use `overrides` to add the values you desire.
 */
export const generateMockCarePlanInterventionRole = (
  overrides?: Partial<ICarePlanInterventionRole>,
): ICarePlanInterventionRole => {
  const roles = [
    "Diabetes Educator",
    "Nutritionist",
    "Oncologist",
    "Nurse",
    "Cardiologist",
    "Physio Therapist",
  ];

  const mockCarePlanInterventionRole: ICarePlanInterventionRole = {
    roleId: uuidv4(),
    roleName: faker.random.arrayElement(roles),
    isAlliedHealth: false,
  };

  return {
    ...mockCarePlanInterventionRole,
    ...overrides,
  };
};
