import http from "node:http";

import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { Server } from "socket.io";
import { configs } from "./config/config";
import { ApiError } from "./errors/api-error";
import { authRouter } from "./router/auth.router";
import { chartRouter } from "./router/chart.router";
import { messageRouter } from "./router/message.router";
import { socketRouter } from "./router/socket.router";

const app = express();
const server = http.createServer(app);
//
const io = new Server();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: [
      "Authorization",
      "Content-Type",
      "Origin",
      "Access-Control-Allow-Origin",
    ],
    preflightContinue: false,
    optionsSuccessStatus: 200,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use("/chart", chartRouter);
app.use("/auth", authRouter);
app.use("/message", messageRouter);
app.use("/socket", socketRouter);

app.use(
  "*",
  (error: ApiError, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500).send(error.message);
  },
);

process.on("uncaughtException", (error) => {
  console.error("uncaughtException", error.message, error.stack);
  process.exit(1);
});

server.listen(configs.APP_PORT, async () => {
  await mongoose.connect(configs.APP_MONGO_URL);
  console.log(
    `Server is running on http://${configs.APP_HOST}:${configs.APP_PORT}`,
  );
});
