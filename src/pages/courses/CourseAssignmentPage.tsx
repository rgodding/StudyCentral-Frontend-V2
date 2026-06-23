import { Stack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { StudyText } from "@/components/ui/StudyText";

export function CourseAssignmentsPage() {
  const { courseId } = useParams();

  return (
    <Stack gap={6}>
      <PageHeader
        title="Assignments"
        description="Course assignments will be shown here."
      />

      <Section title="Assignments">
        <StudyText color="textMuted">
          Empty assignments page for course: {courseId}
        </StudyText>
      </Section>
    </Stack>
  );
}