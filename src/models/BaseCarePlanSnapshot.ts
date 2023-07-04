import { IsNumber, IsString } from "class-validator";
import { unixTimestamp } from "../types/dateTypes";
import {
  PersistableModel,
  ISerializedPersistableModel,
} from "./PersistableModel";

export interface IBaseCarePlanSnapshot extends ISerializedPersistableModel {
  collectedAt: unixTimestamp;
  carePlanId: string;
}

/**
 * Base care plan snapshot that each snapshot model should implement.
 * Contains the shared props for these snapshot models
 * @class
 */
export class BaseCarePlanSnapshot extends PersistableModel {
  @IsNumber()
  collectedAt: unixTimestamp;

  @IsString()
  carePlanId: string;

  constructor(data: IBaseCarePlanSnapshot) {
    super(data);
    this.collectedAt = data.collectedAt;
    this.carePlanId = data.carePlanId;
  }

  public serialize(): IBaseCarePlanSnapshot {
    const data = super.serialize();
    return {
      ...data,
      collectedAt: this.collectedAt,
      carePlanId: this.carePlanId,
    };
  }
}
