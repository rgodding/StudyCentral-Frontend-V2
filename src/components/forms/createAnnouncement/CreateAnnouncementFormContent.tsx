import { Stack } from "@chakra-ui/react";

import { StudyField, StudyInput, StudyTextarea } from "@/components/forms";
import { StudyButton, StudyDivider, StudyText } from "@/components/ui";
import type { CreateAnnouncementFormData } from "./createAnnouncementSchema";

type CreateAnnouncementFormErrors = Partial<
  Record<keyof CreateAnnouncementFormData, string>
>;

type CreateAnnouncementFormContentProps = {
  values: CreateAnnouncementFormData;
  errors: CreateAnnouncementFormErrors;
  isSubmitting: boolean;
  updateField: <TField extends keyof CreateAnnouncementFormData>(
    field: TField,
    value: CreateAnnouncementFormData[TField],
  ) => void;
};

const createAnnouncementFormText = {
  sectionLabel: "Announcement details",
  nameLabel: "Title",
  namePlaceholder: "Enter announcement title",
  contentLabel: "Content",
  contentPlaceholder: "Write the announcement content",
  submitLabel: "Create announcement",
};

export function CreateAnnouncementFormContent({
  values,
  errors,
  isSubmitting,
  updateField,
}: CreateAnnouncementFormContentProps) {
  return (
    <Stack gap={5}>
      <Stack gap={3}>
        <StudyText variant="label" size="sm" color="textSubtle">
          {createAnnouncementFormText.sectionLabel}
        </StudyText>

        <StudyField label={createAnnouncementFormText.nameLabel} errorText={errors.name} required>
          <StudyInput
            value={values.name}
            maxLength={100}
            placeholder={createAnnouncementFormText.namePlaceholder}
            disabled={isSubmitting}
            onChange={(event) => updateField("name", event.target.value)}
          />
        </StudyField>

        <StudyField
          label={createAnnouncementFormText.contentLabel}
          errorText={errors.content}
          required
        >
          <StudyTextarea
            value={values.content}
            maxLength={5000}
            minH="180px"
            placeholder={createAnnouncementFormText.contentPlaceholder}
            disabled={isSubmitting}
            onChange={(event) => updateField("content", event.target.value)}
          />
        </StudyField>
      </Stack>

      <StudyDivider />

      <StudyButton type="submit" width="full" loading={isSubmitting}>
        {createAnnouncementFormText.submitLabel}
      </StudyButton>
    </Stack>
  );
}