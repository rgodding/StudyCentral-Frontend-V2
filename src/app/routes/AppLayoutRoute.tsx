import { AppShell } from "@/components/layout/app";
import { Outlet } from "react-router-dom";


export function AppLayoutRoute() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}