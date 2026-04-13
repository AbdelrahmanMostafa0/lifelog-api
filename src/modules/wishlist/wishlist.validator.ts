import { z } from "zod";

export const createWishlistSchema = z.object({
  email: z.email(),
});
