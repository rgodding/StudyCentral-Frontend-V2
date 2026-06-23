import { HStack, Stack } from "@chakra-ui/react";
import { LuPaperclip } from "react-icons/lu";

import {
  StudyAvatar,
  StudyCard,
  StudyHeading,
  StudyLink,
  StudyText,
} from "@/components/ui";

import type { AnnouncementDto, StudyFileDto } from "@/types/api";

type AnnouncementCardProps = {
  announcement: AnnouncementDto;
  files?: StudyFileDto[];
};

const announcementCardText = {
  unknownTeacher: "Unknown Teacher",
  files: "Files:",
};

function formatAnnouncementDate(date?: string | null) {
  if (!date) {
    return "";
  }

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function AnnouncementCard({
  announcement,
  files = [],
}: AnnouncementCardProps) {
  const teacherName =
    announcement.teacherName?.trim() || announcementCardText.unknownTeacher;

  return (
    <StudyCard p={5}>
      <Stack gap={4}>
        <HStack align="start" gap={3}>
          <StudyAvatar
            name={teacherName}
            size="sm"
            flexShrink={0}
          />

          <Stack gap={0} minW={0}>
            <StudyText fontWeight="semibold" color="textMain" truncate>
              {teacherName}
            </StudyText>

            <StudyText variant="subtle" fontSize="xs">
              {formatAnnouncementDate(announcement.createdAt)}
            </StudyText>
          </Stack>
        </HStack>

        <Stack gap={2}>
          <StudyHeading variant="card" fontSize="sm">
            {announcement.name}
          </StudyHeading>

          <StudyText color="textMain" lineHeight="1.7">
            {announcement.content}
          </StudyText>
        </Stack>

        {files.length > 0 && (
          <HStack gap={2} align="start" color="textSubtle" fontSize="sm">
            <LuPaperclip />

            <HStack gap={1.5} wrap="wrap" minW={0}>
              <StudyText variant="subtle" fontSize="sm">
                {announcementCardText.files}
              </StudyText>

              {files.map((file, index) => (
                <StudyLink
                  key={file.id}
                  href={`/api/File/${file.id}/download`}
                  fontSize="sm"
                  fontWeight="semibold"
                >
                  {file.fileName}
                  {index < files.length - 1 ? "," : ""}
                </StudyLink>
              ))}
            </HStack>
          </HStack>
        )}
      </Stack>
    </StudyCard>
  );
}