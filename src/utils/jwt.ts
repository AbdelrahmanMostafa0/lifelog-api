import jwt, { JwtPayload } from "jsonwebtoken";
import { Response } from "express";

const isProduction = process.env.NODE_ENV === "production";

export interface TokenPayload extends JwtPayload {
  id: string;
}

export const generateAccessToken = (userId: string): string => {
  return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (userId: string): string => {
  return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET as string, {
    expiresIn: "30d",
  });
};

export const setAuthCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string,
): void => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    path: "/api/auth/refresh", // refresh token only sent on this route
  });
};

export const clearAuthCookies = (res: Response): void => {
  res.clearCookie("accessToken", { path: "/" });
  res.clearCookie("refreshToken", { path: "/api/auth/refresh" });
};

export const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
  ) as TokenPayload;
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  return jwt.verify(
    token,
    process.env.REFRESH_TOKEN_SECRET as string,
  ) as TokenPayload;
};
