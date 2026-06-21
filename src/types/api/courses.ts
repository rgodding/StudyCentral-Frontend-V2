import type { ApiDate, Guid } from "@/types/api/common";

export type CourseDto = {
  id: Guid;
  name: string | null;
  description: string | null;
  studentCount: number;
  createdAt: ApiDate;
  updatedAt: ApiDate | null;
};

export type CreateCourseDto = {
  name: string;
  description: string;
  teacherId?: Guid | null;
};

export type UpdateCourseDto = {
  name: string;
  description: string;
};

export type AdminUpdateCourseDto = {
  name: string;
  description: string;
  teacherId?: Guid | null;
};