import { Router } from "express";

import { chatController } from "../controllers/chat.controller";

const router = Router();

router.post(
  "/createChat",
  // authMiddleware.isAuthenticated,
  chatController.createChat,
);
router.put(
  "/updateChat",
  // authMiddleware.isAuthenticated,
  chatController.updateChat,
);
router.get(
  "/getChats",
  // authMiddleware.isAuthenticated,
  chatController.getChats,
);
router.get(
  "/searchChats",
  // authMiddleware.isAuthenticated,
  chatController.searchChats,
);
router.post(
  "/removeChat",
  // authMiddleware.isAuthenticated,
  chatController.removeChat,
);

// router.get("/:chatId", authMiddleware.isAuthenticated, chatController.getChat);

export const chatRouter = router;
