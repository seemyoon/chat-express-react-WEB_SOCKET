import { NextFunction, Request, Response } from "express";
import passport from "passport";

import { authService } from "../service/auth.service";

class AuthController {
  public googleLogin(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("google", { scope: ["email", "profile"] })(
      req,
      res,
      next,
    );
  }

  public googleCallback(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("google", (err, user) => {
      if (err || !user) {
        return res.redirect("/auth/callback/failure");
      }

      req.login(user, (loginErr) => {
        if (loginErr) {
          return next(loginErr);
        }

        res.send(`Welcome ${user.displayName || user.name.givenName}`);
      });
    })(req, res, next);
  }

  public logout(req: Request, res: Response) {
    authService.logout(req, res);
  }
}

export const authController = new AuthController();
