import { Section } from "@/components/layout";
import { CourseCard } from "@/components/courses/courseList";
import type { CourseDto } from "@/types/api";

type CourseOverviewSummaryProps = {
  course: CourseDto;
};

const courseOverviewSummaryText = {
  title: "Course overview",
};

export function CourseOverviewSummary({ course }: CourseOverviewSummaryProps) {
  return (
    <Section title={courseOverviewSummaryText.title} h="full">
      <CourseCard course={course} clickable={false} />
    </Section>
  );
}