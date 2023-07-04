import { IsString, IsUrl } from "class-validator";
import { ISerializable } from "../../types/ISerializable";
import { cloneModelObject } from "../../helpers/cloneModelObject";

/**
 * Configuration for IRIS tenant
 */
export interface IIrisDataProviderConfiguration {
  irisFhirServerUrl: string;
  irisTarget: string;
  username: string;
  password: string;
}

export class IrisDataProviderConfiguration
  implements IIrisDataProviderConfiguration, ISerializable
{
  @IsUrl()
  public irisFhirServerUrl: string;

  @IsString()
  public irisTarget: string;

  @IsString()
  public username: string;

  @IsString()
  public password: string;

  /**
   * This is to support JSON stringify for this class
   */
  public toJSON() {
    return {
      irisFhirServerUrl: this.irisFhirServerUrl,
      irisTarget: this.irisTarget,
      username: this.username,
      password: this.password,
    };
  }

  public serialize(): IIrisDataProviderConfiguration {
    return this.toJSON();
  }

  public filterSensitiveData(): this {
    const cloneSelf = cloneModelObject(this);
    cloneSelf.password = null;
    cloneSelf.username = null;
    return cloneSelf;
  }

  public static unserialize(data: IIrisDataProviderConfiguration) {
    const model = new IrisDataProviderConfiguration();
    model.irisFhirServerUrl = data.irisFhirServerUrl;
    model.irisTarget = data.irisTarget;
    model.username = data.username;
    model.password = data.password;
    return model;
  }
}
