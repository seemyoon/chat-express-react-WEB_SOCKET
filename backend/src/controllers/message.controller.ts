import { NextFunction, Request, Response } from "express";

import { messageService } from "../service/message.service";
import { socketService } from "../service/socket.service";

class MessageController {
  public async sendMessage(req: Request, res: Response, next: NextFunction) {
    const { chatId, text, sender } = req.body;

    const message = await messageService.sendMessage(chatId, text, sender);

    // Используем геттер для доступа к io
    socketService.getIo().emit("receiveMessage", message);

    res.status(201).json(message);
  }

  public async getMessages(req: Request, res: Response, next: NextFunction) {
    const { chatId } = req.params;
    const messages = await messageService.getMessages(chatId);
    res.status(200).json(messages);
  }
}

export const messageController = new MessageController();
