import { Stack } from "@chakra-ui/react";

import { StudyField, StudyInput } from "@/components/forms";
import { StudyButton } from "@/components/ui";
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
      <StudyField label="First name" errorText={errors.firstName} required>
        <StudyInput
          type="text"
          value={values.firstName}
          autoComplete="given-name"
          placeholder="Enter your first name"
          disabled={isSubmitting}
          onChange={(event) => updateField("firstName", event.target.value)}
        />
      </StudyField>

      <StudyField label="Last name" errorText={errors.lastName} required>
        <StudyInput
          type="text"
          value={values.lastName}
          autoComplete="family-name"
          placeholder="Enter your last name"
          disabled={isSubmitting}
          onChange={(event) => updateField("lastName", event.target.value)}
        />
      </StudyField>

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
          autoComplete="new-password"
          placeholder="Create a password"
          disabled={isSubmitting}
          onChange={(event) => updateField("password", event.target.value)}
        />
      </StudyField>

      <StudyField
        label="Confirm password"
        errorText={errors.confirmPassword}
        required
      >
        <StudyInput
          type="password"
          value={values.confirmPassword}
          autoComplete="new-password"
          placeholder="Repeat your password"
          disabled={isSubmitting}
          onChange={(event) =>
            updateField("confirmPassword", event.target.value)
          }
        />
      </StudyField>

      <StudyButton type="submit" width="full" loading={isSubmitting}>
        Create account
      </StudyButton>
    </Stack>
  );
}