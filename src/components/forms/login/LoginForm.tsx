import { useState, type SyntheticEvent } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import { getFirstFieldErrors } from "@/utils/forms/getFirstFieldErrors";
import { LoginFormContent } from "./LoginFormContent";
import { createLoginSchema, type LoginFormValues } from "./loginSchema";

type LoginFormErrors = Partial<Record<keyof LoginFormValues, string>>;

type LoginFormProps = {
  isSubmitting?: boolean;
  onSubmit: (values: LoginFormValues) => Promise<void> | void;
};

export function LoginForm({ isSubmitting = false, onSubmit }: LoginFormProps) {
  const { t } = useTranslation();

  const [values, setValues] = useState<LoginFormValues>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<LoginFormErrors>({});

  function updateField<TField extends keyof LoginFormValues>(
    field: TField,
    value: LoginFormValues[TField],
  ) {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: undefined,
    }));
  }

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = createLoginSchema(t).safeParse(values);

    if (!result.success) {
      setErrors(
        getFirstFieldErrors<LoginFormValues>(
          z.flattenError(result.error).fieldErrors,
        ),
      );
      return;
    }

    setErrors({});
    await onSubmit(result.data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <LoginFormContent
        values={values}
        errors={errors}
        isSubmitting={isSubmitting}
        updateField={updateField}
      />
    </form>
  );
}