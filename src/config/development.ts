import type { ConfigSchema } from "./types";
const config: ConfigSchema = {
  port: +process.env.PORT,
  logger: {
    level: "info",
    filePath: "./tmp/log.json",
  },
  mongodb: {
    connectionUri: process.env.MONGO_URL,
  },
};

export default config;
