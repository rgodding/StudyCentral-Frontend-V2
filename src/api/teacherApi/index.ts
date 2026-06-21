import { teacherAnnouncementApi } from "./teacherAnnouncementApi";
import { teacherAssignmentApi } from "./teacherAssignmentApi";
import { teacherCourseApi } from "./teacherCourseApi";
import { teacherStudyFolderApi } from "./teacherStudyFolderApi";
import { teacherSubmissionApi } from "./teacherSubmissionApi";

export const teacherApi = {
  courses: teacherCourseApi,
  assignments: teacherAssignmentApi,
  announcements: teacherAnnouncementApi,
  studyFolders: teacherStudyFolderApi,
  submissions: teacherSubmissionApi,
} as const;