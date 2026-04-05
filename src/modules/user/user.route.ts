import { Router } from "express";
import * as userController from "./user.controller";

const router = Router();

router.get("/", userController.getUsers);

export default router;
