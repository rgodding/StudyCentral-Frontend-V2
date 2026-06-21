import { apiClient } from "@/api/axiosClient";
import { apiRoutes } from "@/config/apiRoutes";
import type {
  AssignmentDto,
  CreateAssignmentDto,
  Guid,
  StudyFileDto,
  UpdateAssignmentDto,
} from "@/types/api";

export const teacherAssignmentApi = {
  getAssignments: async (): Promise<AssignmentDto[]> => {
    const response = await apiClient.get<AssignmentDto[]>(
      apiRoutes.teacher.assignments.getAll,
    );

    return response.data;
  },

  getAssignmentsByCourse: async (courseId: Guid): Promise<AssignmentDto[]> => {
    const response = await apiClient.get<AssignmentDto[]>(
      apiRoutes.teacher.assignments.getByCourse(courseId),
    );

    return response.data;
  },

  getAssignment: async (assignmentId: Guid): Promise<AssignmentDto> => {
    const response = await apiClient.get<AssignmentDto>(
      apiRoutes.teacher.assignments.getById(assignmentId),
    );

    return response.data;
  },

  createAssignment: async (
    dto: CreateAssignmentDto,
  ): Promise<AssignmentDto> => {
    const response = await apiClient.post<AssignmentDto>(
      apiRoutes.teacher.assignments.create,
      dto,
    );

    return response.data;
  },

  updateAssignment: async (
    assignmentId: Guid,
    dto: UpdateAssignmentDto,
  ): Promise<AssignmentDto> => {
    const response = await apiClient.put<AssignmentDto>(
      apiRoutes.teacher.assignments.update(assignmentId),
      dto,
    );

    return response.data;
  },

  deleteAssignment: async (assignmentId: Guid): Promise<void> => {
    await apiClient.delete(apiRoutes.teacher.assignments.delete(assignmentId));
  },

  getFiles: async (assignmentId: Guid): Promise<StudyFileDto[]> => {
    const response = await apiClient.get<StudyFileDto[]>(
      apiRoutes.teacher.assignments.getFiles(assignmentId),
    );

    return response.data;
  },

  uploadFile: async (
    assignmentId: Guid,
    file: File,
    altText?: string,
  ): Promise<StudyFileDto> => {
    const formData = new FormData();
    formData.append("File", file);

    if (altText) {
      formData.append("AltText", altText);
    }

    const response = await apiClient.post<StudyFileDto>(
      apiRoutes.teacher.assignments.uploadFile(assignmentId),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response.data;
  },

  removeFile: async (assignmentId: Guid, fileId: Guid): Promise<void> => {
    await apiClient.delete(
      apiRoutes.teacher.assignments.removeFile(assignmentId, fileId),
    );
  },

  attachFile: async (assignmentId: Guid, fileId: Guid): Promise<void> => {
    await apiClient.post(
      apiRoutes.teacher.assignments.attachFile(assignmentId, fileId),
    );
  },

  detachFile: async (assignmentId: Guid, fileId: Guid): Promise<void> => {
    await apiClient.delete(
      apiRoutes.teacher.assignments.detachFile(assignmentId, fileId),
    );
  },
};
