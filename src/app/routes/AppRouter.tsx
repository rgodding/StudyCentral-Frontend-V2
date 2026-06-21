import { ComponentPreviewPage } from "@/pages/ComponentPreviewPage";
import { ThemePreviewPage } from "@/pages/ThemePreviewPage";
import { Box, Heading, Link, Text, Stack, Button } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function HomePage() {
  return (
    <Box p={8}>
      <Heading>StudyCentral V2</Heading>

      <Text color="textMuted" mt={2}>
        Base app structure is working.
      </Text>

      <Stack align="start" gap={3} mt={6}>
        <Button asChild colorPalette="blue">
          <Link href="/theme-preview">View theme preview</Link>
        </Button>

        <Button asChild variant="outline" colorPalette="blue">
          <Link href="/component-preview">View component preview</Link>
        </Button>
      </Stack>
    </Box>
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
