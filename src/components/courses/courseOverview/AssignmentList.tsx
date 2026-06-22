import { HStack, Stack } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { LuClipboardList } from "react-icons/lu";

import { EmptyState } from "@/components/feedback";
import { Section } from "@/components/layout";
import {
  StudyBadge,
  StudyCard,
  StudyHeading,
  StudySegmentedControl,
  StudyText,
} from "@/components/ui";

import type { StudentAssignmentApiDto, SubmissionStatus } from "@/types/api";
import { getStudentAssignmentStatusMeta } from "@/utils/assignments/studentAssignmentStatusUtils";

type AssignmentListProps = {
  assignments: StudentAssignmentApiDto[];
};

type AssignmentFilter = "active" | "completed";

const assignmentListText = {
  title: "Assignments",
  active: "Active",
  completed: "Completed",
  emptyTitle: "No active assignments",
  emptyDescription: "Active assignments for this course will appear here.",
  noCompletedTitle: "No completed assignments",
  noCompletedDescription: "Submitted assignments will appear here.",
  badge: "Assignment",
  untitled: "Untitled assignment",
  due: "Due",
  noDeadline: "No deadline",
  statusLabels: {
    NotSubmitted: "Not submitted",
    Submitted: "Submitted",
    SubmittedLate: "Submitted late",
    Passed: "Passed",
    Failed: "Failed",
  } satisfies Record<SubmissionStatus, string>,
};

function formatAssignmentDeadline(deadline?: string | null) {
  if (!deadline) {
    return assignmentListText.noDeadline;
  }

  return `${assignmentListText.due} ${new Date(deadline).toLocaleDateString()}`;
}

function isCompletedAssignment(assignment: StudentAssignmentApiDto) {
  return assignment.submissionStatus !== "NotSubmitted";
}

function AssignmentCard({ assignment }: { assignment: StudentAssignmentApiDto }) {
  const statusMeta = getStudentAssignmentStatusMeta(assignment);

  return (
    <StudyCard>
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

        <HStack align="center" justify="space-between" gap={4}>
          <StudyText variant="subtle">
            {formatAssignmentDeadline(assignment.deadline)}
          </StudyText>

          <StudyBadge variant={statusMeta.badgeVariant} flexShrink={0}>
            {statusMeta.label}
          </StudyBadge>
        </HStack>
      </Stack>
    </StudyCard>
  );
}

export function AssignmentList({ assignments }: AssignmentListProps) {
  const [filter, setFilter] = useState<AssignmentFilter>("active");

  const activeAssignments = useMemo(
    () =>
      assignments.filter((assignment) => !isCompletedAssignment(assignment)),
    [assignments],
  );

  const completedAssignments = useMemo(
    () => assignments.filter(isCompletedAssignment),
    [assignments],
  );

  const visibleAssignments =
    filter === "completed" ? completedAssignments : activeAssignments;

  const isCompletedFilter = filter === "completed";

  return (
    <Section
      title={assignmentListText.title}
      headerIcon={<LuClipboardList />}
      actions={
        <StudySegmentedControl
          value={filter}
          onValueChange={(details) =>
            setFilter(details.value as AssignmentFilter)
          }
          controlVariant="subtle"
          controlSize="section"
          items={[
            { value: "active", label: assignmentListText.active },
            { value: "completed", label: assignmentListText.completed },
          ]}
        />
      }
    >
      {visibleAssignments.length === 0 ? (
        <EmptyState
          size="sm"
          flex="1"
          icon={<LuClipboardList />}
          title={
            isCompletedFilter
              ? assignmentListText.noCompletedTitle
              : assignmentListText.emptyTitle
          }
          description={
            isCompletedFilter
              ? assignmentListText.noCompletedDescription
              : assignmentListText.emptyDescription
          }
        />
      ) : (
        <Stack gap={3}>
          {visibleAssignments.map((assignment) => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))}
        </Stack>
      )}
    </Section>
  );
}
