import { IsString } from "class-validator";
import {
  BaseCarePlanSnapshot,
  IBaseCarePlanSnapshot,
} from "./BaseCarePlanSnapshot";

export interface ICarePlanMedicationSnapshot extends IBaseCarePlanSnapshot {
  carePlanMedicationId: string;
  data: string;
}

/**
 * This class represents a snapshot of a medication in a care plan.
 * A medication is a substance used to treat or prevent disease or alleviate symptoms.
 * Note: A care plan can contain multiple medications
 *
 * @class CarePlanMedicationSnapshot
 * @extends BaseCarePlanSnapshot
 *
 * @property {string} carePlanMedicationId - The ID of the medication snapshot
 * @property {string} data - Data associated with the medication snapshot
 *
 * @param {ICarePlanMedicationSnapshot} data - Data used to create a new CarePlanMedicationSnapshot instance
 *
 * @method serialize() - Serializes the instance into an object of type ICarePlanMedicationSnapshot
 *
 * @example
 * const medication = new CarePlanMedicationSnapshot({
 *   carePlanMedicationId: '8cecf383-e1f9-49d1-b801-6fe66df15ba1',
 *   data: 'Stringified medication object'
 * });
 */
export class CarePlanMedicationSnapshot extends BaseCarePlanSnapshot {
  @IsString()
  carePlanMedicationId: string;

  @IsString()
  data: string;

  constructor(data: ICarePlanMedicationSnapshot) {
    super(data);
    this.carePlanMedicationId = data.carePlanMedicationId;
    this.data = data.data;
  }

  public serialize(): ICarePlanMedicationSnapshot {
    return {
      ...super.serialize(),
      carePlanMedicationId: this.carePlanMedicationId,
      data: this.data,
    };
  }
}
