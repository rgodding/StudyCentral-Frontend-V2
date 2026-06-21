import { useTranslation } from "react-i18next";
import { HStack, Link, Stack, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

import {
  ContentGrid,
  PageHeader,
  PageShell,
  Section,
} from "@/components/layout";
import { ColorModeToggle, LanguageToggle, StudyButton } from "@/components/ui";

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <PageShell>
      <Stack gap={4}>
        <HStack justify="flex-end" gap={2}>
          <ColorModeToggle />
          <LanguageToggle />
        </HStack>

        <PageHeader
          eyebrow={t("home.eyebrow")}
          title={t("home.title")}
          description={t("home.description")}
        />
      </Stack>

      <ContentGrid>
        <Section
          title={t("home.previewPages.title")}
          description={t("home.previewPages.description")}
        >
          <Stack align="start" gap={3}>
            <StudyButton asChild>
              <Link asChild>
                <RouterLink to="/theme-preview">
                  {t("home.previewPages.themePreview")}
                </RouterLink>
              </Link>
            </StudyButton>

            <StudyButton asChild variant="secondary">
              <Link asChild>
                <RouterLink to="/component-preview">
                  {t("home.previewPages.componentPreview")}
                </RouterLink>
              </Link>
            </StudyButton>

            <StudyButton asChild variant="secondary">
              <Link asChild>
                <RouterLink to="/login">
                  {t("home.previewPages.login")}
                </RouterLink>
              </Link>
            </StudyButton>
          </Stack>
        </Section>

        <Section
          title={t("home.status.title")}
          description={t("home.status.description")}
        >
          <Stack gap={2}>
            <Text color="textMuted" fontSize="sm">
              {t("home.status.themeTokens")}
            </Text>
            <Text color="textMuted" fontSize="sm">
              {t("home.status.colorMode")}
            </Text>
            <Text color="textMuted" fontSize="sm">
              {t("home.status.layout")}
            </Text>
          </Stack>
        </Section>
      </ContentGrid>
    </PageShell>
  );
}
