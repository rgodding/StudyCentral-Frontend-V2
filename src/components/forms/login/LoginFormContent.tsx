import { Stack } from "@chakra-ui/react";

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
  return (
    <Stack gap={4}>
      <StudyField label="Email" errorText={errors.email} required>
        <StudyInput
          type="email"
          value={values.email}
          autoComplete="email"
          placeholder="name@example.com"
          disabled={isSubmitting}
          onChange={(event) => updateField("email", event.target.value)}
        />
      </StudyField>

      <StudyField label="Password" errorText={errors.password} required>
        <StudyInput
          type="password"
          value={values.password}
          autoComplete="current-password"
          placeholder="Enter your password"
          disabled={isSubmitting}
          onChange={(event) => updateField("password", event.target.value)}
        />
      </StudyField>

      <StudyButton type="submit" width="full" loading={isSubmitting}>
        Sign in
      </StudyButton>
    </Stack>
  );
}