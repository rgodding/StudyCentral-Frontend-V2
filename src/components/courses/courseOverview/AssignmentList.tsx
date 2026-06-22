import { Stack } from "@chakra-ui/react";
import { LuClipboardList } from "react-icons/lu";

import { EmptyState } from "@/components/feedback";
import { StudyText } from "@/components/ui";
import { CourseOverviewBox } from "./CourseOverviewBox";

export function AssignmentList() {
  return (
    <CourseOverviewBox title="Assignments">
      <Stack gap={3} h="full" minH="220px">
        <EmptyState
          icon={<LuClipboardList />}
          title="No assignments yet"
          description="Course assignments will be shown here."
        />

        <StudyText variant="subtle">
          This section will later use the student/teacher assignment API.
        </StudyText>
      </Stack>
    </CourseOverviewBox>
  );
}