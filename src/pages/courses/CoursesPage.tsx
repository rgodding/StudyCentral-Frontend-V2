import { Stack, Text } from "@chakra-ui/react";

import { PageHeader, Section } from "@/components/layout";

export function CoursesPage() {
  return (
    <Stack>
      <PageHeader
        title="Courses"
        description="View the courses connected to your account."
      />

      <Section title="Your courses">
        <Text color="textMuted">
          Course list will be added here.
        </Text>
      </Section>
    </Stack>
  );
}