import { Outlet, matchPath, useLocation } from "react-router-dom";

import { routes } from "@/app/routes/routes";
import { AppShell, PageFrame } from "@/components/layout";
import { CourseLayoutSubNavbar } from "./CourseLayoutSubNavbar";

export function AppLayoutRoute() {
  const location = useLocation();

  const courseMatch =
    matchPath(
      {
        path: `${routes.courses}/:courseId/*`,
        end: false,
      },
      location.pathname,
    ) ??
    matchPath(
      {
        path: `${routes.courses}/:courseId`,
        end: true,
      },
      location.pathname,
    );

  const isCourseRoute = Boolean(courseMatch);

  return (
    <AppShell subNavbar={isCourseRoute ? <CourseLayoutSubNavbar /> : undefined}>
      <PageFrame frameWidth="large" variant="panel">
        <Outlet />
      </PageFrame>
    </AppShell>
  );
}