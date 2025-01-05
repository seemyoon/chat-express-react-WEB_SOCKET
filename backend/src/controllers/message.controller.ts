import { Request, Response } from "express";

import { messageService } from "../service/message.service";

class MessageController {
  public async getMessages(req: Request, res: Response) {
    try {
      const { chatId } = req.params;

      const messages = await messageService.getMessages(chatId);
      res.status(200).json(messages);
    } catch (error) {
      console.error("Failed to get messages:", error);
      res.status(500).json({ message: "Failed to get messages" });
    }
  }
}

export const messageController = new MessageController();
