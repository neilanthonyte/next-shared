import faker from "faker";
import { v4 as uuidv4 } from "uuid";
import { ICarePlanInterventionSnapshot } from "../models/CarePlanInterventionSnapshot";
import { generateMockCarePlanInterventionRole } from "./generateMockCarePlanInterventionRole";

/**
 * Exports a generic mock data for CarePlanInterventionSnapshot.
 * All IDs are random IDs, so if you're using it for linking, use `overrides` to add a valid
 * carePlanId to it.
 *
 * `assignees` is an empty array by default, user overrides and `generateMockCarePlanInterventionAssignee` to create
 */
export const generateMockCarePlanInterventionSnapshot = (
  overrides?: Partial<ICarePlanInterventionSnapshot>,
): ICarePlanInterventionSnapshot => {
  const mockCarePlanInterventionSnapshot: ICarePlanInterventionSnapshot = {
    interventionId: uuidv4(),
    goal: faker.random.words(5),
    task: faker.random.words(10),
    roles: [
      generateMockCarePlanInterventionRole({
        roleName: "Nurse",
        isAlliedHealth: true,
      }),
      generateMockCarePlanInterventionRole({
        roleName: "Doctor",
        isAlliedHealth: false,
      }),
      generateMockCarePlanInterventionRole({
        roleName: "Physical Therapist",
        isAlliedHealth: true,
      }),
    ],
  };
  return {
    ...mockCarePlanInterventionSnapshot,
    ...overrides,
  };
};
