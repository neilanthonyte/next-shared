/**
 * Configurations used by the PaydockService
 */
export interface IPaydockServiceConfig {
  paydockApiUrl: string;
  paydockUserSecretKey: string;
  paydockEnabled: boolean;
}

export const PaydockServiceStringEnvKeys = [
  "PAYDOCK_API_URL",
  "PAYDOCK_USER_SECRET_KEY",
];

export const PaydockServiceBooleanEnvKeys = ["PAYDOCK_ENABLED"];
