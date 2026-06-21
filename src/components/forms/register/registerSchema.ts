import type { TFunction } from "i18next";
import { z } from "zod";

export function createRegisterSchema(t: TFunction) {
  return z.object({
    firstName: z.string().min(1, t("validation.auth.firstNameRequired")),

    lastName: z.string().min(1, t("validation.auth.lastNameRequired")),

    email: z
      .string()
      .min(1, t("validation.auth.emailRequired"))
      .pipe(z.email(t("validation.common.emailInvalid"))),

    password: z.string().min(1, t("validation.auth.passwordRequired")),

    confirmPassword: z
      .string()
      .min(1, t("validation.auth.confirmPasswordRequired")),
  });
}

export function createRegisterSubmitSchema(t: TFunction) {
  return createRegisterSchema(t)
    .refine((values) => values.password === values.confirmPassword, {
      path: ["confirmPassword"],
      message: t("validation.auth.passwordsDoNotMatch"),
    })
    .transform((values) => ({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
    }));
}

export type RegisterFormValues = z.input<ReturnType<typeof createRegisterSchema>>;

export type RegisterSubmitValues = z.output<
  ReturnType<typeof createRegisterSubmitSchema>
>;