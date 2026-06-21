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

export const studentNavigationItems: NavbarNavigationItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LuLayoutDashboard,
    exact: true,
  },
  {
    label: "Courses",
    path: "/courses",
    icon: LuBookOpen,
  },
  {
    label: "Assignments",
    path: "/assignments",
    icon: LuClipboardList,
  },
  {
    label: "Announcements",
    path: "/announcements",
    icon: LuMegaphone,
  },
];

export const teacherNavigationItems: NavbarNavigationItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LuLayoutDashboard,
    exact: true,
  },
  {
    label: "Courses",
    path: "/courses",
    icon: LuBookOpen,
  },
  {
    label: "Assignments",
    path: "/assignments",
    icon: LuClipboardList,
  },
  {
    label: "Announcements",
    path: "/announcements",
    icon: LuMegaphone,
  },
];