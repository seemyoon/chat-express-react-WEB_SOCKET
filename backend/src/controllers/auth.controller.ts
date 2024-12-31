import { NextFunction, Request, Response } from "express";

class AuthController {
  public async googleLogin(req: Request, res: Response, next: NextFunction) {}

  public async facebookLogin(req: Request, res: Response, next: NextFunction) {}

  public async logout(req: Request, res: Response, next: NextFunction) {}
}

export const authController = new AuthController();
