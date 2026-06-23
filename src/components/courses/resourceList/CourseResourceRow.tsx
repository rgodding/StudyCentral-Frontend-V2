import { Box, HStack } from "@chakra-ui/react";
import {
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
  StudyListItem,
  StudyText,
} from "@/components/ui";
import type { FileType } from "@/types/api";
import type { CourseResourceRow as CourseResourceRowType } from "@/utils/resources/buildCourseResourceRows";

type CourseResourceRowProps = {
  row: CourseResourceRowType;
  selected?: boolean;
  onClick: (row: CourseResourceRowType) => void;
};

const courseResourceRowText = {
  folder: "Folder",
  file: "File",
  files: "files",
  folders: "folders",
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
  const parts: string[] = [];

  if (row.childFolderCount != null && row.childFolderCount > 0) {
    parts.push(`${row.childFolderCount} ${courseResourceRowText.folders}`);
  }

  if (row.fileCount != null && row.fileCount > 0) {
    parts.push(`${row.fileCount} ${courseResourceRowText.files}`);
  }

  return parts.join(" · ");
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
  onClick,
}: CourseResourceRowProps) {
  const isFolder = row.kind === "folder";
  const meta = isFolder ? getFolderMeta(row) : getFileMeta(row);
  const icon = isFolder ? <LuFolder /> : getFileIcon(row.file?.fileType);

  return (
    <Box pl={`${row.depth * 18}px`}>
      <StudyListItem
        title={row.name}
        description={meta}
        variant="interactive"
        size="sm"
        borderColor={selected ? "accent" : undefined}
        bg={selected ? "activeBg" : undefined}
        onClick={() => onClick(row)}
        leading={
          <StudyIconButton
            aria-label={
              isFolder ? courseResourceRowText.folder : courseResourceRowText.file
            }
            size="sm"
            variant="ghost"
            tabIndex={-1}
            pointerEvents="none"
          >
            {icon}
          </StudyIconButton>
        }
        trailing={
          <HStack gap={2}>
            <StudyBadge variant={isFolder ? "accent" : "neutral"} size="sm">
              {isFolder ? courseResourceRowText.folder : row.file?.fileType}
            </StudyBadge>

            {!isFolder && row.file?.contentType && (
              <StudyText variant="subtle" size="xs" whiteSpace="nowrap">
                {row.file.contentType}
              </StudyText>
            )}
          </HStack>
        }
      />
    </Box>
  );
}