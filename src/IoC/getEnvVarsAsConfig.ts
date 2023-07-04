import _ from "lodash";

/**
 * A copy of the getConfig function that converts env vars
 * into configurations. This version does not have default configs
 */
export const getEnvVarsAsConfig = <
  C extends unknown = Record<string, string | number | boolean>,
>(
  stringConfigVars: string[],
  numberConfigVars: string[],
  booleanConfigVars: string[],
): C => {
  // our configuration object holding all values
  const config: any = {}; // magically assign the vars from process.ENV then cast as IConfig

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

  return config as C;
};
