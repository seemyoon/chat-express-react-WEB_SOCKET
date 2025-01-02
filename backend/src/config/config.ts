import dotenv from "dotenv";

dotenv.config();

export const configs = {
  APP_PORT: process.env.APP_PORT,
  APP_HOST: process.env.APP_HOST,

  APP_MONGO_URL: process.env.MONGO_URL,

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  CALLBACK_URL: process.env.CALLBACK_URL,
  CALLBACK_URL_TEST: process.env.CALLBACK_URL_POSTMAN,

  SESSION_SECRET: process.env.SESSION_SECRET,
};
