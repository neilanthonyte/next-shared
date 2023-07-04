import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  validate,
} from "class-validator";

import { ISerializable } from "../types/ISerializable";
import { cloneModelObject } from "../helpers/cloneModelObject";
import { unixTimestamp } from "../types/dateTypes";
import { ValidationError } from "../helpers/errorTypes";

// TODO: update id to userId to follow convention. doing so may break things.

export interface ISerializedUser {
  id: string;
  email: string;
  passwordHash?: string;
  active: boolean;
  invitationCode?: string | null;
  invitationCodeExpiry?: unixTimestamp | null;
  invitationCodeTwoFactorCode?: string | null;
  passwordResetToken?: string | null;
  passwordResetExpiry?: unixTimestamp | null;
  passwordResetTwoFactorCode?: string | null;
}

/**
 * Represents a user that can access an application.
 */
export class User implements ISerializable {
  @IsString()
  @IsOptional()
  public id: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsOptional()
  public passwordHash: string;

  @IsBoolean()
  public active: boolean;

  @IsString()
  @IsOptional()
  public invitationCode: string | null;
  @IsNumber()
  @IsPositive()
  @IsOptional()
  public invitationCodeExpiry: unixTimestamp | null;
  @IsString()
  @IsOptional()
  public invitationCodeTwoFactorCode: string | null;

  @IsString()
  @IsOptional()
  public passwordResetToken: string | null;
  @IsNumber()
  @IsPositive()
  @IsOptional()
  public passwordResetExpiry: unixTimestamp | null;
  @IsString()
  @IsOptional()
  public passwordResetTwoFactorCode: string | null;

  /**
   * Remove any sensitive data from the model.
   */
  public filterSensitiveData(): this {
    const clone = cloneModelObject(this);

    delete clone.passwordHash;
    delete clone.invitationCode;
    delete clone.invitationCodeExpiry;
    delete clone.invitationCodeTwoFactorCode;
    delete clone.passwordHash;
    delete clone.passwordResetToken;
    delete clone.passwordResetExpiry;
    delete clone.passwordResetTwoFactorCode;

    return clone;
  }

  /**
   * Convert into an object.
   */
  public serialize(): ISerializedUser {
    return {
      id: this.id,
      email: this.email,
      passwordHash: this.passwordHash,

      active: this.active,

      invitationCode: this.invitationCode,
      invitationCodeExpiry: this.invitationCodeExpiry,
      invitationCodeTwoFactorCode: this.invitationCodeTwoFactorCode,

      passwordResetToken: this.passwordResetToken,
      passwordResetExpiry: this.passwordResetExpiry,
      passwordResetTwoFactorCode: this.passwordResetTwoFactorCode,
    };
  }

  /**
   * Convert into a model.
   */
  public static unserialize(data: ISerializedUser): User {
    const newUser = new this();
    newUser.id = data.id;
    newUser.email = data.email;
    newUser.passwordHash = data.passwordHash;

    newUser.active = data.active;

    newUser.invitationCode = data.invitationCode;
    newUser.invitationCodeExpiry = data.invitationCodeExpiry;
    newUser.invitationCodeTwoFactorCode = data.invitationCodeTwoFactorCode;

    newUser.passwordResetToken = data.passwordResetToken;
    newUser.passwordResetExpiry = data.passwordResetExpiry;
    newUser.passwordResetTwoFactorCode = data.passwordResetTwoFactorCode;

    return newUser;
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
