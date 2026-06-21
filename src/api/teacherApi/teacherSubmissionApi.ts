import { apiClient } from "@/api/axiosClient";
import { apiRoutes } from "@/config/apiRoutes";
import type {
  GradeSubmissionDto,
  Guid,
  StudyFileDto,
  SubmissionDto,
} from "@/types/api";

export const teacherSubmissionApi = {
  getSubmissionsByAssignment: async (
    assignmentId: Guid,
  ): Promise<SubmissionDto[]> => {
    const response = await apiClient.get<SubmissionDto[]>(
      apiRoutes.teacher.submissions.getByAssignment(assignmentId),
    );

    return response.data;
  },

  getSubmission: async (submissionId: Guid): Promise<SubmissionDto> => {
    const response = await apiClient.get<SubmissionDto>(
      apiRoutes.teacher.submissions.getById(submissionId),
    );

    return response.data;
  },

  gradeSubmission: async (
    submissionId: Guid,
    dto: GradeSubmissionDto,
  ): Promise<void> => {
    await apiClient.post(apiRoutes.teacher.submissions.grade(submissionId), dto);
  },

  getFiles: async (submissionId: Guid): Promise<StudyFileDto[]> => {
    const response = await apiClient.get<StudyFileDto[]>(
      apiRoutes.teacher.submissions.getFiles(submissionId),
    );

    return response.data;
  },
};