import { Stack } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { LuClipboardList } from "react-icons/lu";

import { EmptyState } from "@/components/feedback";
import { StudyCollapse } from "@/components/ui";
import type { AssignmentDto } from "@/types/api";
import {
  getTeacherAssignmentGroups,
  getTeacherAssignmentStatusMeta,
} from "@/utils/assignments";

import { AssignmentCard } from "./AssignmentCard";
import { AssignmentQuickReviewDialog } from "./AssignmentQuickReviewDialog";

type TeacherAssignmentListProps = {
  assignments: AssignmentDto[];
};

const teacherAssignmentListText = {
  emptyTitle: "No assignments yet",
  emptyDescription: "Assignments for this course will appear here.",
  groups: {
    pastDue: "Past due",
    upcoming: "Upcoming",
    noDeadline: "No deadline",
  },
};

export function TeacherAssignmentList({
  assignments,
}: TeacherAssignmentListProps) {
  const [selectedAssignment, setSelectedAssignment] =
    useState<AssignmentDto | null>(null);

  const groups = useMemo(
    () => getTeacherAssignmentGroups(assignments),
    [assignments],
  );

  const groupSections = [
    {
      label: teacherAssignmentListText.groups.pastDue,
      assignments: groups.pastDue,
      defaultOpen: groups.pastDue.length > 0,
    },
    {
      label: teacherAssignmentListText.groups.upcoming,
      assignments: groups.upcoming,
      defaultOpen: groups.pastDue.length === 0,
    },
    {
      label: teacherAssignmentListText.groups.noDeadline,
      assignments: groups.noDeadline,
      defaultOpen: false,
    },
  ];

  if (assignments.length === 0) {
    return (
      <EmptyState
        size="sm"
        flex="1"
        icon={<LuClipboardList />}
        title={teacherAssignmentListText.emptyTitle}
        description={teacherAssignmentListText.emptyDescription}
      />
    );
  }

  return (
    <>
      <Stack gap={4}>
        {groupSections.map((group) => (
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
                  statusMeta={getTeacherAssignmentStatusMeta(assignment)}
                  onClick={() => setSelectedAssignment(assignment)}
                />
              ))}
            </Stack>
          </StudyCollapse>
        ))}
      </Stack>

      <AssignmentQuickReviewDialog
        assignment={selectedAssignment}
        open={selectedAssignment != null}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedAssignment(null);
          }
        }}
      />
    </>
  );
}
