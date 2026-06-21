export type FileKind =
  | "IMG"
  | "VID"
  | "AUD"
  | "PDF"
  | "DOC"
  | "XLS"
  | "PPT"
  | "ZIP"
  | "TXT"
  | "FILE";

export type FileNameParts = {
  base: string;
  extension: string;
};

export function getFileNameParts(
  fileName: string,
  maxBaseLength = 22,
): FileNameParts {
  const lastDotIndex = fileName.lastIndexOf(".");

  if (lastDotIndex === -1) {
    return {
      base:
        fileName.length > maxBaseLength
          ? `${fileName.slice(0, maxBaseLength)}...`
          : fileName,
      extension: "",
    };
  }

  const baseName = fileName.slice(0, lastDotIndex);
  const extension = fileName.slice(lastDotIndex);

  return {
    base:
      baseName.length > maxBaseLength
        ? `${baseName.slice(0, maxBaseLength)}...`
        : baseName,
    extension,
  };
}

export function getFileExtension(fileName: string): string {
  const lastDotIndex = fileName.lastIndexOf(".");

  if (lastDotIndex === -1) {
    return "";
  }

  return fileName.slice(lastDotIndex + 1).toLowerCase();
}

export function getFileKind(file: File): FileKind {
  const mimeType = file.type.toLowerCase();
  const extension = getFileExtension(file.name);

  if (
    mimeType.startsWith("image/") ||
    extension === "jpg" ||
    extension === "jpeg" ||
    extension === "png" ||
    extension === "gif" ||
    extension === "webp" ||
    extension === "svg"
  ) {
    return "IMG";
  }

  if (
    mimeType.startsWith("video/") ||
    extension === "mp4" ||
    extension === "webm" ||
    extension === "mov" ||
    extension === "avi" ||
    extension === "mkv"
  ) {
    return "VID";
  }

  if (
    mimeType.startsWith("audio/") ||
    extension === "mp3" ||
    extension === "wav" ||
    extension === "ogg" ||
    extension === "m4a"
  ) {
    return "AUD";
  }

  if (mimeType === "application/pdf" || extension === "pdf") {
    return "PDF";
  }

  if (mimeType.includes("word") || extension === "doc" || extension === "docx") {
    return "DOC";
  }

  if (
    mimeType.includes("excel") ||
    mimeType.includes("spreadsheet") ||
    extension === "xls" ||
    extension === "xlsx" ||
    extension === "csv"
  ) {
    return "XLS";
  }

  if (
    mimeType.includes("powerpoint") ||
    mimeType.includes("presentation") ||
    extension === "ppt" ||
    extension === "pptx"
  ) {
    return "PPT";
  }

  if (extension === "zip" || extension === "rar" || extension === "7z") {
    return "ZIP";
  }

  if (
    extension === "txt" ||
    extension === "md" ||
    extension === "json" ||
    extension === "xml"
  ) {
    return "TXT";
  }

  return "FILE";
}