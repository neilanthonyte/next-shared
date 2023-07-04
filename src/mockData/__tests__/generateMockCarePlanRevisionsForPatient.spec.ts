import { v4 as uuidv4 } from "uuid";
import { ECarePlanTypes } from "../../models/CarePlan";
import { generateMockCarePlanRevisionsForPatient } from "../generateMockCarePlanRevisionsForPatient";

describe("generateMockCarePlanRevisionsForPatient", () => {
  const patientId = uuidv4();
  const carePlanType = ECarePlanTypes.GPMP;
  const revisionCount = 3;

  it("returns an array of care plans with correct properties", () => {
    const carePlans = generateMockCarePlanRevisionsForPatient({
      patientId,
      carePlanType,
      revisionCount,
    });

    expect(Array.isArray(carePlans)).toBe(true);
    expect(carePlans.length).toBe(revisionCount);

    carePlans.forEach((carePlan, i) => {
      expect(typeof carePlan.carePlanId).toBe("string");
      expect(carePlan.patientId).toBe(patientId);
      expect(typeof carePlan.providerId).toBe("string");
      expect(carePlan.title).toBe(
        i === 0
          ? `Initial ${carePlanType} Care Plan`
          : `${carePlanType} Care Plan - Revision ${i}`,
      );
      expect(carePlan.type).toBe(carePlanType);
      expect(carePlan.notes).toBe(
        i === 0
          ? `Initial ${carePlanType} care plan notes`
          : `${carePlanType} Care Plan - Revision ${i} notes`,
      );
      expect(carePlan.carePlanModuleVersion).toBe("v2.20.0");
      expect(carePlan.authorUserId).toBe(carePlan.providerId);
    });
  });

  it("returns an array of care plans that are finalised correctly", () => {
    const carePlans = generateMockCarePlanRevisionsForPatient({
      patientId,
      carePlanType,
      revisionCount: 4,
    });

    carePlans.forEach((carePlan, i) => {
      if (i === 0) {
        expect(carePlan.rootCarePlanId).toBeNull();
        expect(carePlan.parentCarePlanId).toBeNull();
      } else {
        expect(carePlan.rootCarePlanId).not.toBeNull();
        expect(carePlan.parentCarePlanId).not.toBeNull();
      }

      if (i == carePlans.length - 1) {
        expect(carePlan.finalisedAt).toBeNull();
        expect(carePlan.finalisedByUserId).toBeNull();
      } else {
        expect(carePlan.finalisedAt).not.toBeNull();
        expect(carePlan.finalisedByUserId).not.toBeNull();
      }
    });
  });
});
