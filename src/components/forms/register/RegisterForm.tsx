import { useState, type SyntheticEvent } from "react";
import { z } from "zod";

import { getFirstFieldErrors } from "@/utils/forms/getFirstFieldErrors";
import { RegisterFormContent } from "./RegisterFormContent";
import {
  registerSubmitSchema,
  type RegisterFormValues,
  type RegisterSubmitValues,
} from "./registerSchema";

type RegisterFormErrors = Partial<Record<keyof RegisterFormValues, string>>;

type RegisterFormProps = {
  isSubmitting?: boolean;
  onSubmit: (values: RegisterSubmitValues) => Promise<void> | void;
};

const emptyRegisterValues: RegisterFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function getInitialRegisterValues(): RegisterFormValues {
  if (!import.meta.env.DEV) {
    return emptyRegisterValues;
  }

  return {
    firstName: "Demo",
    lastName: "Student",
    email: `demo.student.${Date.now()}@studycentral.dk`,
    password: "password",
    confirmPassword: "password",
  };
}

export function RegisterForm({
  isSubmitting = false,
  onSubmit,
}: RegisterFormProps) {
  const [values, setValues] = useState<RegisterFormValues>(
    getInitialRegisterValues(),
  );

  const [errors, setErrors] = useState<RegisterFormErrors>({});

  function updateField<TField extends keyof RegisterFormValues>(
    field: TField,
    value: RegisterFormValues[TField],
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

    const result = registerSubmitSchema.safeParse(values);

    if (!result.success) {
      setErrors(
        getFirstFieldErrors<RegisterFormValues>(
          z.flattenError(result.error).fieldErrors,
        ),
      );
      return;
    }

    setErrors({});
    await onSubmit(result.data);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <RegisterFormContent
        values={values}
        errors={errors}
        isSubmitting={isSubmitting}
        updateField={updateField}
      />
    </form>
  );
}
