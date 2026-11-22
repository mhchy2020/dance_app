import { Router } from "express";
import { authRouter } from "./modules/auth/route.ts";
import { eventRouter } from "./modules/events/route.ts";

export const router = Router();

router.use('/auth', authRouter);
router.use('/events', eventRouter);