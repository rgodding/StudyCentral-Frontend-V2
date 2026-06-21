import { apiBaseRoutes } from "./apiBaseRoutes";

const teacherCoursesRoute = apiBaseRoutes.teacher.courses;
const teacherAssignmentsRoute = apiBaseRoutes.teacher.assignments;
const teacherAnnouncementsRoute = apiBaseRoutes.teacher.announcements;
const teacherStudyFoldersRoute = apiBaseRoutes.teacher.studyFolders;
const teacherSubmissionsRoute = apiBaseRoutes.teacher.submissions;

export const teacherApiRoutes = {
  courses: {
    getAll: teacherCoursesRoute,
    getById: (courseId: string) => `${teacherCoursesRoute}/${courseId}`,
    update: (courseId: string) => `${teacherCoursesRoute}/${courseId}`,
    getStudents: (courseId: string) =>
      `${teacherCoursesRoute}/${courseId}/students`,
    addStudent: (courseId: string, studentId: string) =>
      `${teacherCoursesRoute}/${courseId}/students/${studentId}`,
    removeStudent: (courseId: string, studentId: string) =>
      `${teacherCoursesRoute}/${courseId}/students/${studentId}`,
  },

  assignments: {
    getAll: teacherAssignmentsRoute,
    getByCourse: (courseId: string) =>
      `${teacherAssignmentsRoute}/course/${courseId}`,
    getById: (assignmentId: string) =>
      `${teacherAssignmentsRoute}/${assignmentId}`,
    create: teacherAssignmentsRoute,
    update: (assignmentId: string) =>
      `${teacherAssignmentsRoute}/${assignmentId}`,
    delete: (assignmentId: string) =>
      `${teacherAssignmentsRoute}/${assignmentId}`,
    getFiles: (assignmentId: string) =>
      `${teacherAssignmentsRoute}/${assignmentId}/files`,
    uploadFile: (assignmentId: string) =>
      `${teacherAssignmentsRoute}/${assignmentId}/files`,
    removeFile: (assignmentId: string, fileId: string) =>
      `${teacherAssignmentsRoute}/${assignmentId}/files/${fileId}`,
    attachFile: (assignmentId: string, fileId: string) =>
      `${teacherAssignmentsRoute}/${assignmentId}/attachments/${fileId}`,
    detachFile: (assignmentId: string, fileId: string) =>
      `${teacherAssignmentsRoute}/${assignmentId}/attachments/${fileId}`,
  },

  announcements: {
    getAll: teacherAnnouncementsRoute,
    getByCourse: (courseId: string) =>
      `${teacherAnnouncementsRoute}/courses/${courseId}`,
    getById: (announcementId: string) =>
      `${teacherAnnouncementsRoute}/${announcementId}`,
    create: teacherAnnouncementsRoute,
    update: (announcementId: string) =>
      `${teacherAnnouncementsRoute}/${announcementId}`,
    delete: (announcementId: string) =>
      `${teacherAnnouncementsRoute}/${announcementId}`,
    getFiles: (announcementId: string) =>
      `${teacherAnnouncementsRoute}/${announcementId}/files`,
    uploadFile: (announcementId: string) =>
      `${teacherAnnouncementsRoute}/${announcementId}/files`,
    attachFile: (announcementId: string, fileId: string) =>
      `${teacherAnnouncementsRoute}/${announcementId}/files/${fileId}`,
    detachFile: (announcementId: string, fileId: string) =>
      `${teacherAnnouncementsRoute}/${announcementId}/files/${fileId}`,
    removeFile: (announcementId: string, fileId: string) =>
      `${teacherAnnouncementsRoute}/${announcementId}/files/${fileId}`,
  },

  studyFolders: {
    getByCourse: (courseId: string) =>
      `${teacherStudyFoldersRoute}/courses/${courseId}`,
    getById: (folderId: string) => `${teacherStudyFoldersRoute}/${folderId}`,
    getCourseContent: (courseId: string) =>
      `${teacherStudyFoldersRoute}/course/${courseId}/content`,
    create: teacherStudyFoldersRoute,
    update: (folderId: string) => `${teacherStudyFoldersRoute}/${folderId}`,
    delete: (folderId: string) => `${teacherStudyFoldersRoute}/${folderId}`,
    move: (folderId: string) => `${teacherStudyFoldersRoute}/${folderId}/move`,
    getFiles: (folderId: string) =>
      `${teacherStudyFoldersRoute}/${folderId}/files`,
    uploadFile: (folderId: string) =>
      `${teacherStudyFoldersRoute}/${folderId}/files`,
    getFile: (fileId: string) =>
      `${teacherStudyFoldersRoute}/files/${fileId}`,
    removeFile: (folderId: string, fileId: string) =>
      `${teacherStudyFoldersRoute}/${folderId}/files/${fileId}`,
  },

  submissions: {
    getByAssignment: (assignmentId: string) =>
      `${teacherSubmissionsRoute}/assignments/${assignmentId}`,
    getById: (submissionId: string) =>
      `${teacherSubmissionsRoute}/${submissionId}`,
    grade: (submissionId: string) =>
      `${teacherSubmissionsRoute}/${submissionId}/grade`,
    getFiles: (submissionId: string) =>
      `${teacherSubmissionsRoute}/${submissionId}/files`,
  },
} as const;