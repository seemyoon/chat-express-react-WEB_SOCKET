import { NextFunction, Request, Response } from "express";
import passport from "passport";

class AuthService {
  public googleLogin(req: Request, res: Response, next: NextFunction) {
    return passport.authenticate("/google", { scope: ["profile", "email"] })(
      req,
      res,
      next,
    );
  }

  public googleCallback(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("/google", { failureRedirect: "/auth/error" })(
      req,
      res,
      () => {
        res.redirect("/");
      },
    );
  }

  public logout(req: Request, res: Response) {
    req.logout((err) => {
      if (err) {
        return res.status(500).send("Error logging out");
      }
      res.redirect("/login");
    });
  }
}

export const authService = new AuthService();
