import { Request, Response } from "express";
import { ApiError, errorResponse } from "../../utils/response";
import { RegisterDto, LoginDto, GoogleLoginDto } from "./auth.types";
import { User } from "../../models/user.model";
import {
  clearAuthCookies,
  generateAccessToken,
  generateRefreshToken,
  setAuthCookies,
} from "../../utils/jwt";

export const register = async (data: RegisterDto, res: Response) => {
  const { name, email, password } = data;
  const normalizedEmail = email.toLowerCase().trim();
  const userExists = await User.findOne({ email: normalizedEmail });
  if (userExists) {
    throw new ApiError(400, "User already exists");
  }
  try {
    const user = await User.create({ name, email: normalizedEmail, password });
    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());
    setAuthCookies(res, accessToken, refreshToken);
    return user;
  } catch (error: any) {
    if (error.code === 11000) {
      throw new ApiError(400, "User already exists");
    }
    throw error;
  }
};
export const login = async (data: LoginDto, res: Response) => {
  const { email, password } = data;
  const normalizedEmail = email.toLowerCase().trim();
  const user = await User.findOne({ email: normalizedEmail });
  if (!user) {
    throw new ApiError(400, "Invalid credentials");
  }
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid credentials");
  }
  const accessToken = generateAccessToken(user._id.toString());
  const refreshToken = generateRefreshToken(user._id.toString());
  setAuthCookies(res, accessToken, refreshToken);
  return user;
};

export const google = async (data: GoogleLoginDto, res: Response) => {
  const { googleId, email, name, picture } = data;
  const normalizedEmail = email.toLowerCase().trim();
  const userExists = await User.findOne({ email: normalizedEmail });
  if (!userExists) {
    const user = await User.create({
      name,
      email: normalizedEmail,
      googleId,
      avatar: picture,
    });
    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());
    setAuthCookies(res, accessToken, refreshToken);
    return user;
  }
  const accessToken = generateAccessToken(userExists._id.toString());
  const refreshToken = generateRefreshToken(userExists._id.toString());
  setAuthCookies(res, accessToken, refreshToken);
  return userExists;
};

export const logout = async (res: Response) => {
  clearAuthCookies(res);
  return { message: "Logged out successfully" };
};
