import { apiClient } from "@/api/axiosClient";
import { apiRoutes } from "@/config/apiRoutes";
import type { AnnouncementDto, Guid, StudyFileDto } from "@/types/api";

export const studentAnnouncementApi = {
  getAnnouncements: async (): Promise<AnnouncementDto[]> => {
    const response = await apiClient.get<AnnouncementDto[]>(
      apiRoutes.student.announcements.getAll,
    );

    return response.data;
  },

  getAnnouncementsByCourse: async (
    courseId: Guid,
  ): Promise<AnnouncementDto[]> => {
    const response = await apiClient.get<AnnouncementDto[]>(
      apiRoutes.student.announcements.getByCourse(courseId),
    );

    return response.data;
  },

  getAnnouncement: async (announcementId: Guid): Promise<AnnouncementDto> => {
    const response = await apiClient.get<AnnouncementDto>(
      apiRoutes.student.announcements.getById(announcementId),
    );

    return response.data;
  },

  getFiles: async (announcementId: Guid): Promise<StudyFileDto[]> => {
    const response = await apiClient.get<StudyFileDto[]>(
      apiRoutes.student.announcements.getFiles(announcementId),
    );

    return response.data;
  },
};