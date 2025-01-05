import { Request, Response } from "express";

import { messageService } from "../service/message.service";

class MessageController {
  public async sendMessage(req: Request, res: Response) {
    try {
      const { chatId } = req.params;
      const { text } = req.body;

      const message = await messageService.sendMessage(chatId, text);
      res.status(201).json(message);
    } catch (error) {
      console.error("Failed to send message:", error);
      res.status(500).json({ message: "Failed to send message" });
    }
  }

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
