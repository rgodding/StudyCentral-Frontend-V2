import type { StudentAssignmentDto } from "@/types/api";

import {
  getStudentAssignmentDisplayStatus,
  isCompletedAssignment,
} from "./studentAssignmentStatusUtils";

export type StudentAssignmentGroups = {
  active: StudentAssignmentDto[];
  completed: StudentAssignmentDto[];
  upcoming: StudentAssignmentDto[];
  noDeadline: StudentAssignmentDto[];
  overdue: StudentAssignmentDto[];
};

export function getStudentAssignmentGroups(
  assignments: StudentAssignmentDto[],
): StudentAssignmentGroups {
  const active = assignments.filter(
    (assignment) => !isCompletedAssignment(assignment),
  );

  const completed = assignments.filter(isCompletedAssignment);

  return {
    active,
    completed,
    upcoming: active.filter(
      (assignment) =>
        getStudentAssignmentDisplayStatus(assignment) === "Upcoming",
    ),
    noDeadline: active.filter(
      (assignment) =>
        getStudentAssignmentDisplayStatus(assignment) === "NoDeadline",
    ),
    overdue: active.filter(
      (assignment) =>
        getStudentAssignmentDisplayStatus(assignment) === "Overdue",
    ),
  };
}