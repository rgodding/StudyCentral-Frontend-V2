import type { ApiDate, Guid } from "@/types/api/common";

export type StudyFolderDto = {
  id: Guid;
  name: string | null;
  courseId: Guid;
  courseName: string | null;
  parentFolderId: Guid | null;
  childFolderCount: number;
  fileCount: number;
  createdAt: ApiDate;
  updatedAt: ApiDate | null;
};

export type CreateStudyFolderDto = {
  name: string;
  courseId: Guid;
  parentFolderId?: Guid | null;
};

export type UpdateStudyFolderDto = {
  name: string;
  parentFolderId?: Guid | null;
};