export const queryKeys = {
  auth: {
    currentUser: ["auth", "currentUser"] as const,
  },

  account: {
    me: ["account", "me"] as const,
  },

  teacher: {
    courses: ["teacher", "courses"] as const,
    course: (courseId: string) => ["teacher", "courses", courseId] as const,
    courseStudents: (courseId: string) =>
      ["teacher", "courses", courseId, "students"] as const,

    assignments: ["teacher", "assignments"] as const,
    assignmentsByCourse: (courseId: string) =>
      ["teacher", "assignments", "course", courseId] as const,
    assignment: (assignmentId: string) =>
      ["teacher", "assignments", assignmentId] as const,
    assignmentFiles: (assignmentId: string) =>
      ["teacher", "assignments", assignmentId, "files"] as const,

    announcements: ["teacher", "announcements"] as const,
    announcementsByCourse: (courseId: string) =>
      ["teacher", "announcements", "course", courseId] as const,
    announcement: (announcementId: string) =>
      ["teacher", "announcements", announcementId] as const,
    announcementFiles: (announcementId: string) =>
      ["teacher", "announcements", announcementId, "files"] as const,

    studyFoldersByCourse: (courseId: string, parentFolderId?: string | null) =>
      ["teacher", "studyFolders", "course", courseId, parentFolderId ?? null] as const,
    studyFolder: (folderId: string) =>
      ["teacher", "studyFolders", folderId] as const,
    studyFolderFiles: (folderId: string) =>
      ["teacher", "studyFolders", folderId, "files"] as const,

    submissionsByAssignment: (assignmentId: string) =>
      ["teacher", "submissions", "assignment", assignmentId] as const,
    submission: (submissionId: string) =>
      ["teacher", "submissions", submissionId] as const,
    submissionFiles: (submissionId: string) =>
      ["teacher", "submissions", submissionId, "files"] as const,
  },

  student: {
    courses: ["student", "courses"] as const,
    course: (courseId: string) => ["student", "courses", courseId] as const,
    courseStudents: (courseId: string) =>
      ["student", "courses", courseId, "students"] as const,

    assignments: ["student", "assignments"] as const,
    assignmentsByCourse: (courseId: string) =>
      ["student", "assignments", "course", courseId] as const,
    assignment: (assignmentId: string) =>
      ["student", "assignments", assignmentId] as const,
    assignmentFiles: (assignmentId: string) =>
      ["student", "assignments", assignmentId, "files"] as const,

    announcements: ["student", "announcements"] as const,
    announcementsByCourse: (courseId: string) =>
      ["student", "announcements", "course", courseId] as const,
    announcement: (announcementId: string) =>
      ["student", "announcements", announcementId] as const,
    announcementFiles: (announcementId: string) =>
      ["student", "announcements", announcementId, "files"] as const,

    studyFoldersByCourse: (courseId: string, parentFolderId?: string | null) =>
      ["student", "studyFolders", "course", courseId, parentFolderId ?? null] as const,
    studyFolder: (folderId: string) =>
      ["student", "studyFolders", folderId] as const,
    studyFolderFiles: (folderId: string) =>
      ["student", "studyFolders", folderId, "files"] as const,

    submissions: ["student", "submissions"] as const,
    submission: (submissionId: string) =>
      ["student", "submissions", submissionId] as const,
    submissionFiles: (submissionId: string) =>
      ["student", "submissions", submissionId, "files"] as const,
  },
} as const;