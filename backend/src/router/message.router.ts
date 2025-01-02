import { Router } from "express";

import { messageController } from "../controllers/message.controller";

const router = Router();

router.get(
  "/getMessages",
  // authMiddleware.isAuthenticated,
  messageController.getMessage,
);
router.post(
  "/sendMessage",
  // authMiddleware.isAuthenticated,
  messageController.sendMessage,
);

router.post(
  "/startAutoSend",
  // authMiddleware.isAuthenticated,
  messageController.startAutoSend,
);

router.post(
  "/stopAutoSend",
  // authMiddleware.isAuthenticated,
  messageController.stopAutoSend,
);

export const messageRouter = router;
