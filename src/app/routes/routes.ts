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

  courseAnnouncements: (courseId: string) =>
    `${routes.courses}/${courseId}/announcements`,

  courseAssignments: (courseId: string) =>
    `${routes.courses}/${courseId}/assignments`,

  courseResources: (courseId: string) =>
    `${routes.courses}/${courseId}/resources`,

  assignmentDetails: (courseId: string, assignmentId: string) =>
    `${routes.courses}/${courseId}/assignments/${assignmentId}`,
} as const;