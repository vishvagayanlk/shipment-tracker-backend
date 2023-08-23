import "dotenv/config";
import config from "./config";
import app from "./server";
import { logger } from "./core/logger";
import database from "./core/mongo";

database.connect();
app.listen(config.port, () => {
  logger.info(`Server running on port: ${config.port}`);
});
