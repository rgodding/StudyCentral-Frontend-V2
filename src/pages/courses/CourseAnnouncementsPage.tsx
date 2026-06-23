import { Stack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { StudyText } from "@/components/ui/StudyText";

export function CourseAnnouncementsPage() {
  const { courseId } = useParams();

  return (
    <Stack gap={6}>
      <PageHeader
        title="Announcements"
        description="Course announcements will be shown here."
      />

      <Section title="Announcements">
        <StudyText color="textMuted">
          Empty announcements page for course: {courseId}
        </StudyText>
      </Section>
    </Stack>
  );
}