import type { StudyBadgeVariant } from "@/components/ui";
import type {  AssignmentDto } from "@/types/api";

export type TeacherAssignmentDisplayStatus =
  | "NoDeadline"
  | "Upcoming"
  | "PastDue";

type TeacherAssignmentStatusMeta = {
  label: string;
  badgeVariant: StudyBadgeVariant;
};

export const teacherAssignmentStatusMeta: Record<
  TeacherAssignmentDisplayStatus,
  TeacherAssignmentStatusMeta
> = {
  NoDeadline: {
    label: "No deadline",
    badgeVariant: "neutral",
  },
  Upcoming: {
    label: "Upcoming",
    badgeVariant: "info",
  },
  PastDue: {
    label: "Past due",
    badgeVariant: "warning",
  },
};

export function getTeacherAssignmentDisplayStatus(
  assignment: AssignmentDto,
): TeacherAssignmentDisplayStatus {
  if (!assignment.deadline) {
    return "NoDeadline";
  }

  return new Date(assignment.deadline) < new Date() ? "PastDue" : "Upcoming";
}

export function getTeacherAssignmentStatusMeta(assignment: AssignmentDto) {
  return teacherAssignmentStatusMeta[
    getTeacherAssignmentDisplayStatus(assignment)
  ];
}

export function isPastDueTeacherAssignment(assignment: AssignmentDto) {
  return getTeacherAssignmentDisplayStatus(assignment) === "PastDue";
}