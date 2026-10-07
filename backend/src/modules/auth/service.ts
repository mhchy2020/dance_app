import bcrypt from "bcrypt";
import {
  generateToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../../utils/token.ts";
import { authRepository } from "./repository.ts";
import { ApiError } from "../../utils/ApiError.ts";
import { db } from "../../config/supabase.ts";

export const authService = {
  async register(name: string, email: string, password: string) {
    const existingUser = await authRepository.findByEmail(email);
    if (existingUser) {
      throw new ApiError(404, "user already exists");
    }

    const hashed = await bcrypt.hash(password, 10);
    const id = crypto.randomUUID();

    const user = await authRepository.createUser(id, name, email, hashed);

    return {
      message: "user successfully registered",
      user,
    };
  },
  async login(email: string, password: string) {
    const user = await authRepository.findByEmail(email);
    if (!user) {
      throw new ApiError(404, "user not found, register first");
    }

    const isvalid = await bcrypt.compare(password, user.password_hash);

    if (!isvalid) {
      throw new ApiError(404, "Invalid Credentials");
    }

    // return with access and refresh token
    const accessToken = generateToken.access(user.id);
    const refreshToken = generateToken.refresh(user.id);
    const { password_hash, ...returnUser } = user;

    return { user: returnUser, accessToken, refreshToken };
  },
  async refresh(refresh: string) {
    if (!refresh) {
      throw new ApiError(401, "refresh token not found");
    }
    try {
      const response = verifyRefreshToken(refresh);
      
      //generate new access and refresh token
      return {
        accessToken: generateToken.access(response.userId),
        refreshToken: generateToken.refresh(response.userId),
      };
    } catch (err) {
      throw new ApiError(401, "Invalid or expired refresh token", "REFRESH_TOKEN_EXPIRED");
    }
  },

  async password(userId: string, password: string, newPassword: string) {
    const query = `
                Select password_hash
                 from users
                 where id=$1
                `;
    const result = await db.query(query, [userId]);

    const dbPassword = result.rows[0].password_hash;

    const Isvalid = await bcrypt.compare(password, dbPassword);

    if (!Isvalid) {
      throw new ApiError(401, "Incorrect Password");
    }

    // hash newPassword and update the db
    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    await db.query(
      `Update users
                    set password_hash = $1
                    where id=$2`,
      [newHashedPassword, userId],
    );
  },
};
