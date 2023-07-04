/**
 * Env config used by HelixNetworkService
 * Some of the configurations are used in the next-services version
 * of HelixNetworkService and legacy support in EhrService.
 * These should be deprecated when
 * the service is completely switched off to use Connect
 *
 */
export interface IHelixNetworkServiceConfig {
  helixBaseUrl: string;
  helixAuthUrl: string;
  helixClientId: string;
  helixClientSecret: string;
  mdHubBaseUrl: string;
  mdHubClientId: string;
  mdHubClientSecret: string;
  mdHubSubscriptionKey: string;
  preventHubRequests: boolean;
}

export const HelixStringEnvVarKeys = [
  "HELIX_BASE_URL",
  "HELIX_AUTH_URL",
  "HELIX_CLIENT_ID",
  "HELIX_CLIENT_SECRET",
  "MD_HUB_BASE_URL",
  "MD_HUB_CLIENT_ID",
  "MD_HUB_CLIENT_SECRET",
  "MD_HUB_SUBSCRIPTION_KEY",
];

export const HelixBooleanEnvVarKey = ["PREVENT_HUB_REQUESTS"];
