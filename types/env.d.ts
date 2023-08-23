declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    MONGO_URL: string;
    SECRET_KEY: string;
    FRONTEND_URL: string;
  }
}
