import { IsString, IsNotEmpty } from "class-validator";
import {
  IBaseCarePlanSnapshot,
  BaseCarePlanSnapshot,
} from "./BaseCarePlanSnapshot";

export interface ICarePlanSnapshotData extends IBaseCarePlanSnapshot {
  carePlanObservationId: string;
  data: string;
}

/**
 * This class represents a snapshot of a care plan observation.
 * An observation is a record of data related to an individual's health, such as blood pressure or weight.
 *
 * @class CarePlanSnapshotData
 * @extends BaseCarePlanSnapshot
 *
 * @property {string} carePlanObservationId - The ID of the observation snapshot
 * @property {string} data - Data associated with the observation snapshot
 * @param {ICarePlanSnapshotData} data - Data used to create a new CarePlanSnapshotData instance
 *
 * @method serialize() - Serializes the instance into an object of type ICarePlanSnapshotData
 *
 * @example
 * const observation = new CarePlanSnapshotData({
 *   carePlanObservationId: '8cecf383-e1f9-49d1-b801-6fe66df15ba1',
 *   data: 'Data about the observation snapshot'
 * });
 */
// TODO: NW-623 Update model to include Snapshot Data including (observation) Ids
export class CarePlanSnapshotData extends BaseCarePlanSnapshot {
  @IsNotEmpty()
  @IsString()
  carePlanObservationId: string;

  @IsNotEmpty()
  @IsString()
  data: string;

  constructor(data: ICarePlanSnapshotData) {
    super(data);
    this.carePlanObservationId = data.carePlanObservationId;
    this.data = data.data;
  }

  public serialize(): ICarePlanSnapshotData {
    return {
      ...super.serialize(),
      carePlanObservationId: this.carePlanObservationId,
      data: this.data,
    };
  }
}
