import { Router } from "express";
import { authController } from "./controller.ts";
import { verifyAccessToken } from "../../middleware/verifyAccessToken.ts";

export const authRouter = Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.post('/refresh', authController.refresh)
authRouter.patch('/password', verifyAccessToken, authController.password)
