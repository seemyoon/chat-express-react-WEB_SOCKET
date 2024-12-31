import { NextFunction, Request, Response } from "express";

class SocketController {
  public async handleAutoSend(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {}
}

export const socketController = new SocketController();
