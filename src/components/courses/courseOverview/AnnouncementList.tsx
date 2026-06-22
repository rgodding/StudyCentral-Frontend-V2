import { Stack } from "@chakra-ui/react";
import { LuMegaphone } from "react-icons/lu";

import { EmptyState } from "@/components/feedback";
import { CourseOverviewBox } from "./CourseOverviewBox";

const announcementListText = {
  title: "Announcements",
  emptyTitle: "No announcements yet",
  emptyDescription: "Course announcements will be shown here.",
};

export function AnnouncementList() {
  return (
    <CourseOverviewBox title={announcementListText.title}>
      <Stack gap={3} h="full" minH="240px">
        <EmptyState
          size="sm"
          flex="1"
          display="flex"
          alignItems="center"
          justifyContent="center"
          icon={<LuMegaphone />}
          title={announcementListText.emptyTitle}
          description={announcementListText.emptyDescription}
        />
      </Stack>
    </CourseOverviewBox>
  );
}
