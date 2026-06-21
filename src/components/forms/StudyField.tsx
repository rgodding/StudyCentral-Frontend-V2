import { Field, Stack, type StackProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

import { StudyText } from "@/components/ui/StudyText";

type StudyFieldProps = Omit<StackProps, "children"> & {
  label?: string;
  helperText?: string;
  errorText?: string;
  required?: boolean;
  children: ReactNode;
};

export function StudyField({
  label,
  helperText,
  errorText,
  required = false,
  children,
  ...props
}: StudyFieldProps) {
  const hasError = Boolean(errorText);

  return (
    <Field.Root invalid={hasError} required={required}>
      <Stack gap={1.5} w="full" {...props}>
        {label && (
          <Field.Label>
            <StudyText variant="label">
              {label}
              {required && (
                <StudyText as="span" color="dangerText" ml={1}>
                  *
                </StudyText>
              )}
            </StudyText>
          </Field.Label>
        )}

        {children}

        {helperText && !hasError && (
          <Field.HelperText>
            <StudyText variant="subtle">{helperText}</StudyText>
          </Field.HelperText>
        )}

        {hasError && (
          <Field.ErrorText>
            <StudyText variant="error">{errorText}</StudyText>
          </Field.ErrorText>
        )}
      </Stack>
    </Field.Root>
  );
}