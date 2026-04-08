import { Response } from "express";
import { createLogDTO } from "./logs.types";
import { Log } from "../../models/logs.model";

export const createLog = async (data: createLogDTO, res: Response) => {
  try {
    const log = await Log.create(data);
    return log;
  } catch (error) {
    throw error;
  }
};

export const getLogs = async (userId: string) => {
  try {
    const logs = await Log.find({ userId });
    return logs;
  } catch (error) {
    throw error;
  }
};
