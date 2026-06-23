import { HStack, Stack } from "@chakra-ui/react";

import {
  StudyButton,
  StudyDialog,
  StudyDialogRoot,
  StudyText,
} from "@/components/ui";
import type { Guid } from "@/types/api";

type CreateAssignmentDialogProps = {
  courseId: Guid;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const createAssignmentDialogText = {
  title: "Create assignment",
  description: "Create a new assignment for this course.",
  placeholder: "Assignment form will go here.",
  courseIdLabel: "Course ID",
  cancelLabel: "Cancel",
  createLabel: "Create assignment",
};

export function CreateAssignmentDialog({
  courseId,
  open,
  onOpenChange,
}: CreateAssignmentDialogProps) {
  return (
    <StudyDialogRoot
      open={open}
      onOpenChange={(details) => onOpenChange(details.open)}
    >
      <StudyDialog
        title={createAssignmentDialogText.title}
        description={createAssignmentDialogText.description}
        size="md"
        headerSeparator="belowTitle"
        footer={
          <HStack justify="end" w="full" gap={3}>
            <StudyButton
              variant="secondary"
              size="sm"
              onClick={() => onOpenChange(false)}
            >
              {createAssignmentDialogText.cancelLabel}
            </StudyButton>

            <StudyButton size="sm">
              {createAssignmentDialogText.createLabel}
            </StudyButton>
          </HStack>
        }
      >
        <Stack gap={3}>
          <StudyText variant="subtle" fontSize="sm">
            {createAssignmentDialogText.courseIdLabel}: {courseId}
          </StudyText>

          <StudyText variant="muted">
            {createAssignmentDialogText.placeholder}
          </StudyText>
        </Stack>
      </StudyDialog>
    </StudyDialogRoot>
  );
}