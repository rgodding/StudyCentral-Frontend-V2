import { HStack, Stack } from "@chakra-ui/react";
import { LuClipboardList } from "react-icons/lu";

import { EmptyState } from "@/components/feedback";
import {
  StudyBadge,
  StudyCard,
  StudyHeading,
  StudyText,
} from "@/components/ui";
import type { AssignmentDto } from "@/types/api";

type AssignmentListProps = {
  assignments: AssignmentDto[];
};

const assignmentListText = {
  emptyTitle: "No assignments yet",
  emptyDescription: "Assignments for this course will appear here.",
  badge: "Assignment",
  untitled: "Untitled assignment",
  due: "Due",
  noDeadline: "No deadline",
};

function formatAssignmentDeadline(deadline?: string | null) {
  if (!deadline) {
    return assignmentListText.noDeadline;
  }

  return `${assignmentListText.due} ${new Date(deadline).toLocaleDateString()}`;
}

export function AssignmentList({ assignments }: AssignmentListProps) {
  if (assignments.length === 0) {
    return (
      <EmptyState
        size="sm"
        flex="1"
        icon={<LuClipboardList />}
        title={assignmentListText.emptyTitle}
        description={assignmentListText.emptyDescription}
      />
    );
  }

  return (
    <Stack gap={3}>
      {assignments.map((assignment) => (
        <StudyCard key={assignment.id}>
          <Stack gap={2}>
            <HStack justify="space-between" align="start" gap={3}>
              <StudyHeading variant="card" lineClamp={2}>
                {assignment.name?.trim() || assignmentListText.untitled}
              </StudyHeading>

              <StudyBadge variant="accent" flexShrink={0}>
                {assignmentListText.badge}
              </StudyBadge>
            </HStack>

            {assignment.description && (
              <StudyText variant="muted" lineClamp={2}>
                {assignment.description}
              </StudyText>
            )}

            <StudyText variant="subtle">
              {formatAssignmentDeadline(assignment.deadline)}
            </StudyText>
          </Stack>
        </StudyCard>
      ))}
    </Stack>
  );
}