import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  validate,
} from "class-validator";

import { cloneModelObject } from "../helpers/cloneModelObject";
import { defaultCharset } from "../helpers/constants";
import { ISerializable } from "../types/ISerializable";
import { ValidationError } from "../helpers/errorTypes";

export interface IGenericApp {
  id: string;
  label: string;
  accessCode: null | string;
}

/**
 * Model that defines information about an application that belongs to a system.
 * An application that requires an access code to log in.
 */

export class GenericApp implements ISerializable {
  @IsString()
  @IsNotEmpty()
  public id: string;
  @IsString()
  @IsNotEmpty()
  public label: string;
  @MinLength(8)
  @MaxLength(8)
  @IsOptional()
  public accessCode: null | string;

  /**
   * Assign a new randomly generated access code to this application.
   */
  public regenerateAccessCode() {
    const codeLength = 8;
    // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
    let code = "";
    const possible = defaultCharset;

    // randomly add characters from alphanumeric range
    for (let i = 0; i < codeLength; i++) {
      code += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    this.accessCode = code;
  }

  /**
   * Remove any sensitive data from the model.
   */
  public filterSensitiveData() {
    const clone = cloneModelObject(this);
    return clone;
  }

  /**
   * Convert into an object.
   */
  public serialize() {
    return {
      id: this.id,
      label: this.label,
      accessCode: this.accessCode,
    };
  }

  /**
   * Convert into a model.
   */
  public static unserialize(data: IGenericApp) {
    const newApp = new GenericApp();
    newApp.id = data.id;
    newApp.label = data.label;
    newApp.accessCode = data.accessCode;

    return newApp;
  }

  /**
   * Validate model fields.
   */
  public static async validate(data: IGenericApp): Promise<boolean> {
    const newApp = new GenericApp();
    newApp.id = data.id;
    newApp.label = data.label;
    newApp.accessCode = data.accessCode;

    const validated = await validate(newApp);
    if (validated.length > 0) {
      throw new ValidationError(validated);
    }

    return true;
  }
}
