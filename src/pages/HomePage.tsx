import { HStack, Link, Stack, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

import { routes } from "@/app/routes/routes";
import {
  ContentGrid,
  PageHeader,
  PageShell,
  Section,
} from "@/components/layout";
import { ColorModeToggle, StudyButton } from "@/components/ui";

export function HomePage() {
  return (
    <PageShell>
      <Stack gap={4}>
        <HStack justify="flex-end" gap={2}>
          <ColorModeToggle />
        </HStack>

        <PageHeader
          eyebrow="Frontend V2"
          title="StudyCentral V2"
          description="Base app structure is working."
        />
      </Stack>

      <ContentGrid>
        <Section
          title="Preview pages"
          description="Use these pages to verify theme tokens and reusable components."
        >
          <Stack align="start" gap={3}>
            <StudyButton asChild>
              <Link asChild>
                <RouterLink to={routes.themePreview}>View theme preview</RouterLink>
              </Link>
            </StudyButton>

            <StudyButton asChild variant="secondary">
              <Link asChild>
                <RouterLink to={routes.componentPreview}>View component preview</RouterLink>
              </Link>
            </StudyButton>

            <StudyButton asChild variant="secondary">
              <Link asChild>
                <RouterLink to={routes.login}>View login page</RouterLink>
              </Link>
            </StudyButton>

            <StudyButton asChild variant="secondary">
              <Link asChild>
                <RouterLink to={routes.dashboard}>Go to dashboard</RouterLink>
              </Link>
            </StudyButton>
          </Stack>
        </Section>

        <Section title="Status" description="Current frontend foundation">
          <Stack gap={2}>
            <Text color="textMuted" fontSize="sm">
              Theme tokens are active.
            </Text>
            <Text color="textMuted" fontSize="sm">
              Light and dark mode are connected.
            </Text>
            <Text color="textMuted" fontSize="sm">
              Layout components are ready.
            </Text>
          </Stack>
        </Section>
      </ContentGrid>
    </PageShell>
  );
}
