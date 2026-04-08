import { Router } from "express";
import * as userController from "./user.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/", authMiddleware, userController.getUser);

export default router;
