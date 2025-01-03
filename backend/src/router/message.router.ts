import { Router } from "express";

import { messageController } from "../controllers/message.controller";

const router = Router();

router.post("/message/:chatId", messageController.sendMessage);

// Получение сообщений для чата (параметр chatId передается в URL)
router.get("/messages/:chatId", messageController.getMessages);
// router.post(
//   "/startAutoSend",
//   // authMiddleware.isAuthenticated,
//   messageController.startAutoSend,
// );
//
// router.post(
//   "/stopAutoSend",
//   // authMiddleware.isAuthenticated,
//   messageController.stopAutoSend,
// );

export const messageRouter = router;
