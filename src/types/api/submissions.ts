import type { ApiDate, Guid } from "@/types/api/common";
import type { GradeLetter, SubmissionStatus } from "@/types/api/enums";
import type { StudyFileDto } from "@/types/api/studyFiles";

export type SubmissionDto = {
  id: Guid;
  assignmentId: Guid;
  assignmentName: string | null;
  studentId: Guid;
  studentName: string | null;
  comment: string | null;
  feedback: string | null;
  grade: GradeLetter | null;
  status: SubmissionStatus;
  submittedAt: ApiDate | null;
  createdAt: ApiDate;
  updatedAt: ApiDate | null;
  files: StudyFileDto[];
};

export type CreateSubmissionDto = {
  assignmentId: Guid;
  comment?: string | null;
};

export type UpdateSubmissionDto = {
  comment?: string | null;
};

export type GradeSubmissionDto = {
  grade: GradeLetter;
  feedback?: string | null;
};