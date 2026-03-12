import { type NextFunction, type Request, type Response } from "express";
import { authService } from "./service.ts";
import { asyncWrapper } from "../../utils/AsyncWrapper.ts";

// controller that calls service.ts functions
export const authController = {

    register: asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
            const { email, password } = req.body;
            const result = await authService.register(email, password);
            return res.status(201).json({
                success: true,
                data: result
            });
    }),

    login: asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;
        const result = await authService.login(email, password);
        return res.status(200).json({
            success: true,
            data: result
        })
    })
}