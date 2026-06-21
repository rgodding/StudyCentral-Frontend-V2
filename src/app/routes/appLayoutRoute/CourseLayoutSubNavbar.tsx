import { routes } from "@/app/routes/routes";
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
          to: `${routes.courses}/${courseId}`,
          exact: true,
        },
        {
          label: "Announcements",
          to: `${routes.courses}/${courseId}/announcements`,
        },
        {
          label: "Assignments",
          to: `${routes.courses}/${courseId}/assignments`,
        },
        {
          label: "Study Folders",
          to: `${routes.courses}/${courseId}/study-folders`,
        },
        {
          label: "Chat",
          to: `${routes.courses}/${courseId}/chat`,
        },
      ]}
    />
  );
}