import { Box, Heading, Text } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function HomePage() {
  return (
    <Box p={8}>
      <Heading>StudyCentral V2</Heading>
      <Text color="gray.600" mt={2}>
        Base app structure is working.
      </Text>
    </Box>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}