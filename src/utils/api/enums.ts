export type UserRole = "Student" | "Teacher" | "Admin";

export type FileType =
  | "Image"
  | "Video"
  | "Audio"
  | "Pdf"
  | "Document"
  | "Other";

export type FileOwnerType =
  | "Folder"
  | "Assignment"
  | "Announcement"
  | "Submission";

export type GradeLetter = "A" | "B" | "C" | "D" | "F";

export type SubmissionStatus =
  | "NotSubmitted"
  | "Submitted"
  | "SubmittedLate"
  | "Passed"
  | "Failed";

export type ChatRoomType = "Course" | "Private" | "Group";