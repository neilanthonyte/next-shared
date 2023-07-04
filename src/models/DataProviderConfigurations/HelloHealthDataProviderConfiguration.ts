import { IsString, IsUrl } from "class-validator";
import { ISerializable } from "../../types/ISerializable";
import { cloneModelObject } from "../../helpers/cloneModelObject";

export interface IHelloHealthDataProviderConfiguration {
  /** HH Rest API URL  */
  apiUrl: string;
  hhFhirServerUrl: string;
  apiKey: string;
  username: string;
  password: string;
  /**
   * Hello Health Clinic Location ID
   * TODO - consider renaming this to `clinicLocationId` for consistency
   */
  helloHealthClinicId: string;
}

export class HelloHealthDataProviderConfiguration
  implements IHelloHealthDataProviderConfiguration, ISerializable
{
  @IsUrl()
  public apiUrl: string;

  @IsUrl()
  public hhFhirServerUrl: string;

  @IsString()
  public apiKey: string;

  @IsString()
  public username: string;

  @IsString()
  public password: string;

  @IsString()
  public helloHealthClinicId: string;

  /**
   * This is to support JSON stringify for this class
   */
  public toJSON() {
    return {
      apiUrl: this.apiUrl,
      hhFhirServerUrl: this.hhFhirServerUrl,
      apiKey: this.apiKey,
      username: this.username,
      password: this.password,
      helloHealthClinicId: this.helloHealthClinicId,
    };
  }

  public serialize(): IHelloHealthDataProviderConfiguration {
    return this.toJSON();
  }

  public filterSensitiveData(): this {
    const cloneSelf = cloneModelObject(this);
    cloneSelf.apiKey = null;
    cloneSelf.password = null;
    cloneSelf.username = null;
    return cloneSelf;
  }

  public static unserialize(data: IHelloHealthDataProviderConfiguration) {
    const model = new HelloHealthDataProviderConfiguration();
    model.apiUrl = data.apiUrl;
    model.hhFhirServerUrl = data.hhFhirServerUrl;
    model.apiKey = data.apiKey;
    model.username = data.username;
    model.password = data.password;
    model.helloHealthClinicId = data.helloHealthClinicId;
    return model;
  }
}
