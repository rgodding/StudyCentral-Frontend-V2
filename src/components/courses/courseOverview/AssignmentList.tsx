import { HStack, Stack, Tabs } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { LuClipboardList } from "react-icons/lu";

import { EmptyState } from "@/components/feedback";
import { Section } from "@/components/layout";
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

type AssignmentFilter = "active" | "completed";

const assignmentListText = {
  title: "Assignments",
  active: "Active",
  completed: "Completed",
  emptyTitle: "No assignments yet",
  emptyDescription: "Assignments for this course will appear here.",
  noCompletedTitle: "No completed assignments",
  noCompletedDescription: "Completed assignments will appear here.",
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

function AssignmentCard({ assignment }: { assignment: AssignmentDto }) {
  return (
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
  );
}

export function AssignmentList({ assignments }: AssignmentListProps) {
  const [filter, setFilter] = useState<AssignmentFilter>("active");

  const visibleAssignments = useMemo(() => {
    if (filter === "completed") {
      return [];
    }

    return assignments;
  }, [assignments, filter]);

  const isCompletedFilter = filter === "completed";

  return (
    <Section
      title={assignmentListText.title}
      headerIcon={<LuClipboardList />}
      actions={
        <Tabs.Root
          value={filter}
          onValueChange={(details) =>
            setFilter(details.value as AssignmentFilter)
          }
        >
          <Tabs.List
            bg="panelBgSubtle"
            borderWidth="1px"
            borderColor="borderSubtle"
            rounded="button"
            p={1}
          >
            <Tabs.Trigger
              value="active"
              px={3}
              py={1.5}
              rounded="button"
              fontSize="sm"
              fontWeight="semibold"
              color={filter === "active" ? "textMain" : "textMuted"}
              _selected={{
                bg: "surfaceBg",
                color: "accent",
                shadow: "card",
              }}
            >
              {assignmentListText.active}
            </Tabs.Trigger>

            <Tabs.Trigger
              value="completed"
              px={3}
              py={1.5}
              rounded="button"
              fontSize="sm"
              fontWeight="semibold"
              color={filter === "completed" ? "textMain" : "textMuted"}
              _selected={{
                bg: "surfaceBg",
                color: "accent",
                shadow: "card",
              }}
            >
              {assignmentListText.completed}
            </Tabs.Trigger>
          </Tabs.List>
        </Tabs.Root>
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
