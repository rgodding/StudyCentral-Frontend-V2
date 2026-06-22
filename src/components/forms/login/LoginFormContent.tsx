import { Stack } from "@chakra-ui/react";

import { StudyField, StudyInput } from "@/components/forms";
import {
  StudyButton,
  StudyCard,
  StudyDivider,
  StudyHeading,
  StudyText,
} from "@/components/ui";
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
    <Stack gap={5} w="full">
      <Stack gap={1} textAlign="center">
        <StudyHeading variant="section">StudyCentral</StudyHeading>

        <StudyText variant="muted" size="sm">
          Sign in to access your courses and study material.
        </StudyText>
      </Stack>

      <StudyCard variant="default" size="lg">
        <Stack gap={5}>
          <Stack gap={1} textAlign="center">
            <StudyHeading variant="card">Login form</StudyHeading>

            <StudyText variant="subtle" size="sm">
              Enter your login credentials.
            </StudyText>
          </Stack>

          <StudyDivider />

          <Stack gap={3}>
            <StudyText variant="label" size="sm" color="textSubtle">
              Credentials
            </StudyText>

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
                onChange={(event) =>
                  updateField("password", event.target.value)
                }
              />
            </StudyField>
          </Stack>

          <StudyButton type="submit" width="full" loading={isSubmitting}>
            Sign in
          </StudyButton>
        </Stack>
      </StudyCard>
    </Stack>
  );
}