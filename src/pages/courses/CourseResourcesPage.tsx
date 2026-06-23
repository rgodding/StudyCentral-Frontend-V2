import { Stack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { StudyText } from "@/components/ui/StudyText";

export function CourseResourcesPage() {
  const { courseId } = useParams();

  return (
    <Stack gap={6}>
      <PageHeader
        title="Resources"
        description="Course resources and study material will be shown here."
      />

      <Section title="Resources">
        <StudyText color="textMuted">
          Empty resources page for course: {courseId}
        </StudyText>
      </Section>
    </Stack>
  );
}