import { Stack, Text } from "@chakra-ui/react";

import { Section } from "@/components/layout";

export function DashboardPage() {


  return (
    <Stack gap={6} p={6}>
      <Section title="Dashboard">
        <Stack gap={2}>
          <Text>
            This is a temporary landing page for authenticated users. It can be
            used to display user-specific information, quick links, or any other
            relevant content.
          </Text>
        </Stack>
      </Section>
    </Stack>
  );
}
