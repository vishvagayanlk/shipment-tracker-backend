type LogLevels = "error" | "warn" | "info" | "debug" | "verbose";
interface ConfigSchema {
  port: number;
  logger: {
    level: LogLevels;
    filePath: string;
  };
  mongodb: {
    connectionUri: string;
  };
}

enum EnvNames {
  DEVELOPMENT = "development",
  PRODUCTION = "production",
}

type EnvType = keyof typeof EnvNames;

export type { ConfigSchema, EnvType, LogLevels };

export { EnvNames };
