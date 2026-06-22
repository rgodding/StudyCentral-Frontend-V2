import { useQuery } from "@tanstack/react-query";

import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import type { Guid } from "@/types/api";
import { teacherApi } from "@/api/teacherApi";
import { studentApi } from "@/api/studentApi";

export function useCourseAnnouncements(courseId?: Guid) {
  const { data: user } = useCurrentUser();

  return useQuery({
    queryKey: ["course-announcements", courseId, user?.role],
    enabled: Boolean(courseId && user?.role),
    queryFn: () => {
      if (!courseId) {
        throw new Error("Course id is missing.");
      }

      if (!user) {
        throw new Error("User is not logged in.");
      }

      switch (user.role) {
        case "Teacher":
          return teacherApi.announcements.getAnnouncementsByCourseId(courseId);

        case "Student":
          return studentApi.announcements.getAnnouncementsByCourseId(courseId);

        default:
          throw new Error("User role cannot access course announcements.");
      }
    },
  });
}