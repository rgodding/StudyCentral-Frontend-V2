import { Field, Stack, type StackProps } from "@chakra-ui/react";
import type { ComponentProps, ReactNode } from "react";

import { StudyText } from "@/components/ui/StudyText";

type FieldRootProps = ComponentProps<typeof Field.Root>;

export type StudyFieldProps = Omit<StackProps, "children"> & {
  label?: ReactNode;
  helperText?: ReactNode;
  errorText?: ReactNode;
  required?: boolean;
  rootProps?: Omit<FieldRootProps, "children" | "invalid" | "required">;
  children: ReactNode;
};

export function StudyField({
  label,
  helperText,
  errorText,
  required = false,
  rootProps,
  children,
  ...props
}: StudyFieldProps) {
  const hasError = Boolean(errorText);

  return (
    <Field.Root invalid={hasError} required={required} {...rootProps}>
      <Stack gap={1.5} w="full" {...props}>
        {label && (
          <Field.Label>
            <StudyText variant="label">
              {label}

              {required && (
                <Field.RequiredIndicator
                  color="dangerText"
                  ml={1}
                  fallback={null}
                />
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
            <StudyText variant="error" size="xs">
              {errorText}
            </StudyText>
          </Field.ErrorText>
        )}
      </Stack>
    </Field.Root>
  );
}
