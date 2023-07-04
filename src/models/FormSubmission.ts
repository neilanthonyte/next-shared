import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsOptional,
  validate,
  ValidateIf,
} from "class-validator";
import { ISerializable } from "../types/ISerializable";
import { cloneModelObject } from "../helpers/cloneModelObject";
import { unixTimestamp } from "next-shared/src/types/dateTypes";
import { ValidationError } from "../helpers/errorTypes";

export interface IFormSubmission {
  id?: number;
  formType: string;
  locationId?: string;
  updatedAt?: unixTimestamp;
  createdAt?: unixTimestamp;
  formResults: any;
  formSchema: any;
  metaData?: any;
}

export interface IFormSubmissionJsonQuery {
  form_schema?: any;
  meta_data?: any;
  form_results?: any;
}

export class FormSubmission implements ISerializable {
  @ValidateIf((o) => o.createdAt)
  @IsInt()
  public id?: number;

  @IsString()
  @IsNotEmpty()
  public formType: string;

  @IsString()
  public locationId?: string;

  @IsOptional()
  @IsInt()
  public updatedAt: unixTimestamp;

  @IsOptional()
  @IsInt()
  public createdAt: unixTimestamp;

  @IsNotEmpty()
  public formResults: any;

  @IsNotEmpty()
  public formSchema: any;

  @IsOptional()
  public metaData: any;

  public serialize() {
    return {
      id: this.id,
      formType: this.formType,
      locationId: this.locationId,
      updatedAt: this.updatedAt,
      createdAt: this.createdAt,
      formResults: this.formResults,
      formSchema: this.formSchema,
      metaData: this.metaData,
    };
  }

  public filterSensitiveData() {
    return cloneModelObject(this);
  }

  public static unserialize(form: IFormSubmission) {
    const newForm = new FormSubmission();

    newForm.id = form.id;
    newForm.formType = form.formType;
    newForm.locationId = form.locationId;
    newForm.updatedAt = form.updatedAt;
    newForm.createdAt = form.createdAt;
    newForm.formResults = form.formResults;
    newForm.formSchema = form.formSchema;
    newForm.metaData = form.metaData;

    return newForm;
  }

  public static async validate(form: IFormSubmission): Promise<boolean> {
    const newForm = new FormSubmission();
    newForm.id = form.id;
    newForm.formType = form.formType;
    newForm.locationId = form.locationId;
    newForm.updatedAt = form.updatedAt;
    newForm.createdAt = form.createdAt;
    newForm.formResults = form.formResults;
    newForm.formSchema = form.formSchema;
    newForm.metaData = form.metaData;

    const validated = await validate(newForm);
    if (validated.length > 0) {
      throw new ValidationError(validated);
    }

    return true;
  }
}
