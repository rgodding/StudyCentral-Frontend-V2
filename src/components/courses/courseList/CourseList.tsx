import { SimpleGrid } from "@chakra-ui/react";

import type { CourseDto } from "@/types/api";
import { CourseCard } from "./CourseCard";

type CourseListProps = {
  courses: CourseDto[];
};

export function CourseList({ courses }: CourseListProps) {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={4}>
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </SimpleGrid>
  );
}