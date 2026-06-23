import { HStack, Stack } from "@chakra-ui/react";
import { LuCalendarClock, LuExternalLink, LuFileText } from "react-icons/lu";
import { Link as RouterLink } from "react-router-dom";

import { routePaths } from "@/app/routes/routes";
import {
    StudyButton,
    StudyDialog,
    StudyDialogRoot,
    StudyText
} from "@/components/ui";
import type { AssignmentDto } from "@/types/api";
import { formatAssignmentDeadline } from "@/utils/assignments";

type AssignmentQuickReviewDialogProps = {
  assignment: AssignmentDto | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const assignmentQuickReviewDialogText = {
  titleFallback: "Untitled assignment",
  deadline: "Deadline",
  noDescription: "No description has been added for this assignment.",
  files: "Files",
  fileCount: (count: number) => `${count} ${count === 1 ? "file" : "files"}`,
  openFullAssignment: "Open full assignment",
};

export function AssignmentQuickReviewDialog({
  assignment,
  open,
  onOpenChange,
}: AssignmentQuickReviewDialogProps) {
  if (!assignment) {
    return null;
  }

return (
  <StudyDialogRoot
    open={open}
    onOpenChange={(details) => onOpenChange(details.open)}
  >
    <StudyDialog
      headerSeparator="belowTitle"
      title={
        assignment.name?.trim() || assignmentQuickReviewDialogText.titleFallback
      }
      size="md"
    >
      <Stack gap={5}>
        <Stack gap={2}>
          <StudyText variant="muted">
            {assignment.description?.trim() ||
              assignmentQuickReviewDialogText.noDescription}
          </StudyText>
        </Stack>

        <Stack gap={3}>
          <HStack justify="space-between" gap={4}>
            <HStack gap={2} color="textSubtle">
              <LuCalendarClock />
              <StudyText variant="subtle">
                {assignmentQuickReviewDialogText.deadline}
              </StudyText>
            </HStack>

            <StudyText fontWeight="semibold">
              {formatAssignmentDeadline(assignment.deadline)}
            </StudyText>
          </HStack>

          <HStack justify="space-between" gap={4}>
            <HStack gap={2} color="textSubtle">
              <LuFileText />
              <StudyText variant="subtle">
                {assignmentQuickReviewDialogText.files}
              </StudyText>
            </HStack>

            <StudyText fontWeight="semibold">
              {assignmentQuickReviewDialogText.fileCount(assignment.fileCount)}
            </StudyText>
          </HStack>
        </Stack>

        <StudyButton asChild variant="primary" alignSelf="end">
          <RouterLink
            to={routePaths.assignmentDetails(
              assignment.courseId,
              assignment.id,
            )}
          >
            <HStack gap={2}>
              {assignmentQuickReviewDialogText.openFullAssignment}
              <LuExternalLink />
            </HStack>
          </RouterLink>
        </StudyButton>
      </Stack>
    </StudyDialog>
  </StudyDialogRoot>
);
}
