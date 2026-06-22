import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required."),

  lastName: z.string().min(1, "Last name is required."),

  email: z
    .string()
    .min(1, "Email is required.")
    .pipe(z.email("Enter a valid email address.")),

  password: z
    .string()
    .min(1, "Password is required.")
    .min(6, "Password must be at least 6 characters."),

  confirmPassword: z
    .string()
    .min(1, "Confirm password is required.")
    .min(6, "Confirm password must be at least 6 characters."),
});

export const registerSubmitSchema = registerSchema
  .refine((values) => values.password === values.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  })
  .transform((values) => ({
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    password: values.password,
  }));

export type RegisterFormValues = z.input<typeof registerSchema>;
export type RegisterSubmitValues = z.output<typeof registerSubmitSchema>;