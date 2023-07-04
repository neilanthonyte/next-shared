import { IsString, IsOptional, validate } from "class-validator";
import { ValidationError } from "../helpers/errorTypes";
import { cloneModelObject } from "../helpers/cloneModelObject";
import { ISerializable } from "../types/ISerializable";

export interface IMedicationDetails {
  title: string;
  route?: string;
  direction?: string;
  dosage?: string;
}

export class MedicationDetails implements IMedicationDetails, ISerializable {
  @IsString()
  public title: string;

  @IsString()
  @IsOptional()
  public route: string;

  @IsString()
  @IsOptional()
  public direction: string;

  @IsString()
  @IsOptional()
  public dosage: string;

  public serialize(): IMedicationDetails {
    return {
      title: this.title,
      route: this.route,
      direction: this.direction,
      dosage: this.dosage,
    };
  }

  public static unserialize(data: IMedicationDetails) {
    const model = new this();
    model.title = data.title;
    model.route = data.route;
    model.direction = data.direction;
    model.dosage = data.dosage;
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
