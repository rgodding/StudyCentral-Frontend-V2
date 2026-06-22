import type { ApiDate, Guid } from "@/types/api/common";

export type AnnouncementDto = {
  id: Guid;
  name: string | null;
  content: string | null;
  courseId: Guid;
  courseName: string | null;
  fileCount: number;
  createdAt: ApiDate;
  updatedAt: ApiDate | null;
};

export type CreateAnnouncementDto = {
  name: string;
  content: string;
  courseId: Guid;
};

export type UpdateAnnouncementDto = {
  name: string;
  content: string;
};

export type AdminUpdateAnnouncementDto = {
  name: string;
  content: string;
  courseId: Guid;
};