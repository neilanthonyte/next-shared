import { IsString } from "class-validator";
import { IWlhPerson, WlhPerson } from "./WlhPerson";

export interface IWlhProvider extends IWlhPerson {
  providerId: string;
}

/**
 * Represents a provider from Hive Database. Aiming to replace EhrProvider in the future
 *
 * @class WlhProvider
 * @extends WlhPerson
 * @implements IWlhProvider
 *
 * @property {string} providerId - The ID of the provider
 *
 * @param {IWlhProvider} data - Data used to create a new WlhProvider instance
 *
 * @method serialize - Serializes the instance into an object of type IWlhProvider
 *
 */
export class WlhProvider extends WlhPerson {
  @IsString()
  providerId: string;

  constructor(data?: IWlhProvider) {
    super(data);
    this.providerId = data?.providerId ?? "";
  }

  /**
   * Serialize schema for model
   * @return {IWlhProvider}
   */
  public serialize(): IWlhProvider {
    return { ...super.serialize(), providerId: this.providerId };
  }
}
