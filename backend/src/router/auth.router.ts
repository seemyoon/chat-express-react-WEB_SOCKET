import { Router } from "express";

import { authController } from "../controllers/auth.controller";

const router = Router();

// Маршруты для аутентификации
router.get("/googleLogin", (req, res, next) =>
  authController.googleLogin(req, res, next),
);
router.get("/google/callback", (req, res, next) =>
  authController.googleCallback(req, res, next),
);
router.post("/logout", authController.logout);

export const authRouter = router;
