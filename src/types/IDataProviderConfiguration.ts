import {
  BPDataProviderConfiguration,
  IBPDataProviderConfiguration,
} from "../models/DataProviderConfigurations/BPDataProviderConfiguration";
import {
  HelixDataProviderConfiguration,
  IHelixDataProviderConfiguration,
} from "../models/DataProviderConfigurations/HelixDataProviderConfiguration";
import {
  HelloHealthDataProviderConfiguration,
  IHelloHealthDataProviderConfiguration,
} from "../models/DataProviderConfigurations/HelloHealthDataProviderConfiguration";
import {
  IIrisDataProviderConfiguration,
  IrisDataProviderConfiguration,
} from "../models/DataProviderConfigurations/IrisDataProviderConfiguration";

export const DataProviderTypes = [
  "Helix",
  "IRIS",
  "HelloHealth",
  "BestPractice",
  "DummyData",
  "Local",
] as const;

export type TDataProviderType = typeof DataProviderTypes[number];

/**
 * Union type of all the Data Provider configuration classes
 */
export type TDataProviderConfiguration =
  | HelixDataProviderConfiguration
  | IrisDataProviderConfiguration
  | BPDataProviderConfiguration
  | HelloHealthDataProviderConfiguration;

/**
 * Union type of all the Data Provider configuration interfaces
 */
export type TDataProviderConfigurationInterface =
  | IHelixDataProviderConfiguration
  | IIrisDataProviderConfiguration
  | IBPDataProviderConfiguration
  | IHelloHealthDataProviderConfiguration;
