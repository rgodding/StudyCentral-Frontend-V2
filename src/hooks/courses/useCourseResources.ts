import { useQuery } from "@tanstack/react-query";

import { studentApi } from "@/api/studentApi";
import { teacherApi } from "@/api/teacherApi";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import type { Guid } from "@/types/api";

export function useCourseResources(courseId?: Guid) {
  const { data: user } = useCurrentUser();

  const query = useQuery({
    queryKey: ["course-resources", courseId, user?.role],
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
          return teacherApi.studyFolders.getCourseContent(courseId);

        case "Student":
          return studentApi.studyFolders.getCourseContent(courseId);

        default:
          throw new Error("User role cannot access course resources.");
      }
    },
  });

  return {
    ...query,
    user,
    canManageResources: user?.role === "Teacher",
  };
}