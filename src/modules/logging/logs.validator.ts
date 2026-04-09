import { z } from "zod";

export const createLogValidatorSchema = z.object({
  title: z.string().optional(),
  content: z.string().min(1),
  tags: z.array(z.string()).optional(),
  mood: z.string().optional(),
});
