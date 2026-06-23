import { HStack, Stack } from "@chakra-ui/react";
import { LuMegaphone } from "react-icons/lu";

import { EmptyState } from "@/components/feedback";
import { Section } from "@/components/layout/Section";
import {
  StudyAvatar,
  StudyCard,
  StudyHeading,
  StudyText
} from "@/components/ui";
import type { AnnouncementDto } from "@/types/api";
import { formatDate } from "@/utils/formatDateUtils";

type AnnouncementListProps = {
  announcements: AnnouncementDto[];
};

const announcementListText = {
  title: "Announcements",
  emptyTitle: "No announcements yet",
  emptyDescription: "Announcements for this course will appear here.",
  badge: "Announcement",
  untitled: "Untitled announcement",
  unknownTeacher: "Unknown Teacher",
};

export function AnnouncementList({ announcements }: AnnouncementListProps) {
  if (announcements.length === 0) {
    return (
      <EmptyState
        size="sm"
        flex="1"
        icon={<LuMegaphone />}
        title={announcementListText.emptyTitle}
        description={announcementListText.emptyDescription}
      />
    );
  }
  return (
    <Section title={announcementListText.title} headerIcon={<LuMegaphone />}>
      <Stack gap={4}>
        {announcements.map((announcement) => {
          const teacherName = announcement.teacherName?.trim() || announcementListText.unknownTeacher;
          return (
            <StudyCard key={announcement.id} shadowSize="lg" p={5}>
              <Stack gap={4}>
                <HStack align="start" gap={3}>
                  <StudyAvatar
                    fullName={teacherName}
                    size="sm"
                    flexShrink={0}
                  />

                  <Stack gap={0} minW={0}>
                    <StudyText fontWeight="semibold" color="textMain" truncate>
                      {teacherName}
                    </StudyText>

                    <StudyText variant="subtle" fontSize="xs">
                      {formatDate(announcement.createdAt)}
                    </StudyText>
                  </Stack>
                </HStack>

                <Stack gap={2}>
                  <StudyHeading variant="card" fontSize="sm" lineClamp={2}>
                    {announcement.name?.trim() || announcementListText.untitled}
                  </StudyHeading>

                  <StudyText color="textMain" lineHeight="1.7">
                    {announcement.content}
                  </StudyText>
                </Stack>

                {announcement.fileCount > 0 && (
                  <StudyText variant="subtle" fontSize="sm">
                    Files: {announcement.fileCount}
                  </StudyText>
                )}
              </Stack>
            </StudyCard>
          );
        })}
      </Stack>
    </Section>
  );
}
