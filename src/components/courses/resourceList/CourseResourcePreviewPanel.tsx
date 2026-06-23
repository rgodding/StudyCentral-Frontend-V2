import { HStack, Stack } from "@chakra-ui/react";
import {
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
  StudyCard,
  StudyHeading,
  StudyIconButton,
  StudyText,
} from "@/components/ui";
import type { FileType } from "@/types/api";
import type { CourseResourceRow } from "@/utils/resources/buildCourseResourceRows";
import { formatDate } from "@/utils/formatDateUtils";

type CourseResourcePreviewPanelProps = {
  selectedRow?: CourseResourceRow | null;
  onDownloadFile?: (row: CourseResourceRow) => void;
};

const courseResourcePreviewPanelText = {
  emptyTitle: "No resource selected",
  emptyDescription: "Select a folder or file to view details.",
  folder: "Folder",
  file: "File",
  files: "files",
  folders: "folders",
  fileType: "File type",
  contentType: "Content type",
  fileSize: "File size",
  uploadedBy: "Uploaded by",
  createdAt: "Created",
  updatedAt: "Updated",
  download: "Download",
  unknownValue: "Unknown",
  untitledFolder: "Untitled folder",
  untitledFile: "Untitled file",
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
    return courseResourcePreviewPanelText.unknownValue;
  }

  if (fileSize < 1024) {
    return `${fileSize} B`;
  }

  if (fileSize < 1024 * 1024) {
    return `${Math.round(fileSize / 1024)} KB`;
  }

  return `${(fileSize / 1024 / 1024).toFixed(1)} MB`;
}

function ResourceDetail({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) {
  return (
    <Stack gap={0.5}>
      <StudyText variant="subtle" size="xs">
        {label}
      </StudyText>

      <StudyText variant="body" size="sm">
        {value || courseResourcePreviewPanelText.unknownValue}
      </StudyText>
    </Stack>
  );
}

export function CourseResourcePreviewPanel({
  selectedRow,
  onDownloadFile,
}: CourseResourcePreviewPanelProps) {
  if (!selectedRow) {
    return (
      <StudyCard variant="subtle" shadowSize="none" h="full">
        <Stack gap={2}>
          <StudyHeading variant="card" size="md">
            {courseResourcePreviewPanelText.emptyTitle}
          </StudyHeading>

          <StudyText variant="muted">
            {courseResourcePreviewPanelText.emptyDescription}
          </StudyText>
        </Stack>
      </StudyCard>
    );
  }

  const isFolder = selectedRow.kind === "folder";
  const file = selectedRow.file;
  const folder = selectedRow.folder;

  const title = isFolder
    ? folder?.name?.trim() || courseResourcePreviewPanelText.untitledFolder
    : file?.fileName?.trim() || courseResourcePreviewPanelText.untitledFile;

  const icon = isFolder ? <LuFolder /> : getFileIcon(file?.fileType);

  return (
    <StudyCard h="full">
      <Stack gap={5}>
        <HStack align="start" justify="space-between" gap={4}>
          <HStack align="start" gap={3} minW={0}>
            <StudyIconButton
              aria-label={
                isFolder
                  ? courseResourcePreviewPanelText.folder
                  : courseResourcePreviewPanelText.file
              }
              variant="secondary"
              size="md"
              tabIndex={-1}
              pointerEvents="none"
              flexShrink={0}
            >
              {icon}
            </StudyIconButton>

            <Stack gap={1} minW={0}>
              <StudyHeading variant="card" size="md" lineClamp={2}>
                {title}
              </StudyHeading>

              <StudyBadge variant={isFolder ? "accent" : "neutral"} size="sm">
                {isFolder
                  ? courseResourcePreviewPanelText.folder
                  : file?.fileType}
              </StudyBadge>
            </Stack>
          </HStack>

          {!isFolder && onDownloadFile && (
            <StudyButton
              size="sm"
              variant="secondary"
              onClick={() => onDownloadFile(selectedRow)}
            >
              <HStack as="span" gap={2}>
                <LuDownload />
                <span>{courseResourcePreviewPanelText.download}</span>
              </HStack>
            </StudyButton>
          )}
        </HStack>

        {isFolder ? (
          <Stack gap={4}>
            <ResourceDetail
              label={courseResourcePreviewPanelText.folders}
              value={selectedRow.childFolderCount ?? 0}
            />

            <ResourceDetail
              label={courseResourcePreviewPanelText.files}
              value={selectedRow.fileCount ?? 0}
            />

            <ResourceDetail
              label={courseResourcePreviewPanelText.createdAt}
              value={folder?.createdAt ? formatDate(folder.createdAt) : null}
            />

            <ResourceDetail
              label={courseResourcePreviewPanelText.updatedAt}
              value={folder?.updatedAt ? formatDate(folder.updatedAt) : null}
            />
          </Stack>
        ) : (
          <Stack gap={4}>
            <ResourceDetail
              label={courseResourcePreviewPanelText.fileType}
              value={file?.fileType}
            />

            <ResourceDetail
              label={courseResourcePreviewPanelText.contentType}
              value={file?.contentType}
            />

            <ResourceDetail
              label={courseResourcePreviewPanelText.fileSize}
              value={getFileSizeLabel(file?.fileSize)}
            />

            <ResourceDetail
              label={courseResourcePreviewPanelText.uploadedBy}
              value={file?.uploadedByName}
            />

            <ResourceDetail
              label={courseResourcePreviewPanelText.createdAt}
              value={file?.createdAt ? formatDate(file.createdAt) : null}
            />

            <ResourceDetail
              label={courseResourcePreviewPanelText.updatedAt}
              value={file?.updatedAt ? formatDate(file.updatedAt) : null}
            />
          </Stack>
        )}
      </Stack>
    </StudyCard>
  );
}