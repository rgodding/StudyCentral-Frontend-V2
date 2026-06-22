import { Stack } from "@chakra-ui/react";
import { LuBookOpen } from "react-icons/lu";
import { useParams } from "react-router-dom";

import {
  AnnouncementList,
  AssignmentList,
  CourseOverviewGrid,
  CourseOverviewSummary,
} from "@/components/courses";
import { EmptyState, ErrorState, LoadingState } from "@/components/feedback";
import { useCourseOverview } from "@/hooks/courses/useCourseOverview";
import type { Guid } from "@/types/api";

const courseDetailsPageText = {
  loading: "Loading course...",
  errorTitle: "Could not load course",
  errorDescription: "The selected course could not be loaded.",
  retryLabel: "Try again",
  notFoundTitle: "Course not found",
  notFoundDescription:
    "The selected course does not exist or is no longer available.",
};

export function CourseDetailsPage() {
  const { courseId } = useParams<{ courseId: Guid }>();

  const { data, isLoading, isError, refetch } = useCourseOverview(courseId);

  const course = data?.course;
  const announcements = data?.announcements ?? [];
  const assignments = data?.assignments ?? [];

  if (isLoading) {
    return <LoadingState text={courseDetailsPageText.loading} />;
  }

  if (isError) {
    return (
      <ErrorState
        title={courseDetailsPageText.errorTitle}
        description={courseDetailsPageText.errorDescription}
        retryLabel={courseDetailsPageText.retryLabel}
        onRetry={() => void refetch()}
      />
    );
  }

  if (!course) {
    return (
      <EmptyState
        title={courseDetailsPageText.notFoundTitle}
        description={courseDetailsPageText.notFoundDescription}
        icon={<LuBookOpen />}
      />
    );
  }

  return (
    <Stack gap={4}>
      <CourseOverviewGrid
        announcements={<AnnouncementList announcements={announcements} />}
        overview={<CourseOverviewSummary course={course} />}
        assignments={<AssignmentList assignments={assignments} />}
      />
    </Stack>
  );
}