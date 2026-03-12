import { Router } from "express";
import { authRouter } from "./modules/auth/route.ts";

export const router = Router();

router.use('/auth', authRouter);