import { Router } from "express";
import * as authController from "./auth.controller";
import { validate } from "../../middlewares/validation.middleware";
import {
  googleValidatorSchema,
  loginValidatorSchema,
  registerValidatorSchema,
} from "./auth.validator";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.post(
  "/login",
  validate({ body: loginValidatorSchema }),
  authController.login,
);
router.post(
  "/register",
  validate({ body: registerValidatorSchema }),
  authController.register,
);
router.post(
  "/google",
  validate({ body: googleValidatorSchema }),
  authController.google,
);
router.post("/logout", authMiddleware, authController.logout);
export default router;
