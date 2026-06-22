import { HStack, Stack } from "@chakra-ui/react";
import { LuBookOpen, LuUsers } from "react-icons/lu";
import { Link as RouterLink } from "react-router-dom";

import { routePaths } from "@/app/routes/routes";
import {
  StudyBadge,
  StudyCard,
  StudyHeading,
  StudyText,
} from "@/components/ui";
import type { CourseDto } from "@/types/api";

type CourseCardProps = {
  course: CourseDto;
  clickable?: boolean;
};

const courseCardText = {
  untitledCourse: "Untitled course",
  courseBadge: "Course",
  students: (count: number) =>
    `${count} ${count === 1 ? "student" : "students"}`,
};

function CourseCardContent({ course }: { course: CourseDto }) {
  return (
    <Stack gap={4}>
      <Stack gap={2} minW={0}>
        <HStack align="center" justify="space-between" gap={3}>
          <HStack gap={2} minW={0}>
            <LuBookOpen />

            <StudyHeading variant="card" truncate>
              {course.name?.trim() || courseCardText.untitledCourse}
            </StudyHeading>
          </HStack>

          <StudyBadge variant="accent" flexShrink={0}>
            {courseCardText.courseBadge}
          </StudyBadge>
        </HStack>

        {course.description && (
          <StudyText variant="muted" lineClamp={2}>
            {course.description}
          </StudyText>
        )}
      </Stack>

      <HStack justify="space-between" gap={4}>
        <HStack gap={2} color="textSubtle">
          <LuUsers />

          <StudyText variant="subtle">
            {courseCardText.students(course.studentCount)}
          </StudyText>
        </HStack>
      </HStack>
    </Stack>
  );
}

export function CourseCard({ course, clickable = true }: CourseCardProps) {
  if (!clickable) {
    return (
      <StudyCard>
        <CourseCardContent course={course} />
      </StudyCard>
    );
  }

  return (
    <StudyCard
      asChild
      variant="interactive"
      cursor="pointer"
      transitionProperty="background-color, border-color, transform, box-shadow"
      _hover={{
        borderColor: "borderStrong",
        transform: "translateY(-1px)",
      }}
    >
      <RouterLink to={routePaths.courseDetails(course.id)} state={{ course }}>
        <CourseCardContent course={course} />
      </RouterLink>
    </StudyCard>
  );
}