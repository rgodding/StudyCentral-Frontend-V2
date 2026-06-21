import { apiBaseRoutes } from "./apiBaseRoutes";

const studentCoursesRoute = apiBaseRoutes.student.courses;
const studentAssignmentsRoute = apiBaseRoutes.student.assignments;
const studentAnnouncementsRoute = apiBaseRoutes.student.announcements;
const studentStudyFoldersRoute = apiBaseRoutes.student.studyFolders;
const studentSubmissionsRoute = apiBaseRoutes.student.submissions;

export const studentApiRoutes = {
  courses: {
    getAll: studentCoursesRoute,
    getById: (courseId: string) => `${studentCoursesRoute}/${courseId}`,
    getStudents: (courseId: string) =>
      `${studentCoursesRoute}/${courseId}/students`,
  },

  assignments: {
    getAll: studentAssignmentsRoute,
    getByCourse: (courseId: string) =>
      `${studentAssignmentsRoute}/course/${courseId}`,
    getById: (assignmentId: string) =>
      `${studentAssignmentsRoute}/${assignmentId}`,
    getFiles: (assignmentId: string) =>
      `${studentAssignmentsRoute}/${assignmentId}/files`,
  },

  announcements: {
    getAll: studentAnnouncementsRoute,
    getByCourse: (courseId: string) =>
      `${studentAnnouncementsRoute}/courses/${courseId}`,
    getById: (announcementId: string) =>
      `${studentAnnouncementsRoute}/${announcementId}`,
    getFiles: (announcementId: string) =>
      `${studentAnnouncementsRoute}/${announcementId}/files`,
  },

  studyFolders: {
    getByCourse: (courseId: string) =>
      `${studentStudyFoldersRoute}/courses/${courseId}`,
    getById: (folderId: string) => `${studentStudyFoldersRoute}/${folderId}`,
    getCourseContent: (courseId: string) =>
      `${studentStudyFoldersRoute}/course/${courseId}/content`,
    getFiles: (folderId: string) =>
      `${studentStudyFoldersRoute}/${folderId}/files`,
    getFile: (fileId: string) => `${studentStudyFoldersRoute}/files/${fileId}`,
  },

  submissions: {
    getAll: studentSubmissionsRoute,
    getById: (submissionId: string) =>
      `${studentSubmissionsRoute}/${submissionId}`,
    create: studentSubmissionsRoute,
    update: (submissionId: string) =>
      `${studentSubmissionsRoute}/${submissionId}`,
    delete: (submissionId: string) =>
      `${studentSubmissionsRoute}/${submissionId}`,
    getFiles: (submissionId: string) =>
      `${studentSubmissionsRoute}/${submissionId}/files`,
    uploadFile: (submissionId: string) =>
      `${studentSubmissionsRoute}/${submissionId}/files`,
    attachFile: (submissionId: string, fileId: string) =>
      `${studentSubmissionsRoute}/${submissionId}/attachments/${fileId}`,
    detachFile: (submissionId: string, fileId: string) =>
      `${studentSubmissionsRoute}/${submissionId}/attachments/${fileId}`,
    removeFile: (submissionId: string, fileId: string) =>
      `${studentSubmissionsRoute}/${submissionId}/files/${fileId}`,
  },
} as const;
