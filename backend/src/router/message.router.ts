import { Router } from "express";

import { messageController } from "../controllers/message.controller";

const router = Router();

router.get("/getMessages/:chatId", messageController.getMessages);

export const messageRouter = router;
