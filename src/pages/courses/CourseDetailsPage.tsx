import { GridItem, Stack } from "@chakra-ui/react";
import { LuBookOpen } from "react-icons/lu";
import { useParams } from "react-router-dom";

import { EmptyState, ErrorState, LoadingState } from "@/components/feedback";
import { ContentGrid } from "@/components/layout";
import { useCourse } from "@/hooks/courses/useCourse";
import type { Guid } from "@/types/api";
import {
  AnnouncementList,
  AssignmentList,
  CourseOverviewBox,
} from "@/components/courses";

export function CourseDetailsPage() {
  const { courseId } = useParams<{ courseId: Guid }>();

  const { data: course, isLoading, isError, refetch } = useCourse(courseId);

  if (isLoading) {
    return <LoadingState text="Loading course..." />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Could not load course"
        description="The selected course could not be loaded."
        retryLabel="Try again"
        onRetry={() => void refetch()}
      />
    );
  }

  if (!course) {
    return (
      <EmptyState
        title="Course not found"
        description="The selected course does not exist or is no longer available."
        icon={<LuBookOpen />}
      />
    );
  }

  return (
    <Stack gap={4}>
      <ContentGrid
        alignItems="stretch"
        templateColumns={{
          base: "1fr",
          lg: "minmax(0, 2fr) minmax(300px, 0.9fr)",
        }}
        templateRows={{
          base: "auto",
          lg: "auto minmax(0, 1fr)",
        }}
        templateAreas={{
          base: `
      "announcements"
      "overview"
      "assignments"
    `,
          lg: `
      "announcements overview"
      "announcements assignments"
    `,
        }}
      >
        <GridItem area="announcements">
          <AnnouncementList />
        </GridItem>

        <GridItem area="overview">
          <CourseOverviewBox title="Overview">...</CourseOverviewBox>
        </GridItem>

        <GridItem area="assignments">
          <AssignmentList />
        </GridItem>
      </ContentGrid>
    </Stack>
  );
}
