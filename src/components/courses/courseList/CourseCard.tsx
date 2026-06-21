import { HStack, Stack } from "@chakra-ui/react";
import { LuBookOpen, LuUsers } from "react-icons/lu";
import { Link as RouterLink } from "react-router-dom";

import {
  StudyBadge,
  StudyCard,
  StudyHeading,
  StudyText,
} from "@/components/ui";
import type { CourseDto } from "@/types/api";

type CourseCardProps = {
  course: CourseDto;
};

export function CourseCard({ course }: CourseCardProps) {
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
      <RouterLink to={`/courses/${course.id}`}>
        <Stack gap={4}>
          <Stack gap={2} minW={0}>
            <HStack align="center" justify="space-between" gap={3}>
              <HStack gap={2} minW={0}>
                <LuBookOpen />

                <StudyHeading variant="card" truncate>
                  {course.name ?? "Untitled course"}
                </StudyHeading>
              </HStack>

              <StudyBadge variant="accent" flexShrink={0}>
                Course
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
                {course.studentCount} students
              </StudyText>
            </HStack>
          </HStack>
        </Stack>
      </RouterLink>
    </StudyCard>
  );
}