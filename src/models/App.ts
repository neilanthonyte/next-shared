import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDate,
  validate,
} from "class-validator";

import { ISerializedScope, Scope } from "./Scope";
import { unixTimestamp } from "next-shared/src/types/dateTypes";
import { ValidationError } from "../helpers/errorTypes";
import { cloneModelObject } from "../helpers/cloneModelObject";
import { ISerializable } from "../types/ISerializable";
import { InvalidModelError } from "../errors/InvalidModelError";

export type TAppType =
  | "companion"
  | "dashboard"
  | "bluetooth-receiver"
  | "ehr-extension";

export interface IApp {
  appId: string;
  label: string;
  accessCode?: null | string;
  accessCodeExpiry?: null | unixTimestamp;
  type: TAppType;
  scopeId: string;
  scope?: ISerializedScope;
}

export class App implements ISerializable {
  @IsString()
  public appId: string;

  @IsString()
  public label: string;

  @IsOptional()
  @IsString()
  public accessCode: null | string;

  @IsOptional()
  @IsDate()
  public accessCodeExpiry: null | unixTimestamp;

  @IsString()
  public type: TAppType;

  @IsString()
  public scopeId: string;

  @IsNotEmpty()
  public scope?: Scope;

  public filterSensitiveData() {
    const clone = cloneModelObject(this);

    if (clone.scope) {
      clone.scope = clone.scope.filterSensitiveData();
    }

    return clone;
  }

  public serialize(): IApp {
    return {
      appId: this.appId,
      label: this.label,
      accessCode: this.accessCode,
      accessCodeExpiry: this.accessCodeExpiry,
      type: this.type,
      scopeId: this.scopeId,
      scope: this.scope ? this.scope.serialize() : undefined,
    };
  }

  public static unserialize(data: IApp) {
    // validate the data object
    if (!data.label) {
      throw new InvalidModelError("app.label is required");
    }

    if (!data.scopeId) {
      throw new InvalidModelError("app.scopeId is required");
    }

    if (
      ["companion", "dashboard", "bluetooth-receiver", "ehr-extension"].indexOf(
        data.type,
      ) === -1
    ) {
      throw new InvalidModelError(
        "app.type must be companion, dashboard, ehr-extension or bluetooth-receiver",
      );
    }

    const newApp = new App();
    newApp.appId = data.appId;
    newApp.label = data.label;
    newApp.accessCode = data.accessCode;
    newApp.type = data.type;
    newApp.scopeId = data.scopeId;
    newApp.scope = data.scope ? Scope.unserialize(data.scope) : undefined;

    return newApp;
  }

  public async validate(): Promise<boolean> {
    const validated = await validate(this);
    if (validated.length > 0) {
      throw new ValidationError(validated);
    }
    return true;
  }
}
