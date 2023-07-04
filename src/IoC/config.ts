// external
import * as _ from "lodash";

/**
 * Configuration interface.
 */
export interface IConfig {
  port: number;
  serverUrl: string;
  databaseUrl: string;

  redisUrl: string;
  redisNamespace: string;
  redisTls: boolean;

  sentryDsn: string;
  sentryEnvironment: string;

  // next-comms microservice
  commsUrl: string;
  commsBearerToken: string;
}

/**
 * Get config variables.
 */

export function getConfig<C extends IConfig>(
  stringConfigVars: string[],
  numberConfigVars: string[],
  booleanConfigVars: string[],
): C {
  // our configuration object holding all values
  const config: any = {}; // magically assign the vars from process.ENV then cast as IConfig

  // add in generic default IConfig variables
  stringConfigVars = [
    ...stringConfigVars,
    "DATABASE_URL",
    "SERVER_URL",
    "REDIS_URL",
    "REDIS_NAMESPACE",
    "SENTRY_DSN",
    "SENTRY_ENVIRONMENT",
    "COMMS_URL",
    "COMMS_BEARER_TOKEN",
  ];
  numberConfigVars = [...numberConfigVars, "PORT"];
  booleanConfigVars = [...booleanConfigVars, "REDIS_TLS"];

  // convert string config variables from env file to config object
  stringConfigVars.forEach((configKey) => {
    const strVal = process.env[configKey];
    if (strVal === undefined) {
      throw new Error(`Environment variable '${configKey}' missing`);
    }

    const camelCaseKey = _.camelCase(configKey);
    config[camelCaseKey] = strVal;
  });

  // convert number config variables from env file to config object
  numberConfigVars.forEach((configKey) => {
    const strVal = process.env[configKey];
    if (strVal === undefined) {
      throw new Error(`Environment variable '${configKey}' missing`);
    }

    const numVal = parseInt(strVal, 10);
    if (Number.isNaN(numVal)) {
      throw new Error(
        `Environment variable '${configKey}' not a valid integer`,
      );
    }

    const camelCaseKey = _.camelCase(configKey);
    config[camelCaseKey] = numVal;
  });

  // convert boolean config variables from env file to config object
  booleanConfigVars.forEach((configKey) => {
    const strVal = process.env[configKey];
    if (strVal === undefined) {
      throw new Error(`Environment variable '${configKey}' missing`);
    }

    const camelCaseKey = _.camelCase(configKey);
    if (strVal === "true") {
      config[camelCaseKey] = true;
      return;
    }
    if (strVal === "false") {
      config[camelCaseKey] = false;
      return;
    }

    throw new Error(`Environment variable '${configKey}' not true/false`);
  });

  // return config
  return config as C;
}
