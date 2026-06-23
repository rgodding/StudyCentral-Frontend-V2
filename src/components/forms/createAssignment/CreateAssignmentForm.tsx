import { useState, type SyntheticEvent } from "react";
import { z } from "zod";

import { getFirstFieldErrors } from "@/utils/forms/getFirstFieldErrors";
import { CreateAssignmentFormContent } from "./CreateAssignmentFormContent";
import {
  createAssignmentSubmitSchema,
  type CreateAssignmentFormValues,
  type CreateAssignmentSubmitValues,
} from "./createAssignmentSchema";

type CreateAssignmentFormErrors = Partial<
  Record<keyof CreateAssignmentFormValues, string>
>;

type CreateAssignmentFormProps = {
  courseId: string;
  isSubmitting?: boolean;
  onSubmit: (values: CreateAssignmentSubmitValues) => Promise<void> | void;
};

export function CreateAssignmentForm({
  courseId,
  isSubmitting = false,
  onSubmit,
}: CreateAssignmentFormProps) {
  const [values, setValues] = useState<CreateAssignmentFormValues>({
    name: "",
    description: "",
    deadline: "",
    courseId,
  });

  const [errors, setErrors] = useState<CreateAssignmentFormErrors>({});

  function updateField<TField extends keyof CreateAssignmentFormValues>(
    field: TField,
    value: CreateAssignmentFormValues[TField],
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

    const result = createAssignmentSubmitSchema.safeParse({
      ...values,
      courseId,
    });

    if (!result.success) {
      setErrors(
        getFirstFieldErrors<CreateAssignmentFormValues>(
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
      <CreateAssignmentFormContent
        values={values}
        errors={errors}
        isSubmitting={isSubmitting}
        updateField={updateField}
      />
    </form>
  );
}