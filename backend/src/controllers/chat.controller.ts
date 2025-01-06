import { NextFunction, Request, Response } from "express";

import { chatService } from "../service/chat.service";

class ChatController {
  public async removeChat(req: Request, res: Response, next: NextFunction) {
    const { chatId } = req.params;
    try {
      await chatService.removeChat(chatId);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }

  public async getChats(req: Request, res: Response, next: NextFunction) {
    try {
      const chats = await chatService.getChats();
      res.status(200).json(chats);
    } catch (error) {
      next(error);
    }
  }
  public async getChatById(req: Request, res: Response, next: NextFunction) {
    const { chatId } = req.params;
    try {
      const chats = await chatService.getChatById(chatId);
      res.status(200).json(chats);
    } catch (error) {
      next(error);
    }
  }

  public async searchChats(req: Request, res: Response, next: NextFunction) {
    const { query } = req.query;
    try {
      const chats = await chatService.searchChats(query as string);
      res.status(200).json(chats);
    } catch (error) {
      next(error);
    }
  }
}

export const chatController = new ChatController();
