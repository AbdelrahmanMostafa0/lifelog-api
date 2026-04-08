import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { createLog, deleteLog, getLogs, updateLog } from "./logs.controller";
import { validate } from "../../middlewares/validation.middleware";
import { createLogValidatorSchema } from "./logs.validator";

const router = Router();
router.post(
  "/",
  authMiddleware,
  validate({ body: createLogValidatorSchema }),
  createLog,
);
router.get("/", authMiddleware, getLogs);
router.put("/:id", authMiddleware, updateLog);
router.delete("/:id", authMiddleware, deleteLog);

export default router;
