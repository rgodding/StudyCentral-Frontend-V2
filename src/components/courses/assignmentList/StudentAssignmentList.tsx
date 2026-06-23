import { Stack } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { LuClipboardList } from "react-icons/lu";

import { EmptyState } from "@/components/feedback";
import { Section } from "@/components/layout";
import {
  StudyCollapse,
  StudyFilterToggleGroup,
  StudySegmentedControl,
} from "@/components/ui";

import type { StudentAssignmentDto, SubmissionStatus } from "@/types/api";
import {
  getStudentAssignmentGroups,
  getStudentAssignmentStatusMeta,
} from "@/utils/assignments";

import { AssignmentCard } from "./AssignmentCard";
import { AssignmentQuickReviewDialog } from "./AssignmentQuickReviewDialog";

type StudentAssignmentListProps = {
  assignments: StudentAssignmentDto[];
};

type AssignmentFilter = "active" | "completed";

type CompletedAssignmentFilter = Extract<
  SubmissionStatus,
  "Submitted" | "SubmittedLate" | "Passed" | "Failed"
>;

const studentAssignmentListText = {
  title: "Assignments",
  active: "Active",
  completed: "Completed",
  emptyTitle: "No active assignments",
  emptyDescription: "Active assignments for this course will appear here.",
  noCompletedTitle: "No completed assignments",
  noCompletedDescription: "Submitted assignments will appear here.",
  noFilteredCompletedTitle: "No matching assignments",
  noFilteredCompletedDescription:
    "No completed assignments match the selected filters.",
  groups: {
    overdue: "Overdue",
    upcoming: "Upcoming",
    noDeadline: "No deadline",
  },
  completedFilters: {
    passed: "Passed",
    failed: "Failed",
    submitted: "Submitted",
    submittedLate: "Late",
  },
};

export function StudentAssignmentList({
  assignments,
}: StudentAssignmentListProps) {
  const [filter, setFilter] = useState<AssignmentFilter>("active");
  const [completedFilters, setCompletedFilters] = useState<
    CompletedAssignmentFilter[]
  >([]);

  const [selectedAssignment, setSelectedAssignment] =
    useState<StudentAssignmentDto | null>(null);

  const groups = useMemo(
    () => getStudentAssignmentGroups(assignments),
    [assignments],
  );

  const completedAssignments =
    completedFilters.length === 0
      ? groups.completed
      : groups.completed.filter((assignment) =>
          completedFilters.includes(
            assignment.submissionStatus as CompletedAssignmentFilter,
          ),
        );

  const visibleAssignments =
    filter === "completed" ? completedAssignments : groups.active;

  const isCompletedFilter = filter === "completed";
  const hasActiveCompletedFilters = completedFilters.length > 0;

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
          controlSize="xs"
          items={[
            { value: "active", label: studentAssignmentListText.active },
            { value: "completed", label: studentAssignmentListText.completed },
          ]}
        />
      }
    >
      {isCompletedFilter && groups.completed.length > 0 && (
        <StudyFilterToggleGroup
          values={completedFilters}
          onValuesChange={(values) =>
            setCompletedFilters(values as CompletedAssignmentFilter[])
          }
          items={[
            {
              value: "Passed",
              label: studentAssignmentListText.completedFilters.passed,
            },
            {
              value: "Failed",
              label: studentAssignmentListText.completedFilters.failed,
            },
            {
              value: "Submitted",
              label: studentAssignmentListText.completedFilters.submitted,
            },
            {
              value: "SubmittedLate",
              label: studentAssignmentListText.completedFilters.submittedLate,
            },
          ]}
        />
      )}

      {visibleAssignments.length === 0 ? (
        <EmptyState
          size="sm"
          flex="1"
          icon={<LuClipboardList />}
          title={
            isCompletedFilter && hasActiveCompletedFilters
              ? studentAssignmentListText.noFilteredCompletedTitle
              : isCompletedFilter
                ? studentAssignmentListText.noCompletedTitle
                : studentAssignmentListText.emptyTitle
          }
          description={
            isCompletedFilter && hasActiveCompletedFilters
              ? studentAssignmentListText.noFilteredCompletedDescription
              : isCompletedFilter
                ? studentAssignmentListText.noCompletedDescription
                : studentAssignmentListText.emptyDescription
          }
        />
      ) : isCompletedFilter ? (
        <Stack gap={3}>
          {completedAssignments.map((assignment) => (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
              statusMeta={getStudentAssignmentStatusMeta(assignment)}
              onClick={() => setSelectedAssignment(assignment)}
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
                    onClick={() => setSelectedAssignment(assignment)}
                  />
                ))}
              </Stack>
            </StudyCollapse>
          ))}
        </Stack>
      )}

      <AssignmentQuickReviewDialog
        assignment={selectedAssignment}
        open={selectedAssignment != null}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedAssignment(null);
          }
        }}
      />
    </Section>
  );
}