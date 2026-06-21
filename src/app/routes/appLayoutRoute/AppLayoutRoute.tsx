import { Outlet } from "react-router-dom";

import { AppShell, PageFrame } from "@/components/layout";
import { CourseLayoutSubNavbar } from "./CourseLayoutSubNavbar";

export function AppLayoutRoute() {
  return (
    <AppShell subNavbar={<CourseLayoutSubNavbar />}>
      <PageFrame frameWidth="large" variant="panel">
        <Outlet />
      </PageFrame>
    </AppShell>
  );
}