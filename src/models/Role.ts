import { injectable } from "inversify";
import { IsArray, IsNotEmpty, IsString, validate } from "class-validator";

import { cloneModelObject } from "../helpers/cloneModelObject";
import { ISerializable } from "../types/ISerializable";
import { ValidationError } from "../helpers/errorTypes";

export interface ISerializedRole {
  id: string;
  name: string;
  permissions: string[];
}

/**
 * Model that defines a role and therefore what functions they can perform and access within an application.
 */
@injectable()
export class Role implements ISerializable {
  // fields
  @IsString()
  @IsNotEmpty()
  public id: string;
  @IsString()
  @IsNotEmpty()
  public name: string;
  @IsArray()
  public permissions: string[];

  /**
   * Remove any sensitive data from the model.
   */
  public filterSensitiveData(): this {
    const clone = cloneModelObject(this);
    return clone;
  }

  /**
   * Convert into an object.
   */
  public serialize(): ISerializedRole {
    return {
      id: this.id,
      name: this.name,
      permissions: this.permissions,
    };
  }

  /**
   * Convert into a model.
   */
  public static unserialize(data: ISerializedRole): Role {
    const newRole = new this();
    newRole.id = data.id;
    newRole.name = data.name;
    newRole.permissions = data.permissions;
    return newRole;
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
