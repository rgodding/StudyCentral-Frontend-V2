import { Stack } from "@chakra-ui/react";

import { StudyField, StudyInput, StudyTextarea } from "@/components/forms";
import { StudyButton, StudyDivider, StudyText } from "@/components/ui";
import type { CreateAssignmentFormData  } from "./createAssignmentSchema";

type CreateAssignmentFormErrors = Partial<
  Record<keyof CreateAssignmentFormData, string>
>;

type CreateAssignmentFormContentProps = {
  values: CreateAssignmentFormData;
  errors: CreateAssignmentFormErrors;
  isSubmitting: boolean;
  updateField: <TField extends keyof CreateAssignmentFormData>(
    field: TField,
    value: CreateAssignmentFormData[TField],
  ) => void;
};

const createAssignmentFormText = {
  sectionLabel: "Assignment details",
  nameLabel: "Title",
  namePlaceholder: "Enter assignment title",
  descriptionLabel: "Description",
  descriptionPlaceholder: "Write the assignment description",
  deadlineLabel: "Deadline",
  deadlineHelper: "Leave empty if the assignment has no deadline.",
  submitLabel: "Create assignment",
};

export function CreateAssignmentFormContent({
  values,
  errors,
  isSubmitting,
  updateField,
}: CreateAssignmentFormContentProps) {
  return (
    <Stack gap={5}>
      <Stack gap={3}>
        <StudyText variant="label" size="sm" color="textSubtle">
          {createAssignmentFormText.sectionLabel}
        </StudyText>

        <StudyField
          label={createAssignmentFormText.nameLabel}
          errorText={errors.name}
          required
        >
          <StudyInput
            value={values.name}
            maxLength={100}
            placeholder={createAssignmentFormText.namePlaceholder}
            disabled={isSubmitting}
            onChange={(event) => updateField("name", event.target.value)}
          />
        </StudyField>

        <StudyField
          label={createAssignmentFormText.descriptionLabel}
          errorText={errors.description}
        >
          <StudyTextarea
            value={values.description}
            maxLength={2000}
            minH="140px"
            placeholder={createAssignmentFormText.descriptionPlaceholder}
            disabled={isSubmitting}
            onChange={(event) => updateField("description", event.target.value)}
          />
        </StudyField>

        <StudyField
          label={createAssignmentFormText.deadlineLabel}
          helperText={createAssignmentFormText.deadlineHelper}
          errorText={errors.deadline}
        >
          <StudyInput
            type="datetime-local"
            value={values.deadline}
            disabled={isSubmitting}
            onChange={(event) => updateField("deadline", event.target.value)}
          />
        </StudyField>
      </Stack>

      <StudyDivider />

      <StudyButton type="submit" loading={isSubmitting} alignSelf="end">
        {createAssignmentFormText.submitLabel}
      </StudyButton>
    </Stack>
  );
}
