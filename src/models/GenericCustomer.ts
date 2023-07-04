import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  validate,
} from "class-validator";

import { unixTimestamp } from "next-shared/src/types/dateTypes";

import { cloneModelObject } from "../helpers/cloneModelObject";
import { ISerializedUser, User } from "./SpgUser";
import { ValidationError } from "../helpers/errorTypes";

export interface ISerializedGenericCustomer extends ISerializedUser {
  id: string;
  prontoId: string;
  created: unixTimestamp;
  firstName: string;
  lastName: string;
  mobile: string;
  defaultStore: string;
  stripeId: string;
}

/**
 * Model that represents a person that can place orders from a store.
 */
export class GenericCustomer extends User {
  @IsString()
  @IsNotEmpty()
  public id: string;
  @IsString()
  @IsNotEmpty()
  public prontoId: string;
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  public created: unixTimestamp;

  @IsString()
  @IsNotEmpty()
  public firstName: string;
  @IsString()
  @IsNotEmpty()
  public lastName: string;

  @IsString()
  @IsOptional()
  public mobile: string;

  @IsString()
  @IsOptional()
  public defaultStore: string;

  @IsString()
  @IsOptional()
  public stripeId: string;

  /**
   * Get customer's display name.
   */
  public getDisplayName(): string | null {
    return this.firstName + " " + this.lastName;
  }

  /**
   * Remove any sensitive data from the model.
   */
  public filterSensitiveData() {
    const clone = cloneModelObject(this);

    delete clone.passwordHash;
    delete clone.passwordResetToken;
    delete clone.passwordResetExpiry;

    delete clone.prontoId;
    delete clone.stripeId;

    return clone;
  }

  /**
   * Convert model into an object.
   */
  public serialize() {
    return {
      ...super.serialize(),
      id: this.id,
      prontoId: this.prontoId,
      created: this.created,

      firstName: this.firstName,
      lastName: this.lastName,

      mobile: this.mobile,

      defaultStore: this.defaultStore,

      stripeId: this.stripeId,
    };
  }

  /**
   * Convert object into a model.
   */
  public static unserialize(data: ISerializedGenericCustomer): GenericCustomer {
    const newCustomer = super.unserialize(data) as any as GenericCustomer;

    newCustomer.id = data.id;
    newCustomer.prontoId = data.prontoId;
    newCustomer.created = data.created;

    newCustomer.firstName = data.firstName;
    newCustomer.lastName = data.lastName;

    newCustomer.mobile = data.mobile;

    newCustomer.defaultStore = data.defaultStore;

    newCustomer.stripeId = data.stripeId;

    return newCustomer;
  }

  /**
   * Validate model fields.
   */
  public async validate(): Promise<boolean> {
    const validated = await validate(this);
    if (validated.length > 0) {
      throw new ValidationError(validated);
    }

    return true;
  }
}
