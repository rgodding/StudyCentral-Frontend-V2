import type { StudyBadgeVariant } from "@/components/ui";
import type { StudentAssignmentDto, SubmissionStatus } from "@/types/api";

export type StudentAssignmentDisplayStatus =
  | "NoDeadline"
  | "Upcoming"
  | "Overdue"
  | SubmissionStatus;

type StudentAssignmentStatusMeta = {
  label: string;
  badgeVariant: StudyBadgeVariant;
};

export const studentAssignmentStatusMeta: Record<
  StudentAssignmentDisplayStatus,
  StudentAssignmentStatusMeta
> = {
  NoDeadline: {
    label: "No deadline",
    badgeVariant: "neutral",
  },
  Upcoming: {
    label: "Upcoming",
    badgeVariant: "info",
  },
  Overdue: {
    label: "Overdue",
    badgeVariant: "danger",
  },
  NotSubmitted: {
    label: "Not submitted",
    badgeVariant: "neutral",
  },
  Submitted: {
    label: "Submitted",
    badgeVariant: "info",
  },
  SubmittedLate: {
    label: "Submitted late",
    badgeVariant: "warning",
  },
  Passed: {
    label: "Passed",
    badgeVariant: "success",
  },
  Failed: {
    label: "Failed",
    badgeVariant: "danger",
  },
};

export function getStudentAssignmentDisplayStatus(
  assignment: StudentAssignmentDto,
): StudentAssignmentDisplayStatus {
  if (assignment.submissionStatus !== "NotSubmitted") {
    return assignment.submissionStatus;
  }

  if (!assignment.deadline) {
    return "NoDeadline";
  }

  return new Date(assignment.deadline) < new Date() ? "Overdue" : "Upcoming";
}

export function getStudentAssignmentStatusMeta(
  assignment: StudentAssignmentDto,
) {
  return studentAssignmentStatusMeta[
    getStudentAssignmentDisplayStatus(assignment)
  ];
}

export function isCompletedAssignment(assignment: StudentAssignmentDto) {
  return assignment.submissionStatus !== "NotSubmitted";
}