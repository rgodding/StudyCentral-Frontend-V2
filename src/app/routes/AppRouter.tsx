import { ContentGrid, PageHeader, PageShell, Section } from "@/components/layout";
import { ComponentPreviewPage } from "@/pages/ComponentPreviewPage";
import { ThemePreviewPage } from "@/pages/ThemePreviewPage";
import { Button, Link, Stack, Text } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function HomePage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Frontend V2"
        title="StudyCentral V2"
        description="Base app structure is working."
      />

      <ContentGrid>
        <Section
          title="Preview pages"
          description="Use these pages to verify theme tokens and reusable components."
        >
          <Stack align="start" gap={3}>
            <Button asChild colorPalette="blue">
              <Link href="/theme-preview">View theme preview</Link>
            </Button>

            <Button asChild variant="outline" colorPalette="blue">
              <Link href="/component-preview">View component preview</Link>
            </Button>
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
