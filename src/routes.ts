import express from "express";
import authRoutes from "./modules/auth/auth.route";
import logsRoutes from "./modules/logging/logs.route";
import userRoutes from "./modules/user/user.route";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/logs", logsRoutes);

export default router;
