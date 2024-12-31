import { NextFunction, Request, Response } from "express";

class ChartController {
  public async createChat(req: Request, res: Response, next: NextFunction) {}

  public async updateChat(req: Request, res: Response, next: NextFunction) {}

  public async getChat(req: Request, res: Response, next: NextFunction) {}
  public async getChats(req: Request, res: Response, next: NextFunction) {}
  public async searchChats(req: Request, res: Response, next: NextFunction) {}

  public async removeChat(req: Request, res: Response, next: NextFunction) {}
}

export const chartController = new ChartController();
