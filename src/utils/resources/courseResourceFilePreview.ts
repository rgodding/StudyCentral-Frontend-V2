import { fileApi } from "@/api/fileApi";
import type { StudyFileDto } from "@/types/api";

export type CourseResourceFilePreviewType =
  | "image"
  | "pdf"
  | "video"
  | "audio"
  | "text"
  | "download";

const textPreviewExtensions = [
  ".txt",
  ".md",
  ".csv",
  ".json",
  ".xml",
  ".log",
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".css",
  ".html",
];

const textPreviewContentTypes = [
  "application/json",
  "application/xml",
  "text/csv",
];

export function getCourseResourceFileName(file: StudyFileDto) {
  return file.fileName?.trim() || "Untitled file";
}

export function getCourseResourcePreviewUrl(file: StudyFileDto) {
  return fileApi.getPreviewUrl(file.id);
}

export function getCourseResourceDownloadUrl(file: StudyFileDto) {
  return fileApi.getDownloadUrl(file.id);
}

export function getCourseResourceFilePreviewType(
  file: StudyFileDto,
): CourseResourceFilePreviewType {
  const contentType = file.contentType?.toLowerCase() ?? "";
  const fileName = getCourseResourceFileName(file).toLowerCase();

  if (contentType.startsWith("image/")) {
    return "image";
  }

  if (contentType === "application/pdf" || fileName.endsWith(".pdf")) {
    return "pdf";
  }

  if (contentType.startsWith("video/")) {
    return "video";
  }

  if (contentType.startsWith("audio/")) {
    return "audio";
  }

  if (
    contentType.startsWith("text/") ||
    textPreviewContentTypes.includes(contentType) ||
    textPreviewExtensions.some((extension) => fileName.endsWith(extension))
  ) {
    return "text";
  }

  return "download";
}

export function getCourseResourceFileSizeLabel(fileSize?: number | null) {
  if (fileSize == null || fileSize <= 0) {
    return "Unknown size";
  }

  if (fileSize < 1024) {
    return `${fileSize} B`;
  }

  if (fileSize < 1024 * 1024) {
    return `${Math.round(fileSize / 1024)} KB`;
  }

  return `${(fileSize / 1024 / 1024).toFixed(1)} MB`;
}