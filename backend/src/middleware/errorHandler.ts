import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError.ts";

export const errorHandler =  ( err: Error, req: Request, res: Response, next: NextFunction ) => {
    console.error(err);

    let statusCode: number = 500;
    let code: string | undefined;
    let message: string = 'Internal Server Error';

    if(err instanceof ApiError){
        statusCode = err.statusCode;
        code = err.code;
        message = err.message;
    }
    else if (err instanceof Error) {
        message = err.message;
    }

    res.status(statusCode).json({
        success: false,
        statusCode: statusCode,
        message,
        ...(code && {code})
    });
}