import { IsString, validate } from "class-validator";

import { ValidationError } from "../helpers/errorTypes";
import { cloneModelObject } from "../helpers/cloneModelObject";
import { ISerializable } from "../types/ISerializable";

export interface IDocumentDetails {
  documentId: string;
  title: string;
  category: string;
}

export class DocumentDetails implements IDocumentDetails, ISerializable {
  @IsString()
  public documentId: string;

  @IsString()
  public title: string;

  @IsString()
  public category: string;

  public serialize(): IDocumentDetails {
    return {
      documentId: this.documentId,
      title: this.title,
      category: this.category,
    };
  }

  public static unserialize(data: IDocumentDetails) {
    const model = new this();
    model.documentId = data.documentId;
    model.title = data.title;
    model.category = data.category;
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
