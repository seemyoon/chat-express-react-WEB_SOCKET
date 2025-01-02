import * as http from "node:http";

import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import session from "express-session";
import mongoose from "mongoose";
import { Server } from "socket.io";

import { configs } from "./config/config";
import passport from "./config/passport";
import { ApiError } from "./errors/api-error";
import { authRouter } from "./router/auth.router";
import { chatRouter } from "./router/chat.router";
import { messageRouter } from "./router/message.router";
import { socketService } from "./service/socket.service";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

socketService.initialize(io);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.use(
  session({
    secret: configs.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.get("/", (req, res) => {
  res.send("<button><a href='/auth/google'>Login With Google</a></button>");
});

app.use("/auth", authRouter);
app.use("/chat", chatRouter);
app.use("/message", messageRouter);

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
  try {
    await mongoose.connect(configs.APP_MONGO_URL);
    console.log(
      ` Server is running on http://${configs.APP_HOST}:${configs.APP_PORT}`,
    );
  } catch (error) {
    console.error("Database connection error:", error.message);
  }
});
