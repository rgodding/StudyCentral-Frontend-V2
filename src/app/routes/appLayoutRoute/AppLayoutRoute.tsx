import { Outlet, matchPath, useLocation } from "react-router-dom";

import { routePaths, routes } from "@/app/routes/routes";
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

  const resourcesMatch = matchPath(
    {
      path: routePaths.courseResources(":courseId"),
      end: true,
    },
    location.pathname,
  );

  const isCourseRoute = Boolean(courseMatch);
  const isResourcesPage = Boolean(resourcesMatch);

  return (
    <AppShell subNavbar={isCourseRoute ? <CourseLayoutSubNavbar /> : undefined}>
      <PageFrame
        frameWidth={isResourcesPage ? "full" : "large"}
        variant={isResourcesPage ? "plain" : "panel"}
      >
        <Outlet />
      </PageFrame>
    </AppShell>
  );
}
