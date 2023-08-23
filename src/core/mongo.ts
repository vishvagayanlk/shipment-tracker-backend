import mongoose from "mongoose";
import { logger } from "./logger";

const MONGO_URL = process.env.MONGO_URL;

class Database {
  private static instance: Database | null = null;
  private constructor() {}
  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
  connect(): void {
    mongoose
      .connect(MONGO_URL)
      .then(() => {
        logger.info("Connected to MongoDB");
      })
      .catch((error) => {
        logger.error("Error connecting to MongoDB:", error);
      });
  }
}

export default Database.getInstance();
