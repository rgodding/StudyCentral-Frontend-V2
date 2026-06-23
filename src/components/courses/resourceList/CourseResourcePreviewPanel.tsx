import { HStack, Stack } from "@chakra-ui/react";
import { LuFolder } from "react-icons/lu";

import {
  StudyBadge,
  StudyCard,
  StudyHeading,
  StudyIconButton,
  StudyText,
} from "@/components/ui";
import type { CourseResourceRow } from "@/utils/resources/buildCourseResourceRows";
import { formatDate } from "@/utils/formatDateUtils";

import { CourseResourceFilePreviewCard } from "./CourseResourceFilePreviewCard";

type CourseResourcePreviewPanelProps = {
  selectedRow?: CourseResourceRow | null;
  onDownloadFile?: (row: CourseResourceRow) => void;
};

const courseResourcePreviewPanelText = {
  folder: "Folder",
  folderDetails: "Folder details",
  files: "Files",
  folders: "Folders",
  course: "Course",
  createdAt: "Created",
  updatedAt: "Updated",
  unknownValue: "Unknown",
  untitledFolder: "Untitled folder",
};

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
        {value ?? courseResourcePreviewPanelText.unknownValue}
      </StudyText>
    </Stack>
  );
}

export function CourseResourcePreviewPanel({
  selectedRow,
  onDownloadFile,
}: CourseResourcePreviewPanelProps) {
  if (!selectedRow) {
    return <CourseResourceFilePreviewCard file={null} />;
  }

  if (selectedRow.kind === "file") {
    return (
      <CourseResourceFilePreviewCard
        file={selectedRow.file ?? null}
        onDownloadFile={() => onDownloadFile?.(selectedRow)}
      />
    );
  }

  const folder = selectedRow.folder;
  const folderName =
    folder?.name?.trim() || courseResourcePreviewPanelText.untitledFolder;

  return (
    <StudyCard h="full" minH="360px">
      <Stack gap={5}>
        <HStack align="start" gap={3} minW={0}>
          <StudyIconButton
            aria-label={courseResourcePreviewPanelText.folder}
            variant="secondary"
            size="md"
            tabIndex={-1}
            pointerEvents="none"
            flexShrink={0}
          >
            <LuFolder />
          </StudyIconButton>

          <Stack gap={1} minW={0}>
            <StudyHeading variant="card" size="md" lineClamp={2}>
              {folderName}
            </StudyHeading>

            <StudyBadge variant="accent" size="sm">
              {courseResourcePreviewPanelText.folder}
            </StudyBadge>
          </Stack>
        </HStack>

        <Stack gap={1}>
          <StudyHeading variant="subtle" size="sm">
            {courseResourcePreviewPanelText.folderDetails}
          </StudyHeading>

          <StudyText variant="muted" size="sm">
            Folder metadata and contents summary.
          </StudyText>
        </Stack>

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
            label={courseResourcePreviewPanelText.course}
            value={folder?.courseName}
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
      </Stack>
    </StudyCard>
  );
}