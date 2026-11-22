import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError.ts";
import { verifyAccessToken } from "../utils/token.ts";
import { db } from "../config/supabase.ts";

export default async function authorizeAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new ApiError(401, "Access token required");
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    throw new ApiError(401, "Access token required");
  }
  // verify and decode the access token
  let userId: string;
  try {
    const decoded = verifyAccessToken(token);
    userId = decoded.userId;
  } catch (err) {
    throw new ApiError(
      401,
      "Invalid or expired access token",
      "ACCESS_TOKEN_EXPIRED",
    );
  }
  const result = await db.query(`SELECT role from users where id=$1`, [userId]);

  if (result.rowCount === 0) {
    throw new ApiError(401, "User not found");
  }

  if (result.rows[0].role !== "admin") {
    throw new ApiError(401, "Only admins can perform this action");
  }
  next();
}
