import { apiClient } from "@/api/axiosClient";
import { apiRoutes } from "@/config/apiRoutes";
import type {
  CreateStudyFolderDto,
  Guid,
  MoveFolderDto,
  StudyFileDto,
  StudyFolderDto,
  UpdateStudyFolderDto,
} from "@/types/api";

export const teacherStudyFolderApi = {
  getFoldersByCourse: async (
    courseId: Guid,
    parentFolderId?: Guid | null,
  ): Promise<StudyFolderDto[]> => {
    const response = await apiClient.get<StudyFolderDto[]>(
      apiRoutes.teacher.studyFolders.getByCourse(courseId),
      {
        params: {
          parentFolderId,
        },
      },
    );

    return response.data;
  },

  getFolder: async (folderId: Guid): Promise<StudyFolderDto> => {
    const response = await apiClient.get<StudyFolderDto>(
      apiRoutes.teacher.studyFolders.getById(folderId),
    );

    return response.data;
  },

  getCourseContent: async (courseId: Guid): Promise<unknown> => {
    const response = await apiClient.get<unknown>(
      apiRoutes.teacher.studyFolders.getCourseContent(courseId),
    );

    return response.data;
  },

  createFolder: async (
    dto: CreateStudyFolderDto,
  ): Promise<StudyFolderDto> => {
    const response = await apiClient.post<StudyFolderDto>(
      apiRoutes.teacher.studyFolders.create,
      dto,
    );

    return response.data;
  },

  updateFolder: async (
    folderId: Guid,
    dto: UpdateStudyFolderDto,
  ): Promise<StudyFolderDto> => {
    const response = await apiClient.put<StudyFolderDto>(
      apiRoutes.teacher.studyFolders.update(folderId),
      dto,
    );

    return response.data;
  },

  deleteFolder: async (folderId: Guid): Promise<void> => {
    await apiClient.delete(apiRoutes.teacher.studyFolders.delete(folderId));
  },

  moveFolder: async (
    folderId: Guid,
    dto: MoveFolderDto,
  ): Promise<StudyFolderDto> => {
    const response = await apiClient.patch<StudyFolderDto>(
      apiRoutes.teacher.studyFolders.move(folderId),
      dto,
    );

    return response.data;
  },

  getFiles: async (folderId: Guid): Promise<StudyFileDto[]> => {
    const response = await apiClient.get<StudyFileDto[]>(
      apiRoutes.teacher.studyFolders.getFiles(folderId),
    );

    return response.data;
  },

  getFile: async (fileId: Guid): Promise<StudyFileDto> => {
    const response = await apiClient.get<StudyFileDto>(
      apiRoutes.teacher.studyFolders.getFile(fileId),
    );

    return response.data;
  },

  uploadFile: async (
    folderId: Guid,
    file: File,
    altText?: string,
  ): Promise<StudyFileDto> => {
    const formData = new FormData();
    formData.append("File", file);

    if (altText) {
      formData.append("AltText", altText);
    }

    const response = await apiClient.post<StudyFileDto>(
      apiRoutes.teacher.studyFolders.uploadFile(folderId),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response.data;
  },

  removeFile: async (folderId: Guid, fileId: Guid): Promise<void> => {
    await apiClient.delete(
      apiRoutes.teacher.studyFolders.removeFile(folderId, fileId),
    );
  },
};