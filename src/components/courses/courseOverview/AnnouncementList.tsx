import { HStack, Stack } from "@chakra-ui/react";
import { LuMegaphone } from "react-icons/lu";

import { EmptyState } from "@/components/feedback";
import {
  StudyBadge,
  StudyCard,
  StudyHeading,
  StudyText,
} from "@/components/ui";
import type { AnnouncementDto } from "@/types/api";
import { TestFoldableTallBox } from "@/components/dev/TestFoldableTallBox";

type AnnouncementListProps = {
  announcements: AnnouncementDto[];
};

const announcementListText = {
  title: "Announcements",
  emptyTitle: "No announcements yet",
  emptyDescription: "Announcements for this course will appear here.",
  badge: "Announcement",
  untitled: "Untitled announcement",
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
    <Stack gap={3}>
          <StudyHeading variant="section">
        {announcementListText.title}
      </StudyHeading>
      {announcements.map((announcement) => (
        <StudyCard key={announcement.id} shadowSize="lg">
          <Stack gap={2}>
            <HStack justify="space-between" align="start" gap={3}>
              <StudyHeading variant="card" lineClamp={2}>
                {announcement.name?.trim() || announcementListText.untitled}
              </StudyHeading>

              <StudyBadge variant="accent" flexShrink={0}>
                {announcementListText.badge}
              </StudyBadge>
            </HStack>

            <StudyText variant="muted" lineClamp={3}>
              {announcement.content}
            </StudyText>
            <TestFoldableTallBox height="100px"  />
          </Stack>
        </StudyCard>
      ))}
    </Stack>
  );
}