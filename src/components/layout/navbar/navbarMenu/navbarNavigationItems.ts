import { routes } from "@/app/routes/routes";
import type { IconType } from "react-icons";
import {
  LuBookOpen,
  LuClipboardList,
  LuLayoutDashboard,
  LuMegaphone,
} from "react-icons/lu";

export type NavbarNavigationItem = {
  label: string;
  path: string;
  icon: IconType;
  exact?: boolean;
};

const navbarNavigationText = {
  dashboard: "Dashboard",
  courses: "Courses",
  assignments: "Assignments",
  announcements: "Announcements",
  componentPreview: "Component Preview",
  themePreview: "Theme Preview",
};

const mainNavigationItems: NavbarNavigationItem[] = [
  {
    label: navbarNavigationText.dashboard,
    path: routes.dashboard,
    icon: LuLayoutDashboard,
    exact: true,
  },
  {
    label: navbarNavigationText.courses,
    path: routes.courses,
    icon: LuBookOpen,
  },
  {
    label: navbarNavigationText.assignments,
    path: routes.assignments,
    icon: LuClipboardList,
  },
  {
    label: navbarNavigationText.announcements,
    path: routes.announcements,
    icon: LuMegaphone,
  },
];

export const studentNavigationItems: NavbarNavigationItem[] = [
  ...mainNavigationItems,
];

export const teacherNavigationItems: NavbarNavigationItem[] = [
  ...mainNavigationItems,
];
