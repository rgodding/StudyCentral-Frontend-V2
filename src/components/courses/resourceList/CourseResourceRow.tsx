import { Box, HStack } from "@chakra-ui/react";
import type { MouseEvent } from "react";
import {
  LuChevronDown,
  LuChevronRight,
  LuFile,
  LuFileAudio,
  LuFileImage,
  LuFileText,
  LuFileVideo,
  LuFolder,
} from "react-icons/lu";

import {
  StudyBadge,
  StudyIconButton,
  StudyListItem
} from "@/components/ui";
import type { FileType, Guid } from "@/types/api";
import type { CourseResourceRow as CourseResourceRowType } from "@/utils/resources";

type CourseResourceRowProps = {
  row: CourseResourceRowType;
  selected?: boolean;
  showExpandToggle?: boolean;
  onClick: (row: CourseResourceRowType) => void;
  onToggleFolder?: (folderId: Guid) => void;
};

const courseResourceRowText = {
  folder: "Folder",
  file: "File",
  files: "files",
  folders: "folders",
  expandFolder: "Expand folder",
  collapseFolder: "Collapse folder",
  unknownFileType: "Other",
  uploadedBy: "Uploaded by",
};

function getFileIcon(fileType?: FileType) {
  switch (fileType) {
    case "Image":
      return <LuFileImage />;
    case "Video":
      return <LuFileVideo />;
    case "Audio":
      return <LuFileAudio />;
    case "Pdf":
    case "Document":
      return <LuFileText />;
    case "Other":
    default:
      return <LuFile />;
  }
}

function getFileSizeLabel(fileSize?: number) {
  if (fileSize == null || fileSize <= 0) {
    return null;
  }

  if (fileSize < 1024) {
    return `${fileSize} B`;
  }

  if (fileSize < 1024 * 1024) {
    return `${Math.round(fileSize / 1024)} KB`;
  }

  return `${(fileSize / 1024 / 1024).toFixed(1)} MB`;
}

function getFolderMeta(row: CourseResourceRowType) {
  const folderCount = row.childFolderCount ?? 0;
  const fileCount = row.fileCount ?? 0;

  return `${folderCount} ${courseResourceRowText.folders} · ${fileCount} ${courseResourceRowText.files}`;
}

function getFileMeta(row: CourseResourceRowType) {
  const file = row.file;

  if (!file) {
    return null;
  }

  const parts = [
    file.fileType || courseResourceRowText.unknownFileType,
    getFileSizeLabel(file.fileSize),
    file.uploadedByName
      ? `${courseResourceRowText.uploadedBy} ${file.uploadedByName}`
      : null,
  ].filter(Boolean);

  return parts.join(" · ");
}

export function CourseResourceRow({
  row,
  selected = false,
  showExpandToggle = false,
  onClick,
  onToggleFolder,
}: CourseResourceRowProps) {
  const isFolder = row.kind === "folder";

  const canToggleFolder = Boolean(
    isFolder && showExpandToggle && row.hasChildren && onToggleFolder,
  );

  const meta = isFolder ? getFolderMeta(row) : getFileMeta(row);
  const icon = isFolder ? <LuFolder /> : getFileIcon(row.file?.fileType);

  function handleToggleFolder(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();

    if (!isFolder || !onToggleFolder) {
      return;
    }

    onToggleFolder(row.id);
    onClick(row);
  }

  function handleRowClick() {
    if (isFolder) {
      if (row.hasChildren && onToggleFolder) {
        onToggleFolder(row.id);
      }

      onClick(row);
      return;
    }

    onClick(row);
  }

  return (
    <Box pl={`${row.depth * 18}px`}>
      <StudyListItem
        title={row.name}
        description={meta}
        variant="interactive"
        size="sm"
        borderColor={!isFolder && selected ? "accent" : undefined}
        bg={!isFolder && selected ? "activeBg" : undefined}
        onClick={handleRowClick}
        leading={
          <HStack gap={1.5}>
            {showExpandToggle ? (
              canToggleFolder ? (
                <StudyIconButton
                  aria-label={
                    row.isExpanded
                      ? courseResourceRowText.collapseFolder
                      : courseResourceRowText.expandFolder
                  }
                  size="xs"
                  variant="ghost"
                  onClick={handleToggleFolder}
                >
                  {row.isExpanded ? <LuChevronDown /> : <LuChevronRight />}
                </StudyIconButton>
              ) : (
                <Box w="28px" h="28px" flexShrink={0} />
              )
            ) : null}

            <StudyIconButton
              aria-label={
                isFolder
                  ? courseResourceRowText.folder
                  : courseResourceRowText.file
              }
              size="sm"
              variant="ghost"
              tabIndex={-1}
              pointerEvents="none"
            >
              {icon}
            </StudyIconButton>
          </HStack>
        }
        trailing={
          <HStack gap={2}>
            <StudyBadge variant={isFolder ? "accent" : "neutral"} size="sm">
              {isFolder ? courseResourceRowText.folder : row.file?.fileType}
            </StudyBadge>
          </HStack>
        }
      />
    </Box>
  );
}
