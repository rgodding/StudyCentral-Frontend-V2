import { Box, Grid, HStack, Stack } from "@chakra-ui/react";
import { LuDownload, LuFile, LuFolder, LuMoveLeft } from "react-icons/lu";

import { StudyButton, StudyIconButton, StudyText } from "@/components/ui";
import type { Guid } from "@/types/api";
import type { CourseResourceRow } from "@/utils/resources";
import { getCourseResourceFilePreviewType } from "@/utils/resources";

type CourseResourceFullListProps = {
  rows: CourseResourceRow[];
  currentFolderId: Guid | null;
  onOpenFolder: (folderId: Guid) => void;
  onBack: () => void;
  onPreviewFile?: (row: CourseResourceRow) => void;
  onDownloadFile?: (row: CourseResourceRow) => void;
};

const courseResourceFullListText = {
  title: "Title",
  published: "Published",
  actions: "Actions",
  open: "Open",
  download: "Download",
  back: "Back",
  noPublishedDate: "-",
};

function getPublishedLabel(row: CourseResourceRow) {
  const createdAt = row.folder?.createdAt ?? row.file?.createdAt;

  if (!createdAt) {
    return courseResourceFullListText.noPublishedDate;
  }

  return String(createdAt);
}

function canPreviewRow(row: CourseResourceRow) {
  if (row.kind !== "file" || !row.file) {
    return false;
  }

  return getCourseResourceFilePreviewType(row.file) !== "download";
}

export function CourseResourceFullList({
  rows,
  currentFolderId,
  onOpenFolder,
  onBack,
  onPreviewFile,
  onDownloadFile,
}: CourseResourceFullListProps) {
  return (
    <Stack gap={0}>
      {currentFolderId && (
        <Box px={4} py={3} borderBottomWidth="1px" borderColor="borderSubtle">
          <StudyButton variant="secondary" size="sm" onClick={onBack}>
            <HStack as="span" gap={2}>
              <LuMoveLeft />
              <span>{courseResourceFullListText.back}</span>
            </HStack>
          </StudyButton>
        </Box>
      )}

      <Grid
        templateColumns="minmax(0, 1fr) 220px 240px"
        px={4}
        py={3}
        borderBottomWidth="1px"
        borderColor="borderSubtle"
        gap={4}
      >
        <StudyText variant="label" size="sm">
          {courseResourceFullListText.title}
        </StudyText>

        <StudyText variant="label" size="sm">
          {courseResourceFullListText.published}
        </StudyText>

        <StudyText variant="label" size="sm">
          {courseResourceFullListText.actions}
        </StudyText>
      </Grid>

      {rows.map((row) => {
        const isFolder = row.kind === "folder";
        const isPreviewable = canPreviewRow(row);

        return (
          <Grid
            key={`${row.kind}-${row.id}`}
            templateColumns="minmax(0, 1fr) 220px 240px"
            alignItems="center"
            px={4}
            py={3}
            gap={4}
            borderBottomWidth="1px"
            borderColor="borderSubtle"
            _hover={{
              bg: "panelBgSubtle",
            }}
          >
            <HStack gap={3} minW={0}>
              <StudyIconButton
                aria-label={isFolder ? "Folder" : "File"}
                variant="ghost"
                size="sm"
                tabIndex={-1}
                pointerEvents="none"
                flexShrink={0}
              >
                {isFolder ? <LuFolder /> : <LuFile />}
              </StudyIconButton>

              <StudyText fontWeight="semibold" truncate>
                {row.name}
              </StudyText>
            </HStack>

            <StudyText variant="muted" size="sm" truncate>
              {getPublishedLabel(row)}
            </StudyText>

            {isFolder ? (
              <StudyButton
                variant="secondary"
                size="sm"
                onClick={() => onOpenFolder(row.id)}
              >
                {courseResourceFullListText.open}
              </StudyButton>
            ) : isPreviewable ? (
              <StudyButton
                variant="secondary"
                size="sm"
                disabled={!onPreviewFile}
                onClick={() => onPreviewFile?.(row)}
              >
                {courseResourceFullListText.open}
              </StudyButton>
            ) : (
              <StudyButton
                variant="secondary"
                size="sm"
                disabled={!onDownloadFile}
                onClick={() => onDownloadFile?.(row)}
              >
                <HStack as="span" gap={2}>
                  <LuDownload />
                  <span>{courseResourceFullListText.download}</span>
                </HStack>
              </StudyButton>
            )}
          </Grid>
        );
      })}
    </Stack>
  );
}