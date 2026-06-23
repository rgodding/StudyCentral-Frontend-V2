import { useMutation, useQueryClient } from "@tanstack/react-query";

import { teacherApi } from "@/api/teacherApi";
import type { AnnouncementDto, CreateAnnouncementDto } from "@/types/api";

export type CreateAnnouncementInput = CreateAnnouncementDto & {
  files: File[];
};

export function useCreateAnnouncement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      files,
      ...dto
    }: CreateAnnouncementInput): Promise<AnnouncementDto> => {
      const announcement = await teacherApi.announcements.createAnnouncement(dto);

      await Promise.all(
        files.map((file) =>
          teacherApi.announcements.uploadFile(announcement.id, file),
        ),
      );

      return announcement;
    },

    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["teacher-announcements"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["course-announcements", "Teacher", variables.courseId],
        }),
      ]);
    },
  });
}