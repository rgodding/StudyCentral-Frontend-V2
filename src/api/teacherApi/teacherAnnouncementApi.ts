import { apiClient } from "@/api/axiosClient";
import { apiRoutes } from "@/config/apiRoutes";
import type {
  AnnouncementDto,
  CreateAnnouncementDto,
  Guid,
  StudyFileDto,
  UpdateAnnouncementDto,
} from "@/types/api";

export const teacherAnnouncementApi = {
  getAnnouncements: async (): Promise<AnnouncementDto[]> => {
    const response = await apiClient.get<AnnouncementDto[]>(
      apiRoutes.teacher.announcements.getAll,
    );

    return response.data;
  },

  getAnnouncementsByCourse: async (
    courseId: Guid,
  ): Promise<AnnouncementDto[]> => {
    const response = await apiClient.get<AnnouncementDto[]>(
      apiRoutes.teacher.announcements.getByCourse(courseId),
    );

    return response.data;
  },

  getAnnouncement: async (announcementId: Guid): Promise<AnnouncementDto> => {
    const response = await apiClient.get<AnnouncementDto>(
      apiRoutes.teacher.announcements.getById(announcementId),
    );

    return response.data;
  },

  createAnnouncement: async (
    dto: CreateAnnouncementDto,
  ): Promise<AnnouncementDto> => {
    const response = await apiClient.post<AnnouncementDto>(
      apiRoutes.teacher.announcements.create,
      dto,
    );

    return response.data;
  },

  updateAnnouncement: async (
    announcementId: Guid,
    dto: UpdateAnnouncementDto,
  ): Promise<AnnouncementDto> => {
    const response = await apiClient.put<AnnouncementDto>(
      apiRoutes.teacher.announcements.update(announcementId),
      dto,
    );

    return response.data;
  },

  deleteAnnouncement: async (announcementId: Guid): Promise<void> => {
    await apiClient.delete(
      apiRoutes.teacher.announcements.delete(announcementId),
    );
  },

  getFiles: async (announcementId: Guid): Promise<StudyFileDto[]> => {
    const response = await apiClient.get<StudyFileDto[]>(
      apiRoutes.teacher.announcements.getFiles(announcementId),
    );

    return response.data;
  },

  uploadFile: async (
    announcementId: Guid,
    file: File,
  ): Promise<StudyFileDto> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post<StudyFileDto>(
      apiRoutes.teacher.announcements.uploadFile(announcementId),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response.data;
  },

  attachFile: async (announcementId: Guid, fileId: Guid): Promise<void> => {
    await apiClient.post(
      apiRoutes.teacher.announcements.attachFile(announcementId, fileId),
    );
  },

  detachFile: async (announcementId: Guid, fileId: Guid): Promise<void> => {
    await apiClient.delete(
      apiRoutes.teacher.announcements.detachFile(announcementId, fileId),
    );
  },

  removeFile: async (announcementId: Guid, fileId: Guid): Promise<void> => {
    await apiClient.delete(
      apiRoutes.teacher.announcements.removeFile(announcementId, fileId),
    );
  },
};
