import { apiClient } from "@/api/axiosClient";
import { apiRoutes } from "@/config/apiRoutes";
import type {
  Guid,
  StudentAssignmentDto,
  StudyFileDto,
} from "@/types/api";

export const studentAssignmentApi = {
  getAssignments: async (): Promise<StudentAssignmentDto[]> => {
    const response = await apiClient.get<StudentAssignmentDto[]>(
      apiRoutes.student.assignments.getAll,
    );

    return response.data;
  },

  getAssignmentsByCourseId: async (
    courseId: Guid,
  ): Promise<StudentAssignmentDto[]> => {
    const response = await apiClient.get<StudentAssignmentDto[]>(
      apiRoutes.student.assignments.getByCourse(courseId),
    );

    return response.data;
  },

  getAssignment: async (assignmentId: Guid): Promise<StudentAssignmentDto> => {
    const response = await apiClient.get<StudentAssignmentDto>(
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