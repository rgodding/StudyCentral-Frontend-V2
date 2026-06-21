import { useQuery } from "@tanstack/react-query";

import { studentApi } from "@/api/studentApi";
import { teacherApi } from "@/api/teacherApi";
import { useAuth } from "@/hooks";
import type { Guid } from "@/types/api";

export function useCourse(courseId?: Guid) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["course", courseId, user?.role],
    enabled: Boolean(user && courseId),
    queryFn: () => {
      if (!user) {
        throw new Error("User is not logged in.");
      }

      if (!courseId) {
        throw new Error("Course id is missing.");
      }

      switch (user.role) {
        case "Student":
          return studentApi.courses.getCourse(courseId);

        case "Teacher":
          return teacherApi.courses.getCourse(courseId);

        default:
          throw new Error("Role does not have access to courses.");
      }
    },
  });
}