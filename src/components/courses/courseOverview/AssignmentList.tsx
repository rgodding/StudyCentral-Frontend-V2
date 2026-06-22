import { Stack } from "@chakra-ui/react";
import { LuClipboardList } from "react-icons/lu";

import { EmptyState } from "@/components/feedback";
import { CourseOverviewBox } from "./CourseOverviewBox";

const assignmentListText = {
  title: "Assignments",
  emptyTitle: "No assignments yet",
  emptyDescription: "Course assignments will be shown here.",
};

export function AssignmentList() {
  return (
    <CourseOverviewBox title={assignmentListText.title}>
      <Stack gap={3} h="full" minH="220px">
        <EmptyState
          size="sm"
          flex="1"
          display="flex"
          alignItems="center"
          justifyContent="center"
          icon={<LuClipboardList />}
          title={assignmentListText.emptyTitle}
          description={assignmentListText.emptyDescription}
        />
      </Stack>
    </CourseOverviewBox>
  );
}
