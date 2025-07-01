import { z } from "zod";

export const SignUpSchema = z.object({
  firstName: z
    .string()
    .max(50, { message: "First name must be less than 50 characters" })
    .min(2, { message: "First name must be at least 2 characters" }),
  lastName: z
    .string()
    .max(50, { message: "Last name must be less than 50 characters" })
    .min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
      message:
        "Password must include uppercase, lowercase, number, and special character (min 8 characters)",
    }),
});

export const SignInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
      message:
        "Password must include uppercase, lowercase, number, and special character (min 8 characters)",
    }),
});
