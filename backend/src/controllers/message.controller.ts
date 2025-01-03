import { NextFunction, Request, Response } from "express";

import { messageService } from "../service/message.service";

class MessageController {
  public async sendMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const { chatId } = req.params;
      const { text } = req.body;

      const message = await messageService.sendMessage(chatId, text);

      res.status(201).json(message);
    } catch (error) {
      next(error);
    }
  }

  public async getMessages(req: Request, res: Response, next: NextFunction) {
    try {
      const { chatId } = req.params;

      const messages = await messageService.getMessages(chatId);

      res.status(200).json(messages);
    } catch (error) {
      next(error);
    }
  }
  // public startAutoSend(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     messageService.startAutoSend();
  //     res.status(200).json({ message: "Auto send started" });
  //   } catch (error) {
  //     next(error);
  //   }
  // }
  //
  // public stopAutoSend(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     messageService.stopAutoSend();
  //     res.status(200).json({ message: "Auto send stopped" });
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}

export const messageController = new MessageController();
