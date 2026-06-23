import type { Guid, StudyFileDto, StudyFolderDto } from "@/types/api";

export type CourseResourceRowKind = "folder" | "file";

export type CourseResourceRow = {
  id: Guid;
  kind: CourseResourceRowKind;
  name: string;
  parentFolderId: Guid | null;
  depth: number;
  fileCount?: number;
  childFolderCount?: number;
  file?: StudyFileDto;
  folder?: StudyFolderDto;
};

type BuildCourseResourceRowsArgs = {
  folders: StudyFolderDto[];
  files: StudyFileDto[];
  parentFolderId?: Guid | null;
  depth?: number;
};

function getFolderParentId(folder: StudyFolderDto) {
  return folder.parentFolderId ?? null;
}

function getFileParentFolderId(file: StudyFileDto) {
  if (file.ownerType !== "Folder") {
    return null;
  }

  return file.ownerId ?? null;
}

function getFolderName(folder: StudyFolderDto) {
  return folder.name?.trim() || "Untitled folder";
}

function getFileName(file: StudyFileDto) {
  return file.fileName?.trim() || "Untitled file";
}

export function buildCourseResourceRows({
  folders,
  files,
  parentFolderId = null,
  depth = 0,
}: BuildCourseResourceRowsArgs): CourseResourceRow[] {
  const childFolders = folders
    .filter((folder) => getFolderParentId(folder) === parentFolderId)
    .sort((a, b) => getFolderName(a).localeCompare(getFolderName(b)));

  const childFiles = files
    .filter((file) => getFileParentFolderId(file) === parentFolderId)
    .sort((a, b) => getFileName(a).localeCompare(getFileName(b)));

  const folderRows = childFolders.flatMap((folder): CourseResourceRow[] => {
    const folderRow: CourseResourceRow = {
      id: folder.id,
      kind: "folder",
      name: getFolderName(folder),
      parentFolderId: folder.parentFolderId,
      depth,
      fileCount: folder.fileCount,
      childFolderCount: folder.childFolderCount,
      folder,
    };

    return [
      folderRow,
      ...buildCourseResourceRows({
        folders,
        files,
        parentFolderId: folder.id,
        depth: depth + 1,
      }),
    ];
  });

  const fileRows = childFiles.map(
    (file): CourseResourceRow => ({
      id: file.id,
      kind: "file",
      name: getFileName(file),
      parentFolderId: getFileParentFolderId(file),
      depth,
      file,
    }),
  );

  return [...folderRows, ...fileRows];
}