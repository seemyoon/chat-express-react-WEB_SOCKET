import { Router } from "express";

import { chatController } from "../controllers/chat.controller";

const router = Router();

router.get("/getChats", chatController.getChats);

router.get("/searchChats", chatController.searchChats);

router.post("/createChat", chatController.createChat);

router.get("/getChat/:chatId", chatController.getChatById);

router.put("/updateChat/:chatId", chatController.getChatById);

router.delete("/removeChat/:chatId", chatController.removeChat);

router.put("/updateChat/:chatId", chatController.updateChat);

export const chatRouter = router;
