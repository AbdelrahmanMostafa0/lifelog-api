import { AuthRequest } from "../../types/auth";
import { Response } from "express";
import * as logsService from "./logs.service";
import { errorResponse, successResponse } from "../../utils/response";

export const getLogs = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    return errorResponse(res, "User not found", 404);
  }
  try {
    const logs = await logsService.getLogs(userId);
    return successResponse(res, logs, "Logs retrieved successfully", 200);
  } catch (error: any) {
    return errorResponse(res, error.message, 500);
  }
};

export const createLog = async (req: AuthRequest, res: Response) => {
  const data = req.body;
  const userId = req.user?.id;
  if (!userId) {
    return errorResponse(res, "User not found", 404);
  }
  try {
    const log = await logsService.createLog({ ...data, userId }, res);
    return successResponse(res, log, "Log created successfully", 201);
  } catch (error: any) {
    return errorResponse(res, error.message, 500);
  }
};

export const updateLog = (req: AuthRequest, res: Response) => {
  // TODO: Implement update log logic
};

export const deleteLog = (req: AuthRequest, res: Response) => {
  // TODO: Implement delete log logic
};
