import { ContentGrid, PageHeader, PageShell, Section } from "@/components/layout";
import {
  ColorModeToggle,
  LanguageToggle,
  StudyButton,
} from "@/components/ui";
import { ComponentPreviewPage } from "@/pages/ComponentPreviewPage";
import { ThemePreviewPage } from "@/pages/ThemePreviewPage";
import { HStack, Link, Stack, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function HomePage() {
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
              <Link href="/theme-preview">
                {t("home.previewPages.themePreview")}
              </Link>
            </StudyButton>

            <StudyButton asChild variant="secondary">
              <Link href="/component-preview">
                {t("home.previewPages.componentPreview")}
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/theme-preview",
    element: <ThemePreviewPage />,
  },
  {
    path: "/component-preview",
    element: <ComponentPreviewPage />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}