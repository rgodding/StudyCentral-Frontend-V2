import { useQuery } from "@tanstack/react-query";

import { studentApi } from "@/api/studentApi";
import { teacherApi } from "@/api/teacherApi";
import { useAuth } from "@/hooks";

export function useCourses() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["courses", user?.role],
    enabled: Boolean(user),
    queryFn: () => {
      if (!user) {
        throw new Error("User is not logged in.");
      }

      switch (user.role) {
        case "Student":
          return studentApi.courses.getCourses();

        case "Teacher":
          return teacherApi.courses.getCourses();

        default:
          return [];
      }
    },
  });
}