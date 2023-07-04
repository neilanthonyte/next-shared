import {
  TDataProviderConfigurationInterface,
  TDataProviderType,
} from "./IDataProviderConfiguration";

/**
 * Represents a tenant in connect. There's a Tenant
 * class, but I don't want next-connect as a dependency
 */
export interface ISerializableTenant {
  tenantId: string;
  name: string;
  dataProvider: TDataProviderType;
  dataProviderConfiguration: TDataProviderConfigurationInterface;
  timezone?: string;
  validateOnRead?: boolean;
  validateOnWrite?: boolean;
}
