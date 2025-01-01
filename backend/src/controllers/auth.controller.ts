import { NextFunction, Request, Response } from "express";

import { authService } from "../service/auth.service";

class AuthController {
  public googleLogin(req: Request, res: Response, next: NextFunction) {
    authService.googleLogin(req, res, next);
  }

  public googleCallback(req: Request, res: Response, next: NextFunction) {
    authService.googleCallback(req, res, next);
  }

  public logout(req: Request, res: Response) {
    authService.logout(req, res);
  }
}

export const authController = new AuthController();
