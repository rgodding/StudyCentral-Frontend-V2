import { Stack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { StudyField, StudyInput } from "@/components/forms";
import { StudyButton } from "@/components/ui";
import type { LoginFormValues } from "./loginSchema";

type LoginFormErrors = Partial<Record<keyof LoginFormValues, string>>;

type LoginFormContentProps = {
  values: LoginFormValues;
  errors: LoginFormErrors;
  isSubmitting: boolean;
  updateField: <TField extends keyof LoginFormValues>(
    field: TField,
    value: LoginFormValues[TField],
  ) => void;
};

export function LoginFormContent({
  values,
  errors,
  isSubmitting,
  updateField,
}: LoginFormContentProps) {
  const { t } = useTranslation();

  return (
    <Stack gap={4}>
      <StudyField
        label={t("auth.login.fields.email.label")}
        errorText={errors.email}
        required
      >
        <StudyInput
          type="email"
          value={values.email}
          autoComplete="email"
          placeholder={t("auth.login.fields.email.placeholder")}
          disabled={isSubmitting}
          onChange={(event) => updateField("email", event.target.value)}
        />
      </StudyField>

      <StudyField
        label={t("auth.login.fields.password.label")}
        errorText={errors.password}
        required
      >
        <StudyInput
          type="password"
          value={values.password}
          autoComplete="current-password"
          placeholder={t("auth.login.fields.password.placeholder")}
          disabled={isSubmitting}
          onChange={(event) => updateField("password", event.target.value)}
        />
      </StudyField>

      <StudyButton type="submit" width="full" loading={isSubmitting}>
        {t("auth.login.actions.submit")}
      </StudyButton>
    </Stack>
  );
}