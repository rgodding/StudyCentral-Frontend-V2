import { Box, HStack, Stack } from "@chakra-ui/react";
import {
  LuDownload,
  LuFile,
  LuFileAudio,
  LuFileImage,
  LuFileText,
  LuFileVideo,
} from "react-icons/lu";

import {
  StudyBadge,
  StudyButton,
  StudyCard,
  StudyHeading,
  StudyIconButton,
  StudyImage,
  StudyText,
} from "@/components/ui";
import type { StudyFileDto } from "@/types/api";
import {
  getCourseResourceFileName,
  getCourseResourceFilePreviewType,
  getCourseResourceFileSizeLabel,
  getCourseResourcePreviewUrl,
} from "@/utils/resources/courseResourceFilePreview";

type CourseResourceFilePreviewCardProps = {
  file: StudyFileDto | null;
  showHeader?: boolean;
  onDownloadFile?: (file: StudyFileDto) => void;
};

const courseResourceFilePreviewCardText = {
  noFileTitle: "No file selected",
  noFileDescription: "Select a file to preview it here.",
  previewNotAvailable: "Preview not available",
  previewNotAvailableDescription:
    "This file type cannot be previewed in the browser.",
  download: "Download",
  unknownFileType: "Unknown file type",
  browserNoVideo: "Your browser does not support video preview.",
  browserNoAudio: "Your browser does not support audio preview.",
};

function getPreviewIcon(file: StudyFileDto | null) {
  if (!file) {
    return <LuFile />;
  }

  switch (getCourseResourceFilePreviewType(file)) {
    case "image":
      return <LuFileImage />;
    case "pdf":
    case "text":
      return <LuFileText />;
    case "video":
      return <LuFileVideo />;
    case "audio":
      return <LuFileAudio />;
    case "download":
    default:
      return <LuFile />;
  }
}

function NoFileSelected() {
  return (
    <StudyCard
      variant="subtle"
      shadowSize="none"
      h="full"
      minH="360px"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Stack gap={3} align="center" textAlign="center">
        <StudyIconButton
          aria-label={courseResourceFilePreviewCardText.noFileTitle}
          variant="secondary"
          size="lg"
          tabIndex={-1}
          pointerEvents="none"
        >
          <LuFile />
        </StudyIconButton>

        <Stack gap={1}>
          <StudyHeading variant="card" size="md">
            {courseResourceFilePreviewCardText.noFileTitle}
          </StudyHeading>

          <StudyText variant="muted">
            {courseResourceFilePreviewCardText.noFileDescription}
          </StudyText>
        </Stack>
      </Stack>
    </StudyCard>
  );
}

export function CourseResourceFilePreviewCard({
  file,
  showHeader = true,
  onDownloadFile,
}: CourseResourceFilePreviewCardProps) {
  if (!file) {
    return <NoFileSelected />;
  }

  const fileName = getCourseResourceFileName(file);
  const previewType = getCourseResourceFilePreviewType(file);
  const previewUrl = getCourseResourcePreviewUrl(file);

  return (
    <StudyCard
      h="full"
      minH="520px"
      p={0}
      overflow="hidden"
      display="flex"
      flexDirection="column"
    >
      {showHeader && (
        <HStack
          justify="space-between"
          align="start"
          gap={4}
          px={4}
          py={3}
          borderBottomWidth="1px"
          borderColor="borderSubtle"
          flexShrink={0}
        >
          <HStack gap={3} minW={0}>
            <StudyIconButton
              aria-label={
                file.fileType ??
                courseResourceFilePreviewCardText.unknownFileType
              }
              variant="secondary"
              size="sm"
              tabIndex={-1}
              pointerEvents="none"
              flexShrink={0}
            >
              {getPreviewIcon(file)}
            </StudyIconButton>

            <Stack gap={1} minW={0}>
              <StudyHeading variant="card" size="sm" truncate>
                {fileName}
              </StudyHeading>

              <StudyText variant="subtle" size="xs" truncate>
                {file.contentType ||
                  courseResourceFilePreviewCardText.unknownFileType}
              </StudyText>
            </Stack>
          </HStack>

          <Stack gap={1} align="end" flexShrink={0}>
            <StudyBadge variant="neutral" size="sm">
              {file.fileType}
            </StudyBadge>

            <StudyText variant="subtle" size="xs">
              {getCourseResourceFileSizeLabel(file.fileSize)}
            </StudyText>
          </Stack>
        </HStack>
      )}

      <Box flex="1" minH={0} overflow="hidden">
        {previewType === "image" && (
          <Box
            h="full"
            minH="360px"
            p={4}
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="panelBgSubtle"
          >
            <StudyImage
              src={previewUrl}
              alt={file.altText || fileName}
              variant="default"
              size="md"
              w="full"
              h="full"
              maxW="100%"
              maxH="100%"
              bg="transparent"
              borderWidth="0"
              rounded="button"
              imageProps={{
                objectFit: "contain",
                draggable: false,
              }}
            />
          </Box>
        )}

        {previewType === "pdf" && (
          <Box h="full" minH="520px" bg="panelBgSubtle">
            <iframe
              src={previewUrl}
              title={fileName}
              width="100%"
              height="100%"
              style={{ border: "none" }}
            />
          </Box>
        )}

        {previewType === "video" && (
          <Box
            h="full"
            minH="360px"
            p={4}
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="panelBgSubtle"
          >
            <video
              controls
              style={{
                width: "100%",
                height: "100%",
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            >
              <source src={previewUrl} type={file.contentType ?? undefined} />
              {courseResourceFilePreviewCardText.browserNoVideo}
            </video>
          </Box>
        )}

        {previewType === "audio" && (
          <Box
            h="full"
            minH="260px"
            p={6}
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="panelBgSubtle"
          >
            <Box w="full" maxW="640px">
              <audio controls style={{ width: "100%" }}>
                <source src={previewUrl} type={file.contentType ?? undefined} />
                {courseResourceFilePreviewCardText.browserNoAudio}
              </audio>
            </Box>
          </Box>
        )}

        {previewType === "text" && (
          <Box h="full" minH="520px" bg="panelBgSubtle" overflow="hidden" p={3}>
            <Box
              h="full"
              minH="500px"
              bg="surfaceBg"
              borderWidth="1px"
              borderColor="borderSubtle"
              rounded="button"
              overflow="hidden"
            >
              <iframe
                src={previewUrl}
                title={fileName}
                width="100%"
                height="100%"
                style={{
                  border: "none",
                  background: "transparent",
                }}
              />
            </Box>
          </Box>
        )}

        {previewType === "download" && (
          <Stack
            gap={4}
            align="center"
            justify="center"
            h="full"
            minH="360px"
            px={6}
            py={12}
            textAlign="center"
          >
            <StudyIconButton
              aria-label={courseResourceFilePreviewCardText.previewNotAvailable}
              variant="secondary"
              size="lg"
              tabIndex={-1}
              pointerEvents="none"
            >
              <LuFile />
            </StudyIconButton>

            <Stack gap={1} maxW="420px">
              <StudyHeading variant="card" size="md" lineClamp={2}>
                {fileName}
              </StudyHeading>

              <StudyText variant="muted">
                {courseResourceFilePreviewCardText.previewNotAvailable}
              </StudyText>

              <StudyText variant="subtle" size="sm">
                {
                  courseResourceFilePreviewCardText.previewNotAvailableDescription
                }
              </StudyText>
            </Stack>

            {onDownloadFile && (
              <StudyButton
                size="sm"
                variant="secondary"
                onClick={() => onDownloadFile(file)}
              >
                <HStack as="span" gap={2}>
                  <LuDownload />
                  <span>{courseResourceFilePreviewCardText.download}</span>
                </HStack>
              </StudyButton>
            )}
          </Stack>
        )}
      </Box>

      {previewType !== "download" && onDownloadFile && (
        <HStack
          justify="end"
          px={4}
          py={3}
          borderTopWidth="1px"
          borderColor="borderSubtle"
          flexShrink={0}
        >
          <StudyButton
            size="sm"
            variant="secondary"
            onClick={() => onDownloadFile(file)}
          >
            <HStack as="span" gap={2}>
              <LuDownload />
              <span>{courseResourceFilePreviewCardText.download}</span>
            </HStack>
          </StudyButton>
        </HStack>
      )}
    </StudyCard>
  );
}
