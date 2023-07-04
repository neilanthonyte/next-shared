import {
  IsBoolean,
  IsInt,
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsObject,
  Min,
  Max,
  validate,
} from "class-validator";

import { ISerializable } from "../types/ISerializable";
import { cloneModelObject } from "../helpers/cloneModelObject";
import { ValidationError } from "../helpers/errorTypes";

export type TEnvironment = "local" | "development" | "demo" | "production";

export type TErrorApproach = "throw" | "reject";

export type TMockPatient = "new" | "existing";

export interface IAppConfig {
  servicesUrl?: string;
  /** Mapping from socket name to URL: '{"main":"https://services-dev.nextpracticeclinics.com/:8080","actions":"https://next-actions-dev.nextpracticeclinics.com/:8080"}' */
  socketUrls?: string;

  helpEmail?: string;
  persistSessionOnLoad?: boolean;
  environment?: TEnvironment;
  webViewsUri?: string;
  atlassianServiceDeskKey?: string;

  // behaviours
  appointmentBookingReturnImmediately?: boolean;

  // to help with testing
  useRealClient?: boolean;
  debugChaosProbability?: number;
  debugRequestErrorCount?: number;
  debugClientMethodsError?: string[];
  debugErrorApproach?: TErrorApproach;
  debugMockPatient?: TMockPatient;
  debugFillEmail?: string;
  debugFillPhone?: string;
  debugSessionId?: string;
}

/**
 * Model used for setting and validating app configs
 */
export class AppConfig implements ISerializable {
  @IsOptional()
  @IsBoolean()
  public useRealClient: boolean = true;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public environment: TEnvironment;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public servicesUrl: string;

  @IsOptional()
  @IsObject()
  @IsNotEmpty()
  public socketUrls: { [name: string]: string };

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public webViewsUri: string;

  @IsOptional()
  @IsString()
  public atlassianServiceDeskKey: string;

  @IsOptional()
  @IsString()
  public helpEmail: string;

  @IsOptional()
  @IsBoolean()
  public persistSessionOnLoad: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  public debugChaosProbability: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  public debugRequestErrorCount: number;

  @IsOptional()
  public debugClientMethodsError: string[];

  @IsOptional()
  @IsString()
  public debugErrorApproach: TErrorApproach;

  @IsOptional()
  @IsString()
  public debugMockPatient: TMockPatient;

  @IsOptional()
  @IsString()
  public debugFillEmail: string;

  @IsOptional()
  @IsString()
  public debugFillPhone: string;

  @IsOptional()
  @IsString()
  public debugSessionId: string;

  @IsBoolean()
  @IsOptional()
  public appointmentBookingReturnImmediately: boolean;

  /**
   * Indicates if the queries are being debugged.
   */
  public debuggingQueries() {
    return !!(
      this.debugChaosProbability ||
      this.debugRequestErrorCount ||
      this.debugClientMethodsError
    );
  }

  public serialize = (): IAppConfig => {
    return {
      useRealClient: this.useRealClient,
      environment: this.environment,
      servicesUrl: this.servicesUrl,
      socketUrls: JSON.stringify(this.socketUrls),
      webViewsUri: this.webViewsUri,
      atlassianServiceDeskKey: this.atlassianServiceDeskKey,
      helpEmail: this.helpEmail,
      persistSessionOnLoad: this.persistSessionOnLoad,

      // behaviour
      appointmentBookingReturnImmediately:
        this.appointmentBookingReturnImmediately,

      // debug
      debugChaosProbability: this.debugChaosProbability,
      debugRequestErrorCount: this.debugRequestErrorCount,
      debugClientMethodsError: this.debugClientMethodsError,
      debugErrorApproach: this.debugErrorApproach,
      debugMockPatient: this.debugMockPatient,
      debugFillEmail: this.debugFillEmail,
      debugFillPhone: this.debugFillPhone,
      debugSessionId: this.debugSessionId,
    };
  };

  public static unserialize(data: IAppConfig): AppConfig {
    const config = new this();
    config.useRealClient =
      typeof data.useRealClient !== "undefined" ? data.useRealClient : true;
    config.environment = data.environment;
    config.servicesUrl = data.servicesUrl;
    try {
      config.socketUrls = JSON.parse(data.socketUrls);
    } catch {
      throw new Error(
        "socketUrls is not in a valid JSON format - see .env.example for an example",
      );
    }
    config.webViewsUri = data.webViewsUri;
    config.atlassianServiceDeskKey = data.atlassianServiceDeskKey;
    config.helpEmail = data.helpEmail || "support@nextpracticehealth.com";
    config.persistSessionOnLoad =
      typeof data.persistSessionOnLoad !== "undefined"
        ? data.persistSessionOnLoad
        : true;

    // behaviour
    config.appointmentBookingReturnImmediately =
      data.appointmentBookingReturnImmediately;

    // debug
    config.debugChaosProbability = data.debugChaosProbability;
    config.debugRequestErrorCount = data.debugRequestErrorCount;
    config.debugClientMethodsError = data.debugClientMethodsError;
    config.debugErrorApproach = data.debugErrorApproach;
    config.debugMockPatient = data.debugMockPatient;
    config.debugFillEmail = data.debugFillEmail;

    // ensure a system compliant number is provided
    if (typeof data.debugFillPhone === "string") {
      if (data.debugFillPhone.match(/^\+61/)) {
        config.debugFillPhone = data.debugFillPhone;
      } else {
        console.warn("please ensure numbers start with +61");
      }
    }
    config.debugSessionId = data.debugSessionId;

    return config;
  }

  public filterSensitiveData() {
    const clone = cloneModelObject(this);
    return clone;
  }

  public async validate(): Promise<boolean> {
    const validated = await validate(this);
    if (validated.length > 0) {
      throw new ValidationError(validated);
    }
    return true;
  }
}
