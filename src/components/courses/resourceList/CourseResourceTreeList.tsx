import { Box, Grid, HStack } from "@chakra-ui/react";
import type { MouseEvent } from "react";
import {
  LuChevronDown,
  LuChevronRight,
  LuDownload,
  LuFile,
  LuFileAudio,
  LuFileImage,
  LuFileText,
  LuFileVideo,
  LuFolder,
} from "react-icons/lu";

import {
  StudyBadge,
  StudyButton,
  StudyIconButton,
  StudyText,
} from "@/components/ui";
import type { FileType, Guid } from "@/types/api";
import type { CourseResourceRow } from "@/utils/resources";
import {
  getCourseResourceFilePreviewType,
  getCourseResourceFileSizeLabel,
} from "@/utils/resources";

type CourseResourceTreeListProps = {
  rows: CourseResourceRow[];
  onToggleFolder: (folderId: Guid) => void;
  onPreviewFile?: (row: CourseResourceRow) => void;
  onDownloadFile?: (row: CourseResourceRow) => void;
};

const courseResourceTreeListText = {
  name: "Name",
  type: "Type",
  size: "Size",
  uploadedBy: "Uploaded by",
  actions: "Actions",
  folder: "Folder",
  file: "File",
  expandFolder: "Expand folder",
  collapseFolder: "Collapse folder",
  open: "Open",
  download: "Download",
  unknownValue: "-",
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

function canPreviewRow(row: CourseResourceRow) {
  if (row.kind !== "file" || !row.file) {
    return false;
  }

  return getCourseResourceFilePreviewType(row.file) !== "download";
}

export function CourseResourceTreeList({
  rows,
  onToggleFolder,
  onPreviewFile,
  onDownloadFile,
}: CourseResourceTreeListProps) {
  function handleToggleFolder(
    event: MouseEvent<HTMLButtonElement>,
    folderId: Guid,
  ) {
    event.stopPropagation();
    onToggleFolder(folderId);
  }

  function handleRowClick(row: CourseResourceRow) {
    if (row.kind === "folder") {
      if (row.hasChildren) {
        onToggleFolder(row.id);
      }

      return;
    }

    if (canPreviewRow(row)) {
      onPreviewFile?.(row);
      return;
    }

    onDownloadFile?.(row);
  }

  function handleActionClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
  }

  return (
    <Box overflowX="auto">
      <Grid
        templateColumns="minmax(360px, 1fr) 140px 120px 220px 180px"
        minW="980px"
        px={4}
        py={3}
        borderBottomWidth="1px"
        borderColor="borderSubtle"
        gap={4}
      >
        <StudyText variant="label" size="sm">
          {courseResourceTreeListText.name}
        </StudyText>

        <StudyText variant="label" size="sm">
          {courseResourceTreeListText.type}
        </StudyText>

        <StudyText variant="label" size="sm">
          {courseResourceTreeListText.size}
        </StudyText>

        <StudyText variant="label" size="sm">
          {courseResourceTreeListText.uploadedBy}
        </StudyText>

        <StudyText variant="label" size="sm">
          {courseResourceTreeListText.actions}
        </StudyText>
      </Grid>

      {rows.map((row) => {
        const isFolder = row.kind === "folder";
        const canToggleFolder = isFolder && row.hasChildren;
        const isPreviewable = canPreviewRow(row);

        return (
          <Grid
            key={`${row.kind}-${row.id}`}
            templateColumns="minmax(360px, 1fr) 140px 120px 220px 180px"
            minW="980px"
            alignItems="center"
            px={4}
            py={2.5}
            gap={4}
            borderBottomWidth="1px"
            borderColor="borderSubtle"
            cursor={
              isFolder
                ? canToggleFolder
                  ? "pointer"
                  : "default"
                : isPreviewable || onDownloadFile
                  ? "pointer"
                  : "default"
            }
            _hover={{
              bg: "panelBgSubtle",
            }}
            onClick={() => handleRowClick(row)}
          >
            <HStack gap={2} minW={0} pl={`${row.depth * 22}px`}>
              {isFolder ? (
                canToggleFolder ? (
                  <StudyIconButton
                    aria-label={
                      row.isExpanded
                        ? courseResourceTreeListText.collapseFolder
                        : courseResourceTreeListText.expandFolder
                    }
                    variant="ghost"
                    size="xs"
                    onClick={(event) => handleToggleFolder(event, row.id)}
                  >
                    {row.isExpanded ? <LuChevronDown /> : <LuChevronRight />}
                  </StudyIconButton>
                ) : (
                  <Box w="28px" h="28px" flexShrink={0} />
                )
              ) : (
                <Box w="28px" h="28px" flexShrink={0} />
              )}

              <StudyIconButton
                aria-label={
                  isFolder
                    ? courseResourceTreeListText.folder
                    : courseResourceTreeListText.file
                }
                variant="ghost"
                size="sm"
                tabIndex={-1}
                pointerEvents="none"
                flexShrink={0}
              >
                {isFolder ? <LuFolder /> : getFileIcon(row.file?.fileType)}
              </StudyIconButton>

              <StudyText fontWeight="semibold" truncate>
                {row.name}
              </StudyText>
            </HStack>

            <Box justifySelf="start" maxW="full">
              <StudyBadge
                variant={isFolder ? "accent" : "neutral"}
                size="sm"
                w="fit-content"
                maxW="full"
              >
                {isFolder
                  ? courseResourceTreeListText.folder
                  : row.file?.fileType ?? courseResourceTreeListText.file}
              </StudyBadge>
            </Box>

            <StudyText variant="muted" size="sm" truncate>
              {isFolder
                ? courseResourceTreeListText.unknownValue
                : getCourseResourceFileSizeLabel(row.file?.fileSize)}
            </StudyText>

            <StudyText variant="muted" size="sm" truncate>
              {isFolder
                ? courseResourceTreeListText.unknownValue
                : row.file?.uploadedByName ??
                  courseResourceTreeListText.unknownValue}
            </StudyText>

            {isFolder ? (
              <StudyText variant="subtle" size="sm">
                {`${row.childFolderCount ?? 0} folders · ${
                  row.fileCount ?? 0
                } files`}
              </StudyText>
            ) : isPreviewable ? (
              <StudyButton
                variant="secondary"
                size="sm"
                disabled={!onPreviewFile}
                onClick={(event) => {
                  handleActionClick(event);
                  onPreviewFile?.(row);
                }}
              >
                {courseResourceTreeListText.open}
              </StudyButton>
            ) : (
              <StudyButton
                variant="secondary"
                size="sm"
                disabled={!onDownloadFile}
                onClick={(event) => {
                  handleActionClick(event);
                  onDownloadFile?.(row);
                }}
              >
                <HStack as="span" gap={2}>
                  <LuDownload />
                  <span>{courseResourceTreeListText.download}</span>
                </HStack>
              </StudyButton>
            )}
          </Grid>
        );
      })}
    </Box>
  );
}