export class ApiError extends Error{
    public statusCode: number;
    public code?:string | undefined
    public isOperational: boolean;

    constructor(statusCode: number, message: string, code?: string,){
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}