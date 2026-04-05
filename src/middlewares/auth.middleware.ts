import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/jwt";
import { errorResponse } from "../utils/response";
import { AuthRequest } from "../types/auth";

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decodedToken = verifyAccessToken(token);
    if (!decodedToken) {
      return errorResponse(res, "Invalid or expired token", 401);
    }
    req.user = decodedToken;
    next();
  } catch (error) {
    return errorResponse(res, "Invalid or expired token", 401);
  }
};
