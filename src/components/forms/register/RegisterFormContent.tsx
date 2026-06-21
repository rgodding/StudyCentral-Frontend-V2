import { Stack } from "@chakra-ui/react";

import { StudyField, StudyInput } from "@/components/forms";
import { StudyButton } from "@/components/ui";
import { authText } from "@/content";
import type { RegisterFormValues } from "./registerSchema";

type RegisterFormErrors = Partial<Record<keyof RegisterFormValues, string>>;

type RegisterFormContentProps = {
  values: RegisterFormValues;
  errors: RegisterFormErrors;
  isSubmitting: boolean;
  updateField: <TField extends keyof RegisterFormValues>(
    field: TField,
    value: RegisterFormValues[TField],
  ) => void;
};

export function RegisterFormContent({
  values,
  errors,
  isSubmitting,
  updateField,
}: RegisterFormContentProps) {
  return (
    <Stack gap={4}>
      <StudyField
        label={authText.register.fields.firstName.label}
        errorText={errors.firstName}
        required
      >
        <StudyInput
          type="text"
          value={values.firstName}
          autoComplete="given-name"
          placeholder={authText.register.fields.firstName.placeholder}
          disabled={isSubmitting}
          onChange={(event) => updateField("firstName", event.target.value)}
        />
      </StudyField>

      <StudyField
        label={authText.register.fields.lastName.label}
        errorText={errors.lastName}
        required
      >
        <StudyInput
          type="text"
          value={values.lastName}
          autoComplete="family-name"
          placeholder={authText.register.fields.lastName.placeholder}
          disabled={isSubmitting}
          onChange={(event) => updateField("lastName", event.target.value)}
        />
      </StudyField>

      <StudyField
        label={authText.register.fields.email.label}
        errorText={errors.email}
        required
      >
        <StudyInput
          type="email"
          value={values.email}
          autoComplete="email"
          placeholder={authText.register.fields.email.placeholder}
          disabled={isSubmitting}
          onChange={(event) => updateField("email", event.target.value)}
        />
      </StudyField>

      <StudyField
        label={authText.register.fields.password.label}
        errorText={errors.password}
        required
      >
        <StudyInput
          type="password"
          value={values.password}
          autoComplete="new-password"
          placeholder={authText.register.fields.password.placeholder}
          disabled={isSubmitting}
          onChange={(event) => updateField("password", event.target.value)}
        />
      </StudyField>

      <StudyField
        label={authText.register.fields.confirmPassword.label}
        errorText={errors.confirmPassword}
        required
      >
        <StudyInput
          type="password"
          value={values.confirmPassword}
          autoComplete="new-password"
          placeholder={authText.register.fields.confirmPassword.placeholder}
          disabled={isSubmitting}
          onChange={(event) =>
            updateField("confirmPassword", event.target.value)
          }
        />
      </StudyField>

      <StudyButton type="submit" width="full" loading={isSubmitting}>
        {authText.register.actions.submit}
      </StudyButton>
    </Stack>
  );
}