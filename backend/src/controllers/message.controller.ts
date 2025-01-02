import { NextFunction, Request, Response } from "express";

import { messageService } from "../service/message.service";
import { socketService } from "../service/socket.service";

class MessageController {
  public async sendMessage(req: Request, res: Response, next: NextFunction) {
    const { chatId, text, sender } = req.body;
    const message = await messageService.sendMessage(chatId, text, sender);
    socketService.emit("receiveMessage", message);
    res.status(201).json(message);
  }

  public async getMessage(req: Request, res: Response, next: NextFunction) {
    const { chatId } = req.params;
    const messages = await messageService.getMessage(chatId);
    res.status(200).json(messages);
  }

  public startAutoSend(req: Request, res: Response, next: NextFunction) {
    try {
      messageService.startAutoSend();
      res.status(200).json({ message: "Auto send started" });
    } catch (error) {
      next(error);
    }
  }

  public stopAutoSend(req: Request, res: Response, next: NextFunction) {
    try {
      messageService.stopAutoSend();
      res.status(200).json({ message: "Auto send stopped" });
    } catch (error) {
      next(error);
    }
  }
}

export const messageController = new MessageController();
