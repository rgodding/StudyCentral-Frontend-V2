import { HStack, Stack } from "@chakra-ui/react";

import {
  StudyButton,
  StudyDialog,
  StudyDialogRoot,
  StudyText,
} from "@/components/ui";
import type { Guid } from "@/types/api";

type CreateAnnouncementDialogProps = {
  courseId: Guid;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const createAnnouncementDialogText = {
  title: "Create announcement",
  description: "Create a new announcement for this course.",
  placeholder: "Announcement form will go here.",
  courseIdLabel: "Course ID",
  cancelLabel: "Cancel",
  createLabel: "Create announcement",
};

export function CreateAnnouncementDialog({
  courseId,
  open,
  onOpenChange,
}: CreateAnnouncementDialogProps) {
  return (
    <StudyDialogRoot
      open={open}
      onOpenChange={(details) => onOpenChange(details.open)}
    >
      <StudyDialog
        title={createAnnouncementDialogText.title}
        description={createAnnouncementDialogText.description}
        size="md"
        headerSeparator="belowTitle"
        footer={
          <HStack justify="end" w="full" gap={3}>
            <StudyButton
              variant="secondary"
              size="sm"
              onClick={() => onOpenChange(false)}
            >
              {createAnnouncementDialogText.cancelLabel}
            </StudyButton>

            <StudyButton size="sm">
              {createAnnouncementDialogText.createLabel}
            </StudyButton>
          </HStack>
        }
      >
        <Stack gap={3}>
          <StudyText variant="subtle" fontSize="sm">
            {createAnnouncementDialogText.courseIdLabel}: {courseId}
          </StudyText>

          <StudyText variant="muted">
            {createAnnouncementDialogText.placeholder}
          </StudyText>
        </Stack>
      </StudyDialog>
    </StudyDialogRoot>
  );
}