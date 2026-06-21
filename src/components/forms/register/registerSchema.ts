import { z } from "zod";

import { validationText } from "@/content";

export const registerSchema = z.object({
  firstName: z.string().min(1, validationText.auth.firstNameRequired),
  lastName: z.string().min(1, validationText.auth.lastNameRequired),

  email: z
    .string()
    .min(1, validationText.auth.emailRequired)
    .pipe(z.email(validationText.common.emailInvalid)),

  password: z.string().min(1, validationText.auth.passwordRequired),

  confirmPassword: z
    .string()
    .min(1, validationText.auth.confirmPasswordRequired),
});

export const registerSubmitSchema = registerSchema
  .refine((values) => values.password === values.confirmPassword, {
    path: ["confirmPassword"],
    message: validationText.auth.passwordsDoNotMatch,
  })
  .omit({ confirmPassword: true });

export type RegisterFormValues = z.input<typeof registerSchema>;
export type RegisterSubmitValues = z.output<typeof registerSubmitSchema>;