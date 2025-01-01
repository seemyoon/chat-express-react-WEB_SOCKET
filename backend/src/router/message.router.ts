import { Router } from "express";

import { messageController } from "../controllers/message.controller";

const router = Router();

router.get("/getMessages", messageController.getMessage);
router.post("/sendMessage", messageController.sendMessage);
router.post("/handleAutoSend", messageController.handleAutoSend);

export const messageRouter = router;
