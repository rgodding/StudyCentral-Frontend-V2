import { Stack } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { LuClipboardList } from "react-icons/lu";

import { EmptyState } from "@/components/feedback";
import { Section } from "@/components/layout";
import { StudyCollapse, StudySegmentedControl } from "@/components/ui";
import type { StudentAssignmentDto } from "@/types/api";
import {
  getStudentAssignmentGroups,
  getStudentAssignmentStatusMeta,
} from "@/utils/assignments";

import { AssignmentCard } from "./AssignmentCard";

type StudentAssignmentListProps = {
  assignments: StudentAssignmentDto[];
};

type AssignmentFilter = "active" | "completed";

const studentAssignmentListText = {
  title: "Assignments",
  active: "Active",
  completed: "Completed",
  emptyTitle: "No active assignments",
  emptyDescription: "Active assignments for this course will appear here.",
  noCompletedTitle: "No completed assignments",
  noCompletedDescription: "Submitted assignments will appear here.",
  groups: {
    overdue: "Overdue",
    upcoming: "Upcoming",
    noDeadline: "No deadline",
  },
};

export function StudentAssignmentList({
  assignments,
}: StudentAssignmentListProps) {
  const [filter, setFilter] = useState<AssignmentFilter>("active");

  const groups = useMemo(
    () => getStudentAssignmentGroups(assignments),
    [assignments],
  );

  const visibleAssignments =
    filter === "completed" ? groups.completed : groups.active;

  const isCompletedFilter = filter === "completed";

  const activeGroupSections = [
  {
    label: studentAssignmentListText.groups.overdue,
    assignments: groups.overdue,
    defaultOpen: false,
  },
  {
    label: studentAssignmentListText.groups.upcoming,
    assignments: groups.upcoming,
    defaultOpen: true,
  },
  {
    label: studentAssignmentListText.groups.noDeadline,
    assignments: groups.noDeadline,
    defaultOpen: false,
  },
];

  return (
    <Section
      title={studentAssignmentListText.title}
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
            { value: "active", label: studentAssignmentListText.active },
            { value: "completed", label: studentAssignmentListText.completed },
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
              ? studentAssignmentListText.noCompletedTitle
              : studentAssignmentListText.emptyTitle
          }
          description={
            isCompletedFilter
              ? studentAssignmentListText.noCompletedDescription
              : studentAssignmentListText.emptyDescription
          }
        />
      ) : isCompletedFilter ? (
        <Stack gap={3}>
          {groups.completed.map((assignment) => (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
              statusMeta={getStudentAssignmentStatusMeta(assignment)}
            />
          ))}
        </Stack>
      ) : (
        <Stack gap={4}>
          {activeGroupSections.map((group) => (
            <StudyCollapse
              key={group.label}
              label={group.label}
              count={group.assignments.length}
              defaultOpen={group.defaultOpen}
            >
              <Stack gap={3}>
                {group.assignments.map((assignment) => (
                  <AssignmentCard
                    key={assignment.id}
                    assignment={assignment}
                    statusMeta={getStudentAssignmentStatusMeta(assignment)}
                  />
                ))}
              </Stack>
            </StudyCollapse>
          ))}
        </Stack>
      )}
    </Section>
  );
}