import type { ApiDate, Guid } from "@/types/api/common";

export type AssignmentDto = {
  id: Guid;
  name: string | null;
  description: string | null;
  deadline: ApiDate | null;
  courseId: Guid;
  courseName: string | null;
  fileCount: number;
  submissionCount: number;
  createdAt: ApiDate;
  updatedAt: ApiDate | null;
};

export type CreateAssignmentDto = {
  name: string;
  description: string;
  deadline?: ApiDate | null;
  courseId: Guid;
};

export type UpdateAssignmentDto = {
  name: string;
  description: string;
  deadline?: ApiDate | null;
};

export type AdminUpdateAssignmentDto = {
  name: string;
  description: string;
  deadline?: ApiDate | null;
  courseId: Guid;
};