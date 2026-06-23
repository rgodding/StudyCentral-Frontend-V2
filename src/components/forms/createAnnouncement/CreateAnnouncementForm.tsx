import { useState, type SyntheticEvent } from "react";
import { z } from "zod";

import { getFirstFieldErrors } from "@/utils/forms/getFirstFieldErrors";
import { CreateAnnouncementFormContent } from "./CreateAnnouncementFormContent";
import {
  createAnnouncementSchema,
  type CreateAnnouncementFormValues,
  type CreateAnnouncementSubmitValues,
} from "./createAnnouncementSchema";

type CreateAnnouncementFormErrors = Partial<
  Record<keyof CreateAnnouncementFormValues, string>
>;

type CreateAnnouncementFormProps = {
  courseId: string;
  isSubmitting?: boolean;
  onSubmit: (values: CreateAnnouncementSubmitValues) => Promise<void> | void;
};

export function CreateAnnouncementForm({
  courseId,
  isSubmitting = false,
  onSubmit,
}: CreateAnnouncementFormProps) {
  const [values, setValues] = useState<CreateAnnouncementFormValues>({
    name: "",
    content: "",
    courseId,
  });

  const [errors, setErrors] = useState<CreateAnnouncementFormErrors>({});

  function updateField<TField extends keyof CreateAnnouncementFormValues>(
    field: TField,
    value: CreateAnnouncementFormValues[TField],
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

    const result = createAnnouncementSchema.safeParse({
      ...values,
      courseId,
    });

    if (!result.success) {
      setErrors(
        getFirstFieldErrors<CreateAnnouncementFormValues>(
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
      <CreateAnnouncementFormContent
        values={values}
        errors={errors}
        isSubmitting={isSubmitting}
        updateField={updateField}
      />
    </form>
  );
}