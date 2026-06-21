import { HStack, Stack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { LuBookOpen, LuUsers } from "react-icons/lu";

import { EmptyState, ErrorState, LoadingState } from "@/components/feedback";
import { PageHeader, Section } from "@/components/layout";
import { StudyBadge, StudyHeading, StudyText } from "@/components/ui";
import type { Guid } from "@/types/api";
import { useCourse } from "@/hooks/courses/useCourse";
import { TestFoldableTallBox } from "@/components/dev/TestFoldableTallBox";

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
  
    </Stack>
  );
}
