export const routes = {
  home: "/",
  login: "/login",
  register: "/register",
  unauthorized: "/unauthorized",

  dashboard: "/dashboard",
  account: "/account",
  courses: "/courses",
  settings: "/settings",
  assignments: "/assignments",
  announcements: "/announcements",

  themePreview: "/theme-preview",
  componentPreview: "/component-preview",
} as const;

export const routePaths = {
  courseDetails: (courseId: string) => `${routes.courses}/${courseId}`,

  assignmentDetails: (courseId: string, assignmentId: string) =>
    `${routes.courses}/${courseId}/assignments/${assignmentId}`,
} as const;