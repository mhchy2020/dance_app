import { type NextFunction, type Request, type Response } from "express";
import { authService } from "./service.ts";
import { asyncWrapper } from "../../utils/AsyncWrapper.ts";
import { ApiError } from "../../utils/ApiError.ts";
import { db } from "../../config/supabase.ts";
import bcrypt from 'bcrypt';

// controller that calls service.ts functions
export const authController = {

    register: asyncWrapper(async (req: Request, res: Response) => {
            const { name, email, password } = req.body;
            const result = await authService.register(name, email, password);
            return res.status(201).json({
                success: true,
                data: result
            });
    }),

    login: asyncWrapper(async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const result = await authService.login(email, password);
        return res.status(200).json({
            success: true,
            data: result
        })
    }),

    refresh: async (req: Request, res: Response) => { 
      
        const { refreshToken } = req.body;

        const result = await authService.refresh(refreshToken)
        
        return res.status(200).json({
            success: true,
            data: result
        })

    },

    password: async (req: Request, res: Response) => { 
        const userId = req.user?.userId
        const [password, newPassword] = req.body.password;

        if (!userId) { 
            throw new ApiError(401, "Token expired")
        }
        await authService.password(userId, password, newPassword);
    }
}