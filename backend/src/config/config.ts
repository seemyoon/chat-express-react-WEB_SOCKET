import dotenv from "dotenv";

dotenv.config();

export const configs = {
  APP_PORT: process.env.APP_PORT,
  APP_HOST: process.env.APP_HOST,

  APP_MONGO_URL: process.env.MONGO_URL,

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

  SESSION_SECRET: process.env.SESSION_SECRET,
};
