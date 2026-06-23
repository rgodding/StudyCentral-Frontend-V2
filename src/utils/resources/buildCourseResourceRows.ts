import type { Guid, StudyFileDto, StudyFolderDto } from "@/types/api";

export type CourseResourceViewMode = "split" | "full" | "tree";

export type CourseResourceRowKind = "folder" | "file";

export type CourseResourceRow = {
  id: Guid;
  kind: CourseResourceRowKind;
  name: string;
  parentFolderId: Guid | null;
  depth: number;
  isExpanded?: boolean;
  hasChildren?: boolean;
  fileCount?: number;
  childFolderCount?: number;
  file?: StudyFileDto;
  folder?: StudyFolderDto;
};

type BuildCourseResourceRowsArgs = {
  folders: StudyFolderDto[];
  files: StudyFileDto[];
  expandedFolderIds?: Set<Guid>;
  parentFolderId?: Guid | null;
  depth?: number;
};

type BuildCourseFolderContentRowsArgs = {
  folders: StudyFolderDto[];
  files: StudyFileDto[];
  parentFolderId?: Guid | null;
};

type GetFolderPathArgs = {
  folders: StudyFolderDto[];
  folderId: Guid | null;
};

export function getFolderParentId(folder: StudyFolderDto) {
  return folder.parentFolderId ?? null;
}

export function getFileParentFolderId(file: StudyFileDto) {
  if (file.ownerType !== "Folder") {
    return null;
  }

  return file.ownerId ?? null;
}

export function getFolderName(folder: StudyFolderDto) {
  return folder.name?.trim() || "Untitled folder";
}

export function getFileName(file: StudyFileDto) {
  return file.fileName?.trim() || "Untitled file";
}

export function folderHasChildren(folder: StudyFolderDto) {
  return folder.childFolderCount > 0 || folder.fileCount > 0;
}

export function buildCourseResourceRows({
  folders,
  files,
  expandedFolderIds,
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
    const isExpanded = expandedFolderIds?.has(folder.id) ?? true;

    const folderRow: CourseResourceRow = {
      id: folder.id,
      kind: "folder",
      name: getFolderName(folder),
      parentFolderId: getFolderParentId(folder),
      depth,
      isExpanded,
      hasChildren: folderHasChildren(folder),
      fileCount: folder.fileCount,
      childFolderCount: folder.childFolderCount,
      folder,
    };

    if (!isExpanded) {
      return [folderRow];
    }

    return [
      folderRow,
      ...buildCourseResourceRows({
        folders,
        files,
        expandedFolderIds,
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

export function buildCourseFolderContentRows({
  folders,
  files,
  parentFolderId = null,
}: BuildCourseFolderContentRowsArgs): CourseResourceRow[] {
  const childFolders = folders
    .filter((folder) => getFolderParentId(folder) === parentFolderId)
    .sort((a, b) => getFolderName(a).localeCompare(getFolderName(b)));

  const childFiles = files
    .filter((file) => getFileParentFolderId(file) === parentFolderId)
    .sort((a, b) => getFileName(a).localeCompare(getFileName(b)));

  const folderRows = childFolders.map(
    (folder): CourseResourceRow => ({
      id: folder.id,
      kind: "folder",
      name: getFolderName(folder),
      parentFolderId: getFolderParentId(folder),
      depth: 0,
      hasChildren: folderHasChildren(folder),
      fileCount: folder.fileCount,
      childFolderCount: folder.childFolderCount,
      folder,
    }),
  );

  const fileRows = childFiles.map(
    (file): CourseResourceRow => ({
      id: file.id,
      kind: "file",
      name: getFileName(file),
      parentFolderId: getFileParentFolderId(file),
      depth: 0,
      file,
    }),
  );

  return [...folderRows, ...fileRows];
}

export function getDescendantFolderIds(
  parentFolderId: Guid | null,
  folders: StudyFolderDto[],
) {
  const result = new Set<Guid>();

  function collectChildren(currentParentFolderId: Guid | null) {
    const children = folders.filter(
      (folder) => getFolderParentId(folder) === currentParentFolderId,
    );

    children.forEach((child) => {
      result.add(child.id);
      collectChildren(child.id);
    });
  }

  collectChildren(parentFolderId);

  return result;
}

export function getFolderPath({ folders, folderId }: GetFolderPathArgs) {
  if (!folderId) {
    return [];
  }

  const currentFolder = folders.find((folder) => folder.id === folderId);

  if (!currentFolder) {
    return [];
  }

  const path: StudyFolderDto[] = [currentFolder];
  let currentParentFolderId = currentFolder.parentFolderId;

  while (currentParentFolderId) {
    const parentFolder = folders.find(
      (folder) => folder.id === currentParentFolderId,
    );

    if (!parentFolder) {
      break;
    }

    path.unshift(parentFolder);
    currentParentFolderId = parentFolder.parentFolderId;
  }

  return path;
}

export function searchCourseResourceRows({
  rows,
  searchValue,
}: {
  rows: CourseResourceRow[];
  searchValue: string;
}) {
  const normalizedSearchValue = searchValue.trim().toLowerCase();

  if (!normalizedSearchValue) {
    return rows;
  }

  return rows.filter((row) => {
    const searchableValues = [
      row.name,
      row.kind,
      row.file?.fileType,
      row.file?.contentType,
      row.file?.uploadedByName,
      row.folder?.courseName,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchableValues.includes(normalizedSearchValue);
  });
}