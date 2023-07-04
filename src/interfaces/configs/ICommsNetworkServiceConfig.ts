export interface ICommsNetwokServiceConfig {
  commsUrl: string;
  commsBearerToken: string;
}

export const CommsNetworkServiceStringEnvKeys = [
  "COMMS_URL",
  "COMMS_BEARER_TOKEN",
];
