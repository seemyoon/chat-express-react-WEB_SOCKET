import { Router } from "express";

import { socketController } from "../controllers/socket.controller";

const router = Router();

router.post("/handleAutoSend", socketController.handleAutoSend);

export const socketRouter = router;
