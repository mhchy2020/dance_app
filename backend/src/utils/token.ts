import jwt from "jsonwebtoken";

export type decodedTokenResponse = {
  userId: string
  iat: number
  exp: number
}

const ACCESS_SECRET = process.env.ACCESS_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!;

export const generateToken = {

    access: (userId: string) => {
        return jwt.sign({userId}, ACCESS_SECRET, {
            expiresIn: "1m"
        })
    },

    refresh: (userId: string) => {
        return jwt.sign({userId}, REFRESH_SECRET, {
            expiresIn: "1m"
        })
    }
}

export const verifyAccessToken = (token: string): decodedTokenResponse => {
    return jwt.verify(token, ACCESS_SECRET) as decodedTokenResponse;
}

export const verifyRefreshToken = (token: string): decodedTokenResponse => {
    return jwt.verify(token, REFRESH_SECRET) as decodedTokenResponse;
    
}