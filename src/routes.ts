import express from "express";
import authRoutes from "./modules/auth/auth.route";
import logsRoutes from "./modules/logging/logs.route";
import userRoutes from "./modules/user/user.route";
import wishlistRoutes from "./modules/wishlist/wishlist.route";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/logs", logsRoutes);
router.use("/wishlist", wishlistRoutes);

export default router;
