import { NextFunction, Request, Response } from "express";

class AuthMiddleware {
  public isAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: "You are not authenticated" });
  }
}

export const authMiddleware = new AuthMiddleware();
