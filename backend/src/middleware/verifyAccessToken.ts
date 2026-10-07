import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { decodedTokenResponse } from "../utils/token";
import { ApiError } from "../utils/ApiError.ts";

declare global {
  namespace Express {
    interface Request {
      user?: decodedTokenResponse
    }
  }
}

const ACCESS_SECRET = process.env.ACCESS_SECRET!;

export const verifyAccessToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "Access token required")
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    throw new ApiError(401, "Access token required")
  }

  try {
    const decoded = jwt.verify(token, ACCESS_SECRET) as decodedTokenResponse;
    req.user = decoded;
    next();
  } catch (err) {
    throw new ApiError(401, "Invalid or expired access token", "ACCESS_TOKEN_EXPIRED")
  }
};
