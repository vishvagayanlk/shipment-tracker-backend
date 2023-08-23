import type { ConfigSchema } from "./types";
import "dotenv/config";

const config: ConfigSchema = {
  port: 3000,
  logger: {
    level: "info",
    filePath: "./tmp/log.json",
  },
  mongodb: {
    connectionUri: process.env.MONGO_URL,
  },
};

export default config;
