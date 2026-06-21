import { apiClient } from "@/api/axiosClient";
import { apiRoutes } from "@/config/apiRoutes";
import type { CourseDto, Guid, UserDto } from "@/types/api";

export const studentCourseApi = {
  getCourses: async (): Promise<CourseDto[]> => {
    const response = await apiClient.get<CourseDto[]>(
      apiRoutes.student.courses.getAll,
    );

    return response.data;
  },

  getCourse: async (courseId: Guid): Promise<CourseDto> => {
    const response = await apiClient.get<CourseDto>(
      apiRoutes.student.courses.getById(courseId),
    );

    return response.data;
  },

  getStudents: async (courseId: Guid): Promise<UserDto[]> => {
    const response = await apiClient.get<UserDto[]>(
      apiRoutes.student.courses.getStudents(courseId),
    );

    return response.data;
  },
};