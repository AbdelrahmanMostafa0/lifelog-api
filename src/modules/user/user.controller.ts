import { Response } from "express";
import { AuthRequest } from "../../types/auth";
import * as userService from "./user.service";
import { errorResponse, successResponse } from "../../utils/response";

export const getUser = async (req: AuthRequest, res: Response) => {
  const user = await userService.getUserById(req.user!.id);
  if (!user) {
    return errorResponse(res, "User not found", 404);
  }
  return successResponse(res, user, "User fetched successfully", 200);
};
