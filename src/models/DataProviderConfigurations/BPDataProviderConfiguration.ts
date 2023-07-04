import { IsString, IsUrl } from "class-validator";
import { ISerializable } from "../../types/ISerializable";
import { cloneModelObject } from "../../helpers/cloneModelObject";

export interface IBPDataProviderConfiguration {
  connectionMode: string;
  sqlConnectionString?: string;
  bpLocationId: number;
  agentLocationId: string;
}

export class BPDataProviderConfiguration
  implements IBPDataProviderConfiguration, ISerializable
{
  @IsUrl()
  public connectionMode: string;

  @IsString()
  public sqlConnectionString: string;

  @IsString()
  public bpLocationId: number;

  @IsString()
  public agentLocationId: string;

  /**
   * This is to support JSON stringify for this class
   */
  public toJSON() {
    return {
      connectionMode: this.connectionMode,
      sqlConnectionString: this.sqlConnectionString,
      bpLocationId: this.bpLocationId,
      agentLocationId: this.agentLocationId,
    };
  }

  public serialize(): IBPDataProviderConfiguration {
    return this.toJSON();
  }

  public filterSensitiveData(): this {
    const cloneSelf = cloneModelObject(this);
    cloneSelf.sqlConnectionString = null;
    return cloneSelf;
  }

  public static unserialize(data: IBPDataProviderConfiguration) {
    const model = new BPDataProviderConfiguration();
    model.connectionMode = data.connectionMode;
    model.sqlConnectionString = data.sqlConnectionString;
    model.bpLocationId = data.bpLocationId;
    model.agentLocationId = data.agentLocationId;
    return model;
  }
}
