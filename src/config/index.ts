import common from "./common";
import configValidateSchema from "./schema/config.schema";
import { ConfigSchema, EnvNames } from "./types";
import "dotenv/config";

// config factory based on environment
const loadConfig = (): ConfigSchema => {
  const env = process.env.NODE_ENV || EnvNames.DEVELOPMENT;
  /* eslint-disable */
  const mainConfigModule = require(`./${env}`);
  const mainConfig: ConfigSchema = mainConfigModule.default;
  let localConfig: Partial<ConfigSchema> = {};

  try {
    /* eslint-disable */
    const localConfigModule = require(`./${env}.local`);
    localConfig = localConfigModule.default;
  } catch (error) {
    localConfig = {};
  }

  const mergedConfig: ConfigSchema = {
    ...common,
    ...mainConfig,
    ...localConfig,
  };

  validateConfig(mergedConfig);
  return mergedConfig;
};

// config validations against predefined schema
const validateConfig = (config: ConfigSchema) => {
  try {
    configValidateSchema.parse(config);
  } catch (error) {
    throw new Error(
      `Error occurred while validating env config: ${(error as Error).message}`,
    );
  }
};

export default loadConfig();
