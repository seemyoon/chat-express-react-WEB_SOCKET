import { Router } from "express";

import { chatController } from "../controllers/chat.controller";

const router = Router();

router.get("/getChats", chatController.getChats);

router.get("/searchChats", chatController.searchChats);

router.get("/getChat/:chatId", chatController.getChatById);

router.delete("/removeChat/:chatId", chatController.removeChat);

export const chatRouter = router;
