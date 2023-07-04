import { ISerializable } from "../types/ISerializable";
import { cloneModelObject } from "../helpers/cloneModelObject";

export interface IUser {
  email: string;
  passwordHash: string;
  passwordResetToken: string | null;
  passwordResetTokenExpiry: number | null;
  twoFactorCode: string | null;
  twoFactorCodeExpiry: number | null;
}

export class User implements ISerializable {
  public email: string;
  public passwordHash: string;

  public passwordResetToken: string | null;
  public passwordResetTokenExpiry: number | null;
  public twoFactorCode: string | null;
  public twoFactorCodeExpiry: number | null;

  public filterSensitiveData(): this {
    const clone = cloneModelObject(this);

    delete clone.passwordHash;
    delete clone.passwordResetToken;
    delete clone.passwordResetTokenExpiry;
    delete clone.twoFactorCode;
    delete clone.twoFactorCodeExpiry;

    return clone;
  }

  public serialize() {
    return {
      email: this.email,
      passwordHash: this.passwordHash,

      passwordResetToken: this.passwordResetToken,
      passwordResetTokenExpiry: this.passwordResetTokenExpiry,
      twoFactorCode: this.twoFactorCode,
      twoFactorCodeExpiry: this.twoFactorCodeExpiry,
    };
  }

  public static unserialize(data: IUser): User {
    const newUser = new this();
    newUser.email = data.email;
    newUser.passwordHash = data.passwordHash;

    newUser.passwordResetToken = data.passwordResetToken;
    newUser.passwordResetTokenExpiry = data.passwordResetTokenExpiry;
    newUser.twoFactorCode = data.twoFactorCode;
    newUser.twoFactorCodeExpiry = data.twoFactorCodeExpiry;

    return newUser;
  }
}
