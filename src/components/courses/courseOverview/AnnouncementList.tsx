import { Stack } from "@chakra-ui/react";
import { LuMegaphone } from "react-icons/lu";

import { EmptyState } from "@/components/feedback";
import { StudyText } from "@/components/ui";
import { CourseOverviewBox } from "./CourseOverviewBox";

export function AnnouncementList() {
  return (
    <CourseOverviewBox title="Announcements">
      <Stack gap={3} h="full" minH="240px">
        <EmptyState
          icon={<LuMegaphone />}
          title="No announcements yet"
          description="Course announcements will be shown here."
        />

        <StudyText variant="subtle">
          This section will later use the student/teacher announcement API.
        </StudyText>
      </Stack>
    </CourseOverviewBox>
  );
}
