import { ThemePreviewPage } from "@/pages/ThemePreviewPage";
import { Box, Heading, Link, Text } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function HomePage() {
  return (
    <Box p={8}>
      <Heading>StudyCentral V2</Heading>
      <Text color="gray.600" mt={2}>
        Base app structure is working.
        <Link href="/theme-preview" color="blue.500" ml={1}>
          View theme preview
        </Link>
      </Text>
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
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}