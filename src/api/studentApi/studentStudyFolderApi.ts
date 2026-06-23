import { apiClient } from "@/api/axiosClient";
import { apiRoutes } from "@/config/apiRoutes";
import type {
  CourseStudyFolderContentDto,
  Guid,
  StudyFileDto,
  StudyFolderDto,
} from "@/types/api";

export const studentStudyFolderApi = {
  getFoldersByCourse: async (
    courseId: Guid,
    parentFolderId?: Guid | null,
  ): Promise<StudyFolderDto[]> => {
    const response = await apiClient.get<StudyFolderDto[]>(
      apiRoutes.student.studyFolders.getByCourse(courseId),
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
      apiRoutes.student.studyFolders.getById(folderId),
    );

    return response.data;
  },

  getCourseContent: async (
    courseId: Guid,
  ): Promise<CourseStudyFolderContentDto> => {
    const response = await apiClient.get<CourseStudyFolderContentDto>(
      apiRoutes.student.studyFolders.getCourseContent(courseId),
    );

    return response.data;
  },

  getFiles: async (folderId: Guid): Promise<StudyFileDto[]> => {
    const response = await apiClient.get<StudyFileDto[]>(
      apiRoutes.student.studyFolders.getFiles(folderId),
    );

    return response.data;
  },

  getFile: async (fileId: Guid): Promise<StudyFileDto> => {
    const response = await apiClient.get<StudyFileDto>(
      apiRoutes.student.studyFolders.getFile(fileId),
    );

    return response.data;
  },
};