import { Router } from "express";

import { authController } from "../controllers/auth.controller";

const router = Router();

router.get("/google", authController.googleLogin);

router.get("/google/callback", authController.googleCallback);

router.post("/logout", authController.logout);

export const authRouter = router;
