import { IsString, IsUrl, IsOptional, IsNumber } from "class-validator";
import { ISerializable } from "../../types/ISerializable";
import { cloneModelObject } from "../../helpers/cloneModelObject";

/**
 * Configuration for the Helix tenant
 */
export interface IHelixDataProviderConfiguration {
  /**
   * Helix API URL to make Helix requests. Should be the same as the Helix Instance's URL
   */
  helixUrl: string;
  /**
   * OAuth server URL to get access token for Helix requests
   */
  helixAuthUrl: string;
  /**
   * OAuth client ID and Hub App-ID to be used to make Helix and Hub requests
   */
  helixClientId: string;
  /**
   * OAuth client secret and Hub App-Key used to make Helix and Hub requests
   */
  helixClientSecret: string;
  /**
   * Tenant ID used by HUB to identify the helix tenant. i.e. next-demo.helix.medicaldirector.com
   */
  helixTenantId: string;
  /**
   * Hub API URL.
   */
  mdHubBaseUrl: string;
  /**
   * This is the UUID that MedicalDirector uses to identify Next Practice. Should be the same one across all services
   */
  mdHubHelixAppId: string;

  /**
   * Tenant ID that describe the HUB tenant. (Please note that this is different from Helix Tenant). This is rarely used.
   * (i.e. nextpractice.com, nextpractice-dev.com)
   */
  nextHubTenantId: string;
  /**
   * Subscription key is used by Hub to identify the "tenant" during authentication.
   * For example, in the dev Hub, NP has the same credentials for both Demo and Staging, but with a difference subscription key
   */
  mdHubSubscriptionKey: string;
  /**
   * Identifies the Helix Centre. While this config is here, this is not something that we use. Every clinic will only have one centre.
   */
  helixCentreId: number;
  /**
   * Identifies the work area within a Helix Centre within a clinic. This is not used in NP.
   */
  helixWorkAreaId?: number;
}

export class HelixDataProviderConfiguration
  implements IHelixDataProviderConfiguration, ISerializable
{
  @IsUrl()
  public helixUrl: string;

  @IsUrl()
  public helixAuthUrl: string;

  @IsString()
  public helixClientId: string;

  @IsString()
  public helixClientSecret: string;

  @IsString()
  public mdHubSubscriptionKey: string;

  @IsString()
  public helixTenantId: string;

  @IsUrl()
  public mdHubBaseUrl: string;

  @IsString()
  public nextHubTenantId: string;

  @IsNumber()
  public helixCentreId: number;

  @IsOptional()
  @IsString()
  public mdHubHelixAppId: string;

  @IsOptional()
  @IsNumber()
  public helixWorkAreaId?: number;

  /**
   * This is to support JSON stringify for this class
   */
  public toJSON() {
    return {
      helixUrl: this.helixUrl,
      helixAuthUrl: this.helixAuthUrl,
      helixClientId: this.helixClientId,
      helixClientSecret: this.helixClientSecret,
      helixTenantId: this.helixTenantId,
      mdHubBaseUrl: this.mdHubBaseUrl,
      mdHubHelixAppId: this.mdHubHelixAppId,
      nextHubTenantId: this.nextHubTenantId,
      mdHubSubscriptionKey: this.mdHubSubscriptionKey,
      helixCentreId: this.helixCentreId,
      helixWorkAreaId: this.helixWorkAreaId,
    };
  }

  public serialize(): IHelixDataProviderConfiguration {
    return this.toJSON();
  }

  public filterSensitiveData(): this {
    const cloneSelf = cloneModelObject(this);
    cloneSelf.helixClientId = null;
    cloneSelf.helixClientSecret = null;
    cloneSelf.mdHubSubscriptionKey = null;
    return cloneSelf;
  }

  public static unserialize(data: IHelixDataProviderConfiguration) {
    const model = new HelixDataProviderConfiguration();
    model.helixUrl = data.helixUrl;
    model.helixAuthUrl = data.helixAuthUrl;
    model.helixClientId = data.helixClientId;
    model.helixClientSecret = data.helixClientSecret;
    model.helixTenantId = data.helixTenantId;
    model.mdHubBaseUrl = data.mdHubBaseUrl;
    model.mdHubHelixAppId = data.mdHubHelixAppId;
    model.nextHubTenantId = data.nextHubTenantId;
    model.mdHubSubscriptionKey = data.mdHubSubscriptionKey;
    model.helixCentreId = data.helixCentreId;
    model.helixWorkAreaId = data.helixWorkAreaId;
    return model;
  }
}
