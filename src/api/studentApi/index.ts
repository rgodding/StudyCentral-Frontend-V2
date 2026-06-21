import { studentAnnouncementApi } from "./studentAnnouncementApi";
import { studentAssignmentApi } from "./studentAssignmentApi";
import { studentCourseApi } from "./studentCourseApi";
import { studentStudyFolderApi } from "./studentStudyFolderApi";
import { studentSubmissionApi } from "./studentSubmissionApi";

export const studentApi = {
  courses: studentCourseApi,
  assignments: studentAssignmentApi,
  announcements: studentAnnouncementApi,
  studyFolders: studentStudyFolderApi,
  submissions: studentSubmissionApi,
} as const;