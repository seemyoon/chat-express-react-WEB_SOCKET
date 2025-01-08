import { Request, Response } from "express";

class AuthService {
  public logout(req: Request, res: Response) {
    req.logout((err) => {
      if (err) {
        return res.status(500).send("Error logging out");
      }
      res.redirect("/");
    });
  }
}

export const authService = new AuthService();
