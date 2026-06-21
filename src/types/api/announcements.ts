import type { ApiDate, Guid } from "@/types/api/common";

export type AnnouncementDto = {
  id: Guid;
  title: string | null;
  content: string | null;
  courseId: Guid;
  courseName: string | null;
  fileCount: number;
  createdAt: ApiDate;
  updatedAt: ApiDate | null;
};

export type CreateAnnouncementDto = {
  title: string;
  content: string;
  courseId: Guid;
};

export type UpdateAnnouncementDto = {
  title: string;
  content: string;
};

export type AdminUpdateAnnouncementDto = {
  title: string;
  content: string;
  courseId: Guid;
};