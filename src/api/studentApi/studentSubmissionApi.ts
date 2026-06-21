import { apiClient } from "@/api/axiosClient";
import { apiRoutes } from "@/config/apiRoutes";
import type {
  CreateSubmissionDto,
  Guid,
  StudyFileDto,
  SubmissionDto,
  UpdateSubmissionDto,
} from "@/types/api";

export const studentSubmissionApi = {
  getSubmissions: async (): Promise<SubmissionDto[]> => {
    const response = await apiClient.get<SubmissionDto[]>(
      apiRoutes.student.submissions.getAll,
    );

    return response.data;
  },

  getSubmission: async (submissionId: Guid): Promise<SubmissionDto> => {
    const response = await apiClient.get<SubmissionDto>(
      apiRoutes.student.submissions.getById(submissionId),
    );

    return response.data;
  },

  createSubmission: async (
    dto: CreateSubmissionDto,
  ): Promise<SubmissionDto> => {
    const response = await apiClient.post<SubmissionDto>(
      apiRoutes.student.submissions.create,
      dto,
    );

    return response.data;
  },

  updateSubmission: async (
    submissionId: Guid,
    dto: UpdateSubmissionDto,
  ): Promise<SubmissionDto> => {
    const response = await apiClient.put<SubmissionDto>(
      apiRoutes.student.submissions.update(submissionId),
      dto,
    );

    return response.data;
  },

  deleteSubmission: async (submissionId: Guid): Promise<void> => {
    await apiClient.delete(apiRoutes.student.submissions.delete(submissionId));
  },

  getFiles: async (submissionId: Guid): Promise<StudyFileDto[]> => {
    const response = await apiClient.get<StudyFileDto[]>(
      apiRoutes.student.submissions.getFiles(submissionId),
    );

    return response.data;
  },

  uploadFile: async (
    submissionId: Guid,
    file: File,
    altText?: string,
  ): Promise<StudyFileDto> => {
    const formData = new FormData();
    formData.append("File", file);

    if (altText) {
      formData.append("AltText", altText);
    }

    const response = await apiClient.post<StudyFileDto>(
      apiRoutes.student.submissions.uploadFile(submissionId),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response.data;
  },

  attachFile: async (submissionId: Guid, fileId: Guid): Promise<void> => {
    await apiClient.post(
      apiRoutes.student.submissions.attachFile(submissionId, fileId),
    );
  },

  detachFile: async (submissionId: Guid, fileId: Guid): Promise<void> => {
    await apiClient.delete(
      apiRoutes.student.submissions.detachFile(submissionId, fileId),
    );
  },

  removeFile: async (submissionId: Guid, fileId: Guid): Promise<void> => {
    await apiClient.delete(
      apiRoutes.student.submissions.removeFile(submissionId, fileId),
    );
  },
};