/**
 * Env config used by ConnectNetworkService
 */
export interface IConnectNetworkServiceConfig {
  connectUrl: string;
  connectBearerToken: string;
}

export const ConnectEnvVarKeys = ["CONNECT_URL", "CONNECT_BEARER_TOKEN"];
