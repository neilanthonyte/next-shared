/**
 * Used by loadNextIrisIntegration to
 * create an EHR configuration for ConnectNetworkService
 */
export interface IIrisEhrIntegrationConfig {
  /**
   * Name of the EHR ID
   */
  localIrisStoreEhrId: string;
  /**
   * The IRIS tenant ID used make Connect/IRIS requests.
   */
  localIrisStoreTenantId: string;
}

export const IrisEhrIntegrationEnvKeys = [
  "LOCAL_IRIS_STORE_TENANT_ID",
  "LOCAL_IRIS_STORE_EHR_ID",
];
