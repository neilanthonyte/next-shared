import { v4 as uuidv4 } from "uuid";
import { currentUnixTimestamp } from "../helpers/currentUnixTimestamp";
import { ECarePlanTypes, ICarePlan } from "../models/CarePlan";

export interface IGenerateMockCarePlansForPatientOptions {
  patientId: string;
  carePlanType: ECarePlanTypes;
  revisionCount?: number;
  omitDraft?: boolean;
}

/**
 * Create mock care plan revisions for a patient of a specific CarePlan type.
 * In the returned care plans
 * * All care plans except for the last in the array would be "finalised" and will have the `finalisedAt` timestamp set 3 months apart (counting backwards from today. I.e. If revisionCount is 3, then second last care plan is 3 months before today, first care plan is 6 months before today.).
 * * First care plan in the array will have the `rootCarePlanId` set to null. Subsequent care plans in the array will have `rootCarePlanId` set to the first care plan's `carePlanId`.
 * * First care plan in the array will have the `parentCarePlanId` set to null. Subsequent care plans will have `parentCarePlanId` set to the one before.
 *
 */
export const generateMockCarePlanRevisionsForPatient = ({
  patientId,
  carePlanType,
  revisionCount = 3,
  omitDraft = false,
}: IGenerateMockCarePlansForPatientOptions): ICarePlan[] => {
  const secondsInAMonth = 30 * 24 * 60 * 60;
  const today = currentUnixTimestamp();

  const providerId = uuidv4();
  const clinicLocationId = uuidv4();

  const carePlans: ICarePlan[] = Array.from({ length: revisionCount }, () => ({
    carePlanId: uuidv4(),
  })).map((privimitiveCarePlan, i, carePlanList) => {
    // null for the last one in the array if including draft.
    const finalisedAt =
      i === revisionCount - 1 && !omitDraft
        ? null
        : today - (revisionCount - i - 1) * secondsInAMonth;

    const carePlan: ICarePlan = {
      carePlanId: privimitiveCarePlan.carePlanId,
      patientId,
      providerId,
      clinicLocationId,
      title:
        i === 0
          ? `Initial ${carePlanType} Care Plan`
          : `${carePlanType} Care Plan - Revision ${i}`,
      type: carePlanType,
      finalisedAt,
      createdAt: today - (revisionCount - i - 1) * secondsInAMonth,
      parentCarePlanId: i === 0 ? null : carePlanList[i - 1].carePlanId,
      rootCarePlanId: i === 0 ? null : carePlanList[0].carePlanId,
      notes:
        i === 0
          ? `Initial ${carePlanType} care plan notes`
          : `${carePlanType} Care Plan - Revision ${i} notes`,
      carePlanModuleVersion: "v2.20.0",
      authorUserId: providerId,
      finalisedByUserId: finalisedAt ? providerId : null,
    };

    return carePlan;
  });

  return carePlans;
};
