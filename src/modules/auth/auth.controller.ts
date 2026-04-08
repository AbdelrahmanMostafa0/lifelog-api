import { Request, Response } from "express";
import * as authService from "./auth.service";
import { errorResponse, successResponse } from "../../utils/response";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await authService.register(req.body, res);
    return successResponse(res, user, "User registered successfully", 201);
  } catch (error: unknown) {
    const errorObj = error as { message: string; statusCode: number };
    const errorCode = errorObj.statusCode || 500;
    return errorResponse(
      res,
      errorObj.message || "Internal server error",
      errorCode,
    );
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const user = await authService.login(req.body, res);
    return successResponse(res, user, "User logged in successfully", 200);
  } catch (error: unknown) {
    const errorObj = error as { message: string; statusCode: number };
    const errorCode = errorObj.statusCode || 500;
    return errorResponse(
      res,
      errorObj.message || "Internal server error",
      errorCode,
    );
  }
};

export const google = async (req: Request, res: Response) => {
  const { access_token } = req.body;
  const userInfoResponse = await fetch(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    {
      headers: { Authorization: `Bearer ${access_token}` },
    },
  );
  const googleUser = await userInfoResponse.json();
  const { sub: googleId, email, name, picture } = googleUser;

  if (!email) {
    return errorResponse(res, "Invalid access token", 400);
  }

  try {
    const user = await authService.google(
      { googleId, email, name, picture },
      res,
    );
    return successResponse(res, user, "User logged in successfully", 200);
  } catch (error: unknown) {
    const errorObj = error as { message: string; statusCode: number };
    const errorCode = errorObj.statusCode || 500;
    return errorResponse(
      res,
      errorObj.message || "Internal server error",
      errorCode,
    );
  }
};

export const refresh = async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) {
    return errorResponse(res, "Refresh token missing", 401);
  }
  try {
    const user = await authService.refresh(refreshToken, res);
    return successResponse(res, user, "Tokens refreshed successfully", 200);
  } catch (error: unknown) {
    const errorObj = error as { message: string; statusCode: number };
    return errorResponse(
      res,
      errorObj.message || "Internal server error",
      errorObj.statusCode || 500,
    );
  }
};
export const logout = async (req: Request, res: Response) => {
  await authService.logout(res);
  return successResponse(res, null, "User logged out successfully", 200);
};
