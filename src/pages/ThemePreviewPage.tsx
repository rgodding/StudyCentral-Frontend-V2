import {
  Badge,
  Box,
  Button,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";

export function ThemePreviewPage() {
  return (
    <Box minH="100vh" bg="appBg" color="textMain" px="pageX" py="pageY">
      <Stack gap="sectionGap" maxW="contentMaxWidth" mx="auto">
        <Box>
          <Heading size="2xl">StudyCentral Theme Preview</Heading>
          <Text color="textMuted" mt={2}>
            This page previews global CSS, semantic tokens, spacing, radii, and shadows.
          </Text>
        </Box>

        <Box
          bg="panelBg"
          borderWidth="1px"
          borderColor="borderSubtle"
          rounded="panel"
          shadow="panel"
          p={6}
        >
          <Stack gap="cardGap">
            <Heading size="lg">Panel</Heading>

            <Text>
              This is normal text. Try selecting this text to test your{" "}
              <Text as="span" fontWeight="semibold">
                ::selection
              </Text>{" "}
              global CSS.
            </Text>

            <Text color="textMuted">
              This is muted text. It should be readable but less dominant.
            </Text>

            <Link href="#">This is a link using global link reset</Link>

            <HStack>
              <Button colorPalette="brand">Primary button</Button>
              <Button variant="outline">Outline button</Button>
              <Badge colorPalette="green">Success</Badge>
              <Badge colorPalette="red">Danger</Badge>
            </HStack>

            <Input placeholder="Input field" />
            <Textarea placeholder="Textarea field" />

            <Box
              bg="panelBgSubtle"
              borderWidth="1px"
              borderColor="borderSubtle"
              rounded="card"
              shadow="card"
              p={4}
            >
              <Text fontWeight="semibold">Nested card</Text>
              <Text color="textMuted">
                This uses panelBgSubtle, borderSubtle, card radius, and card shadow.
              </Text>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}