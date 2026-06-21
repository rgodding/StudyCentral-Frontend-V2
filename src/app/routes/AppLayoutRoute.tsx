import { Outlet } from "react-router-dom";

import { AppShell, PageFrame } from "@/components/layout";

export function AppLayoutRoute() {
  return (
    <AppShell>
      <PageFrame frameWidth="large" variant="panel">
        <Outlet />
      </PageFrame>
    </AppShell>
  );
}