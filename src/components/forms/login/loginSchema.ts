import type { TFunction } from "i18next";
import { z } from "zod";

export function createLoginSchema(t: TFunction) {
  return z.object({
    email: z
      .string()
      .min(1, t("validation.auth.emailRequired"))
      .pipe(z.email(t("validation.common.emailInvalid"))),

    password: z.string().min(1, t("validation.auth.passwordRequired")),
  });
}

export type LoginFormValues = z.infer<ReturnType<typeof createLoginSchema>>;