import { z } from "zod";

import { validationText } from "@/content";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, validationText.auth.emailRequired)
    .pipe(z.email(validationText.common.emailInvalid)),

  password: z.string().min(1, validationText.auth.passwordRequired),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
