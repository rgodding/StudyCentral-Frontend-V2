import { Section } from "@/components/layout";
import { CourseCard } from "@/components/courses/courseList";
import type { CourseDto } from "@/types/api";
import { LuBookOpen } from "react-icons/lu";

type CourseOverviewSummaryProps = {
  course: CourseDto;
};

const courseOverviewSummaryText = {
  title: "Course overview",
};

export function CourseOverviewSummary({ course }: CourseOverviewSummaryProps) {
  return (
    <Section
      headerIcon={<LuBookOpen />}
      title={courseOverviewSummaryText.title}
      h="full"
    >
      <CourseCard course={course} clickable={false} />
    </Section>
  );
}
