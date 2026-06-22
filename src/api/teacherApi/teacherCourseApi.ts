import { apiClient } from "@/api/axiosClient";
import { apiRoutes } from "@/config/apiRoutes";
import type { CourseDto, Guid, UpdateCourseDto, UserDto } from "@/types/api";

export const teacherCourseApi = {
  getCourses: async (): Promise<CourseDto[]> => {
    const response = await apiClient.get<CourseDto[]>(
      apiRoutes.teacher.courses.getAll,
    );

    return response.data;
  },

  getCourseById: async (courseId: Guid): Promise<CourseDto> => {
    const response = await apiClient.get<CourseDto>(
      apiRoutes.teacher.courses.getById(courseId),
    );

    return response.data;
  },

  updateCourse: async (
    courseId: Guid,
    dto: UpdateCourseDto,
  ): Promise<CourseDto> => {
    const response = await apiClient.put<CourseDto>(
      apiRoutes.teacher.courses.update(courseId),
      dto,
    );

    return response.data;
  },

  getStudents: async (courseId: Guid): Promise<UserDto[]> => {
    const response = await apiClient.get<UserDto[]>(
      apiRoutes.teacher.courses.getStudents(courseId),
    );

    return response.data;
  },

  addStudent: async (courseId: Guid, studentId: Guid): Promise<void> => {
    await apiClient.post(
      apiRoutes.teacher.courses.addStudent(courseId, studentId),
    );
  },

  removeStudent: async (courseId: Guid, studentId: Guid): Promise<void> => {
    await apiClient.delete(
      apiRoutes.teacher.courses.removeStudent(courseId, studentId),
    );
  },
};
