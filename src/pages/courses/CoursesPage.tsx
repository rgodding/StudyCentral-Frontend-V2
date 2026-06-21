import { Stack } from "@chakra-ui/react";
import { LuBookOpen } from "react-icons/lu";

import { CourseList } from "@/components/courses/courseList";
import { EmptyState, ErrorState, LoadingState } from "@/components/feedback";
import { PageHeader } from "@/components/layout";
import { useCourses } from "@/hooks/courses";

export function CoursesPage() {
  const { data: courses = [], isLoading, isError, refetch } = useCourses();

  return (
    <Stack gap={3}>
      <PageHeader
        title="Courses"
        description="View the courses connected to your account."
      />

      {isLoading && <LoadingState text="Loading courses..." />}

      {isError && (
        <ErrorState
          title="Could not load courses"
          description="The course list could not be loaded."
          retryLabel="Try again"
          onRetry={() => void refetch()}
        />
      )}

      {!isLoading && !isError && courses.length === 0 && (
        <EmptyState
          title="No courses found"
          description="There are no courses connected to your account yet."
          icon={<LuBookOpen />}
        />
      )}

      {!isLoading && !isError && courses.length > 0 && (
        <CourseList courses={courses} />
      )}
    </Stack>
  );
}
