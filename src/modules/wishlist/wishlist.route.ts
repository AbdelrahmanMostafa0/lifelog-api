import { Router } from "express";
import { joinWishlist } from "./wishlist.controller";
import { validate } from "../../middlewares/validation.middleware";
import { createWishlistSchema } from "./wishlist.validator";

const router = Router();

router.post("/", validate({ body: createWishlistSchema }), joinWishlist);

export default router;
