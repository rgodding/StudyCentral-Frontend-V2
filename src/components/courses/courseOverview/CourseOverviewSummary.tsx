import { Stack } from "@chakra-ui/react";

import { CourseCard } from "@/components/courses/courseList";
import type { CourseDto } from "@/types/api";

type CourseOverviewSummaryProps = {
  course: CourseDto;
};

export function CourseOverviewSummary({ course }: CourseOverviewSummaryProps) {
  return (
    <Stack gap={4} h="full">
      <CourseCard course={course} clickable={false} />
    </Stack>
  );
}
