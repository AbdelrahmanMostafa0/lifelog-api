import { NextFunction, Request, Response } from "express";
import { ZodObject, ZodRawShape } from "zod";
import { validationErrorResponse } from "../utils/response";

export const validate = (schemas: {
  body?: ZodObject<ZodRawShape>;
  params?: ZodObject<ZodRawShape>;
  query?: ZodObject<ZodRawShape>;
}) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (schemas.body) {
      const result = schemas.body.safeParse(req.body);
      if (!result.success) return validationErrorResponse(res, result);
      req.body = result.data;
    }

    if (schemas.params) {
      const result = schemas.params.safeParse(req.params);
      if (!result.success) return validationErrorResponse(res, result);
      req.params = result.data as typeof req.params;
    }

    if (schemas.query) {
      const result = schemas.query.safeParse(req.query);
      if (!result.success) return validationErrorResponse(res, result);
      req.query = result.data as typeof req.query;
    }

    next();
  };
};
