import { Router } from "express";

import { authController } from "../controllers/auth.controller";

const router = Router();

router.post("/googleLogin", authController.googleLogin);
router.post("/facebookLogin", authController.facebookLogin);
router.post("/logout", authController.logout);

export const authRouter = router;
