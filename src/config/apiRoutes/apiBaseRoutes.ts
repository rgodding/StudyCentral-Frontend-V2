const API_ROOT = "/api";

const authRoute = `${API_ROOT}/Auth`;
const accountRoute = `${API_ROOT}/Account`;
const fileRoute = `${API_ROOT}/File`;
const imageRoute = `${API_ROOT}/Image`;
const chatRoute = `${API_ROOT}/chat`;

const HUB_ROOT = "/hubs";
const chatHubRoute = `${HUB_ROOT}/chat`;

const teacherRoute = `${API_ROOT}/teacher`;
const teacherCoursesRoute = `${teacherRoute}/courses`;
const teacherAssignmentsRoute = `${teacherRoute}/assignments`;
const teacherAnnouncementsRoute = `${teacherRoute}/announcements`;
const teacherStudyFoldersRoute = `${teacherRoute}/study-folders`;
const teacherSubmissionsRoute = `${teacherRoute}/submissions`;

const studentRoute = `${API_ROOT}/student`;
const studentCoursesRoute = `${studentRoute}/courses`;
const studentAssignmentsRoute = `${studentRoute}/assignments`;
const studentAnnouncementsRoute = `${studentRoute}/announcements`;
const studentStudyFoldersRoute = `${studentRoute}/study-folders`;
const studentSubmissionsRoute = `${studentRoute}/submissions`;

export const apiBaseRoutes = {
  auth: authRoute,
  account: accountRoute,
  file: fileRoute,
  image: imageRoute,
  chat: chatRoute,

  hubs: {
    chat: chatHubRoute,
  },

  teacher: {
    root: teacherRoute,
    courses: teacherCoursesRoute,
    assignments: teacherAssignmentsRoute,
    announcements: teacherAnnouncementsRoute,
    studyFolders: teacherStudyFoldersRoute,
    submissions: teacherSubmissionsRoute,
  },

  student: {
    root: studentRoute,
    courses: studentCoursesRoute,
    assignments: studentAssignmentsRoute,
    announcements: studentAnnouncementsRoute,
    studyFolders: studentStudyFoldersRoute,
    submissions: studentSubmissionsRoute,
  },
} as const;