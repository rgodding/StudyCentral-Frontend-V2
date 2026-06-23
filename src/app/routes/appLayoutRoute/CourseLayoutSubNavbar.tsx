import { routePaths, routes } from "@/app/routes/routes";
import { SubNavbar } from "@/components/layout/subNavbar/SubNavbar";
import { useCourse } from "@/hooks/courses/useCourse";
import { matchPath, useLocation } from "react-router-dom";

export function CourseLayoutSubNavbar() {
  const location = useLocation();

  const courseMatch = matchPath(
    {
      path: `${routes.courses}/:courseId/*`,
      end: false,
    },
    location.pathname,
  );

  const courseId = courseMatch?.params.courseId;

  const { data: course } = useCourse(courseId);

  if (!courseId) {
    return null;
  }

  return (
    <SubNavbar
      title={course?.name ?? "Course"}
      items={[
        {
          label: "Overview",
          to: routePaths.courseDetails(courseId),
          exact: true,
        },
        {
          label: "Announcements",
          to: routePaths.courseAnnouncements(courseId),
        },
        {
          label: "Assignments",
          to: routePaths.courseAssignments(courseId),
        },
        {
          label: "Resources",
          to: routePaths.courseResources(courseId),
        },
      ]}
    />
  );
}