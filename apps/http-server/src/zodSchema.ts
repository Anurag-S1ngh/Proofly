import { z } from "zod";

export const SignUpSchema = z.object({
  firstName: z.string().max(50).min(2),
  lastName: z.string().max(50).min(2),
  email: z.string().email(),
  password: z
    .string()
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
});

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
});
