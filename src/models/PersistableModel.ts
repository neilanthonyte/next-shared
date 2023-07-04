import { IsOptional } from "class-validator";
import { ISerializable } from "../types/ISerializable";
import { unixTimestamp } from "../types/dateTypes";
import { ValidatableModel } from "./ValidatableModel";

/**
 * Default items to construct models.
 * This is slightly different from `IAbstractItem` in that it
 * does not require `ehrLocationId`
 */
export interface ISerializedPersistableModel {
  createdAt?: unixTimestamp;
  updatedAt?: unixTimestamp;
}

/**
 * Base class for data models. These are usually DTOs and therefore should support `createdAt` and `updatedAt`.
 * Note that the DB column maybe in underscore form, in which case you should return the fields as camelCase
 * to match convention
 *
 * If your model doesn't need to be persisted, or is returned from the DB, you can simply use
 * {@link ValidatableModel}
 */
export class PersistableModel
  extends ValidatableModel
  implements ISerializable
{
  @IsOptional()
  public createdAt?: unixTimestamp;

  @IsOptional()
  public updatedAt?: unixTimestamp;

  constructor(data: ISerializedPersistableModel) {
    super();
    this.createdAt = data?.createdAt;
    this.updatedAt = data?.updatedAt;
  }

  public serialize(): ISerializedPersistableModel {
    return {
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  public static unserialize(data?: ISerializedPersistableModel) {
    if (!data) {
      return null;
    }
    return new PersistableModel(data);
  }
}
