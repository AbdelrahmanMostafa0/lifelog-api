import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();
router.post("/", authMiddleware);
router.get("/", authMiddleware);
router.put("/:id", authMiddleware);
router.delete("/:id", authMiddleware);

export default router;
