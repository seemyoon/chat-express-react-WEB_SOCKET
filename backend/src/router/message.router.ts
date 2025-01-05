import { Router } from "express";

import { messageController } from "../controllers/message.controller";

const router = Router();

router.post("/message", messageController.sendMessage);
router.get("/messages/:chatId", messageController.getMessages);

export const messageRouter = router;
