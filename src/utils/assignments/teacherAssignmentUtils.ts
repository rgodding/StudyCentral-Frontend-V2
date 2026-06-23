import type { StudyBadgeVariant } from "@/components/ui";
import type { AssignmentDto } from "@/types/api";

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
    badgeVariant: "danger",
  },
};

export function getTeacherAssignmentDisplayStatus(
  assignment: AssignmentDto,
): TeacherAssignmentDisplayStatus {
  if (!assignment.deadline) {
    return "NoDeadline";
  }

  return isPastDueAssignment(assignment) ? "PastDue" : "Upcoming";
}

export function getTeacherAssignmentStatusMeta(assignment: AssignmentDto) {
  return teacherAssignmentStatusMeta[
    getTeacherAssignmentDisplayStatus(assignment)
  ];
}

function isPastDueAssignment(assignment: AssignmentDto) {
  if (!assignment.deadline) {
    return false;
  }

  const deadlineDate = new Date(assignment.deadline);
  const today = new Date();

  deadlineDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return deadlineDate < today;
}