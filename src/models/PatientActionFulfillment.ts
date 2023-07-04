import { IsInt, IsString, validate } from "class-validator";

import { unixTimestamp } from "next-shared/src/types/dateTypes";

import { ISerializable } from "../types/ISerializable";
import { Action } from "./Action";
import { cloneModelObject } from "../helpers/cloneModelObject";
import { ValidationError } from "../helpers/errorTypes";

export class ActionFulfillment implements ISerializable {
  public id: string;

  public action: Action;

  @IsInt()
  public dueAt: unixTimestamp;

  @IsInt()
  public completedAt: unixTimestamp;

  @IsString()
  public status: "completed" | "notCompleted";

  public comment: string;

  public isPlaceholder: boolean = false;

  public filterSensitiveData(): this {
    const clone = cloneModelObject(this);

    if (clone.action) {
      clone.action = clone.action.filterSensitiveData();
    }

    return clone;
  }

  public serialize(): any {
    return {
      id: this.id,
      action: this.action.serialize(),

      dueAt: this.dueAt,
      completedAt: this.completedAt,
      status: this.status,

      comment: this.comment,
      isPlaceholder: this.isPlaceholder,
    };
  }

  public static unseralize(data: any): ActionFulfillment {
    const newActionFulfillment = new ActionFulfillment();

    newActionFulfillment.id = data.id;

    newActionFulfillment.completedAt = data.completedAt;
    newActionFulfillment.dueAt = data.dueAt;
    newActionFulfillment.status = data.status;

    newActionFulfillment.comment = data.comment;
    newActionFulfillment.isPlaceholder = data.isPlaceholder;

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
