import { z } from "zod";

export const registerSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required."),

  lastName: z
    .string()
    .min(1, "Last name is required."),

  email: z
    .string()
    .min(1, "Email is required.")
    .email("Enter a valid email address."),

  password: z
    .string()
    .min(1, "Password is required."),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;