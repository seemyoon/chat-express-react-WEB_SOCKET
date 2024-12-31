import { Router } from "express";

import { messageController } from "../controllers/message.controller";

const router = Router();

router.get("/getMessages", messageController.getMessages);
router.post("/sendMessage", messageController.sendMessage);

export const messageRouter = router;
