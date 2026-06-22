import { apiClient } from "@/api/axiosClient";
import { apiRoutes } from "@/config/apiRoutes";
import type { AssignmentDto, Guid, StudyFileDto } from "@/types/api";

export const studentAssignmentApi = {
  getAssignments: async (): Promise<AssignmentDto[]> => {
    const response = await apiClient.get<AssignmentDto[]>(
      apiRoutes.student.assignments.getAll,
    );

    return response.data;
  },

  getAssignmentsByCourseId: async (courseId: Guid): Promise<AssignmentDto[]> => {
    const response = await apiClient.get<AssignmentDto[]>(
      apiRoutes.student.assignments.getByCourse(courseId),
    );

    return response.data;
  },

  getAssignment: async (assignmentId: Guid): Promise<AssignmentDto> => {
    const response = await apiClient.get<AssignmentDto>(
      apiRoutes.student.assignments.getById(assignmentId),
    );

    return response.data;
  },

  getFiles: async (assignmentId: Guid): Promise<StudyFileDto[]> => {
    const response = await apiClient.get<StudyFileDto[]>(
      apiRoutes.student.assignments.getFiles(assignmentId),
    );

    return response.data;
  },
};