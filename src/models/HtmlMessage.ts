import { IsString, validate } from "class-validator";
import { ValidationError } from "next-shared/src/helpers/errorTypes";
import { cloneModelObject } from "../helpers/cloneModelObject";
import { ISerializable } from "../types/ISerializable";

export interface IHtmlMessage {
  message: string;
}

export class HtmlMessage implements IHtmlMessage, ISerializable {
  @IsString()
  public message: string;

  public serialize(): IHtmlMessage {
    return {
      message: this.message,
    };
  }

  public static unserialize(data: IHtmlMessage) {
    const model = new this();
    model.message = data.message;
    return model;
  }

  public async validate() {
    const errors = await validate(this);
    if (errors.length > 0) {
      throw new ValidationError(errors);
    }
    return true;
  }

  public filterSensitiveData(): this {
    return cloneModelObject(this);
  }
}
