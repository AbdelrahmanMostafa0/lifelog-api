import { z } from "zod";

const loginValidatorSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const registerValidatorSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters long")
    .max(100, "Name must be at most 100 characters long"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const googleValidatorSchema = z.object({
  access_token: z.string().min(1, "Token is required"),
});

export { loginValidatorSchema, registerValidatorSchema, googleValidatorSchema };
