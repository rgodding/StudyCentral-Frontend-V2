import type { AssignmentDto } from "@/types/api";

import { getTeacherAssignmentDisplayStatus } from "./teacherAssignmentUtils";

export type TeacherAssignmentGroups = {
  upcoming: AssignmentDto[];
  noDeadline: AssignmentDto[];
  pastDue: AssignmentDto[];
};

export function getTeacherAssignmentGroups(
  assignments: AssignmentDto[],
): TeacherAssignmentGroups {
  return {
    pastDue: assignments.filter(
      (assignment) => getTeacherAssignmentDisplayStatus(assignment) === "PastDue",
    ),
    upcoming: assignments.filter(
      (assignment) => getTeacherAssignmentDisplayStatus(assignment) === "Upcoming",
    ),
    noDeadline: assignments.filter(
      (assignment) =>
        getTeacherAssignmentDisplayStatus(assignment) === "NoDeadline",
    ),
  };
}