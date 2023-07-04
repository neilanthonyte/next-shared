import { IsInt, IsString, validate, IsOptional } from "class-validator";

import { ISerializable } from "next-shared/src/types/ISerializable";
import { unixTimestamp } from "next-shared/src/types/dateTypes";
import { cloneModelObject } from "next-shared/src/helpers/cloneModelObject";
import { ValidationError } from "next-shared/src/helpers/errorTypes";

export enum EActionFulfillmentResolution {
  Failed = 0,
  Success = 1,
  ActionConcluded = 2,
  ActionUpdated = 3,
  ActionMissed = 4,
}

export interface IActionFulfillment {
  fulfillmentId: string;
  actionId: string;
  dueAt: unixTimestamp;
  resolvedAt?: unixTimestamp;
  resolution?: EActionFulfillmentResolution;
  comment: string;
  fulfilledById: string;
}

export class ActionFulfillment implements ISerializable {
  @IsString()
  public fulfillmentId: string;

  @IsString()
  public actionId: string;

  @IsInt()
  public dueAt: unixTimestamp;

  @IsOptional()
  @IsInt()
  public resolvedAt?: unixTimestamp;

  @IsOptional()
  public resolution?: EActionFulfillmentResolution;

  @IsOptional()
  @IsString()
  public comment: string;

  @IsOptional()
  @IsString()
  public fulfilledById: string;

  public get id() {
    return this.fulfillmentId;
  }

  public filterSensitiveData(): this {
    const clone = cloneModelObject(this);
    return clone;
  }

  /**
   * Provides a suggested ID for the fulfillment.
   */
  public uniqueId = () => {
    return `${this.actionId}-${this.dueAt}`;
  };

  public serialize(): IActionFulfillment {
    return {
      fulfillmentId: this.fulfillmentId,
      actionId: this.actionId,

      dueAt: this.dueAt,
      resolvedAt: this.resolvedAt,
      resolution: this.resolution,

      fulfilledById: this.fulfilledById,

      comment: this.comment,
    };
  }

  public static unserialize(
    data: Partial<IActionFulfillment>,
  ): ActionFulfillment {
    const newActionFulfillment = new ActionFulfillment();

    newActionFulfillment.fulfillmentId = data?.fulfillmentId;
    newActionFulfillment.actionId = data.actionId;

    newActionFulfillment.resolvedAt = data?.resolvedAt;
    newActionFulfillment.dueAt = data.dueAt;
    newActionFulfillment.resolution = data?.resolution;

    newActionFulfillment.fulfilledById = data.fulfilledById;

    newActionFulfillment.comment = data.comment;

    return newActionFulfillment;
  }

  public async validate(): Promise<boolean> {
    const validated = await validate(this);
    if (validated.length > 0) {
      throw new ValidationError(validated);
    }

    return true;
  }
}
