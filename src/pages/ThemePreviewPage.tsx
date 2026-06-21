import {
  Badge,
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useState, type ReactNode } from "react";

type PreviewCardProps = {
  title: string;
  tokenPath: string;
  description?: string;
  children: ReactNode;
};

type TokenPreviewProps = {
  name: string;
  value: string;
  preview: ReactNode;
};

function PreviewCard({
  title,
  tokenPath,
  description,
  children,
}: PreviewCardProps) {
  return (
    <Box
      bg="surfaceBg"
      borderWidth="1px"
      borderColor="borderSubtle"
      rounded="panel"
      shadow="panel"
      p={{ base: 4, md: 6 }}
    >
      <Stack gap={5}>
        <Box>
          <HStack justify="space-between" align="start" gap={4} wrap="wrap">
            <Box>
              <Heading size="lg">{title}</Heading>
              {description && (
                <Text color="textMuted" mt={1}>
                  {description}
                </Text>
              )}
            </Box>

            <Badge colorPalette="brand" rounded="button" px={3} py={1}>
              {tokenPath}
            </Badge>
          </HStack>
        </Box>

        {children}
      </Stack>
    </Box>
  );
}

function TokenPreview({ name, value, preview }: TokenPreviewProps) {
  return (
    <Grid
      templateColumns={{ base: "1fr", md: "220px 1fr 220px" }}
      gap={4}
      alignItems="center"
      py={3}
      borderBottomWidth="1px"
      borderColor="borderSubtle"
      _last={{ borderBottomWidth: 0 }}
    >
      <Box>
        <Text fontWeight="semibold">{name}</Text>
      </Box>

      <Box
        as="code"
        bg="panelBgSubtle"
        color="textMuted"
        borderWidth="1px"
        borderColor="borderSubtle"
        rounded="md"
        px={3}
        py={2}
        fontSize="sm"
        overflowX="auto"
      >
        {value}
      </Box>

      <Box>{preview}</Box>
    </Grid>
  );
}

function ColorSwatch({ token, value }: { token: string; value: string }) {
  return (
    <HStack gap={3}>
      <Box
        w="44px"
        h="32px"
        rounded="md"
        borderWidth="1px"
        borderColor="borderSubtle"
        bg={token}
      />
      <Text color="textMuted" fontSize="sm">
        {value}
      </Text>
    </HStack>
  );
}

function ColorScale({
  name,
  values,
}: {
  name: string;
  values: Record<string, string>;
}) {
  return (
    <Box>
      <Text fontWeight="semibold" mb={3}>
        {name}
      </Text>

      <Grid templateColumns="repeat(10, minmax(0, 1fr))" gap={2}>
        {Object.entries(values).map(([step, hex]) => (
          <Stack key={`${name}-${step}`} gap={1}>
            <Box
              h="44px"
              rounded="md"
              bg={`${name}.${step}`}
              borderWidth="1px"
              borderColor="borderSubtle"
            />
            <Text fontSize="xs" color="textMuted" textAlign="center">
              {step}
            </Text>
            <Text fontSize="xs" color="textSubtle" textAlign="center">
              {hex}
            </Text>
          </Stack>
        ))}
      </Grid>
    </Box>
  );
}

const colorScales = {
  gray: {
    50: "#f9fafa",
    100: "#f1f1f2",
    200: "#e6e7e9",
    300: "#d2d4d7",
    400: "#a9adb2",
    500: "#797f88",
    600: "#4d5560",
    700: "#2e3744",
    800: "#19202b",
    900: "#141a23",
  },
  brand: {
    50: "#f1f9fb",
    100: "#c6e6ed",
    200: "#93cfdd",
    300: "#53b2c9",
    400: "#2ca1bd",
    500: "#0888a7",
    600: "#06738d",
    700: "#055c71",
    800: "#044e60",
    900: "#033946",
  },
  cyan: {
    50: "#f5fbfc",
    100: "#d6edf2",
    200: "#c4e5ed",
    300: "#afdce6",
    400: "#70c0d2",
    500: "#50b3c9",
    600: "#2ba2bd",
    700: "#0787a3",
    800: "#066f86",
    900: "#055668",
  },
  blue: {
    50: "#f2f6fb",
    100: "#d0dff0",
    200: "#adc8e6",
    300: "#88afda",
    400: "#6497cf",
    500: "#4382c4",
    600: "#216bba",
    700: "#07509e",
    800: "#064181",
    900: "#05356a",
  },
  purple: {
    50: "#f8f6fc",
    100: "#e4dbf4",
    200: "#cfc0eb",
    300: "#b29adf",
    400: "#9e7fd7",
    500: "#835bcc",
    600: "#7042c4",
    700: "#5d29bc",
    800: "#490eb4",
    900: "#35068c",
  },
  pink: {
    50: "#fcf6f9",
    100: "#f4dae6",
    200: "#eabdd3",
    300: "#de94b8",
    400: "#d577a4",
    500: "#c84e89",
    600: "#be2d73",
    700: "#a70855",
    800: "#840643",
    900: "#630432",
  },
  red: {
    50: "#fcf6f6",
    100: "#f3dada",
    200: "#e9bab9",
    300: "#dd9291",
    400: "#d57b79",
    500: "#cb5957",
    600: "#c03735",
    700: "#ab0b08",
    800: "#920907",
    900: "#6c0705",
  },
  orange: {
    50: "#fdfaf7",
    100: "#f6ece1",
    200: "#ebd5be",
    300: "#dbb58c",
    400: "#cd985f",
    500: "#c07d34",
    600: "#b26109",
    700: "#8e4d06",
    800: "#703d05",
    900: "#5c3204",
  },
  yellow: {
    50: "#fefefd",
    100: "#faf9f0",
    200: "#f2edd5",
    300: "#e8e0b4",
    400: "#d9cd86",
    500: "#bda82c",
    600: "#9b8507",
    700: "#796805",
    800: "#5b4e04",
    900: "#4b4003",
  },
  green: {
    50: "#f7fcfa",
    100: "#d4f2e3",
    200: "#a4e3c5",
    300: "#6dd1a1",
    400: "#2bbd77",
    500: "#07a459",
    600: "#068849",
    700: "#056a39",
    800: "#04572f",
    900: "#034727",
  },
  teal: {
    50: "#f3fbfb",
    100: "#cdefef",
    200: "#a0e0e1",
    300: "#66cecf",
    400: "#14b3b6",
    500: "#07989b",
    600: "#067c7e",
    700: "#046062",
    800: "#045052",
    900: "#034243",
  },
};

const semanticColors = [
  {
    name: "appBg",
    value: `base: "{colors.gray.50}", _dark: "{colors.black}"`,
  },
  {
    name: "surfaceBg",
    value: `base: "{colors.white}", _dark: "{colors.gray.900}"`,
  },
  {
    name: "panelBg",
    value: `base: "{colors.white}", _dark: "{colors.gray.800}"`,
  },
  {
    name: "panelBgSubtle",
    value: `base: "{colors.gray.100}", _dark: "{colors.gray.700}"`,
  },
  {
    name: "borderSubtle",
    value: `base: "{colors.gray.200}", _dark: "{colors.gray.700}"`,
  },
  {
    name: "borderStrong",
    value: `base: "{colors.gray.300}", _dark: "{colors.gray.600}"`,
  },
  {
    name: "textMain",
    value: `base: "{colors.gray.900}", _dark: "{colors.gray.50}"`,
  },
  {
    name: "textMuted",
    value: `base: "{colors.gray.600}", _dark: "{colors.gray.400}"`,
  },
  {
    name: "textSubtle",
    value: `base: "{colors.gray.500}", _dark: "{colors.gray.500}"`,
  },
  {
    name: "accent",
    value: `base: "{colors.brand.600}", _dark: "{colors.brand.400}"`,
  },
  {
    name: "accentMuted",
    value: `base: "{colors.brand.50}", _dark: "{colors.brand.900}"`,
  },
  {
    name: "activeBg",
    value: `base: "{colors.brand.50}", _dark: "{colors.brand.900}"`,
  },
  {
    name: "navBg",
    value: `base: "{colors.white}", _dark: "{colors.gray.900}"`,
  },
  {
    name: "dangerText",
    value: `base: "{colors.red.700}", _dark: "{colors.red.300}"`,
  },
  {
    name: "successText",
    value: `base: "{colors.green.700}", _dark: "{colors.green.300}"`,
  },
  {
    name: "warningText",
    value: `base: "{colors.orange.700}", _dark: "{colors.orange.300}"`,
  },
];

const radii = [
  ["xs", "4px"],
  ["sm", "6px"],
  ["md", "8px"],
  ["lg", "10px"],
  ["xl", "12px"],
  ["2xl", "16px"],
  ["card", "14px"],
  ["panel", "18px"],
  ["button", "10px"],
];

const shadows = [
  ["xs", "0 1px 2px rgba(0, 0, 0, 0.18)"],
  ["sm", "0 2px 6px rgba(0, 0, 0, 0.22)"],
  ["md", "0 6px 16px rgba(0, 0, 0, 0.28)"],
  ["lg", "0 12px 32px rgba(0, 0, 0, 0.34)"],
  ["card", "0 1px 2px rgba(0, 0, 0, 0.28)"],
  ["panel", "0 12px 32px rgba(0, 0, 0, 0.32)"],
  ["floating", "0 18px 48px rgba(0, 0, 0, 0.42)"],
];

const spacing = [
  ["pageX", "24px"],
  ["pageY", "24px"],
  ["sectionGap", "24px"],
  ["cardGap", "16px"],
  ["fieldGap", "12px"],
];

const sizes = [
  ["navbarHeight", "64px"],
  ["footerHeight", "64px"],
  ["sidebarWidth", "280px"],
  ["contentMaxWidth", "1200px"],
  ["avatarSm", "32px"],
  ["avatarMd", "40px"],
  ["avatarLg", "56px"],
];

const cursors = [
  ["button", "pointer"],
  ["disabled", "not-allowed"],
  ["draggable", "grab"],
  ["dragging", "grabbing"],
  ["text", "text"],
  ["default", "default"],
];

const zIndexes = [
  ["base", "0"],
  ["sticky", "100"],
  ["dropdown", "1000"],
  ["drawer", "1200"],
  ["modal", "1400"],
  ["toast", "1700"],
];

const durations = [
  ["fast", "120ms"],
  ["normal", "180ms"],
  ["slow", "240ms"],
];

const easings = [["default", "cubic-bezier(0.2, 0, 0, 1)"]];

const animations = [
  ["bounce", "bounce 1s infinite"],
  ["ping", "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite"],
  ["fadeIn", "fade-in 180ms cubic-bezier(0.2, 0, 0, 1)"],
  ["fadeOut", "fade-out 120ms cubic-bezier(0.2, 0, 0, 1)"],
  [
    "slideInFromLeft",
    "slide-from-left 220ms cubic-bezier(0.2, 0, 0, 1), fade-in 220ms cubic-bezier(0.2, 0, 0, 1)",
  ],
  [
    "slideInFromRight",
    "slide-from-right 220ms cubic-bezier(0.2, 0, 0, 1), fade-in 220ms cubic-bezier(0.2, 0, 0, 1)",
  ],
  [
    "slideInFromTop",
    "slide-from-top 220ms cubic-bezier(0.2, 0, 0, 1), fade-in 220ms cubic-bezier(0.2, 0, 0, 1)",
  ],
  [
    "slideInFromBottom",
    "slide-from-bottom 220ms cubic-bezier(0.2, 0, 0, 1), fade-in 220ms cubic-bezier(0.2, 0, 0, 1)",
  ],
];

type AnimationPreviewButtonProps = {
  name: string;
};

function AnimationPreviewButton({ name }: AnimationPreviewButtonProps) {
  const [runId, setRunId] = useState(0);

  return (
    <HStack gap={4}>
      <Box
        key={`${name}-${runId}`}
        w="44px"
        h="44px"
        bg="accent"
        rounded="card"
        animation={runId > 0 ? name : undefined}
      />

      <Button
        size="sm"
        variant="outline"
        rounded="button"
        onClick={() => setRunId((current) => current + 1)}
      >
        Play
      </Button>
    </HStack>
  );
}

export function ThemePreviewPage() {
  return (
    <Box minH="100vh" bg="appBg" color="textMain" px="pageX" py="pageY">
      <Stack gap="sectionGap" maxW="contentMaxWidth" mx="auto">
        <Box>
          <Badge colorPalette="brand" rounded="button" px={3} py={1} mb={4}>
            StudyCentral Theme
          </Badge>

          <Heading size="2xl">Theme Preview Page</Heading>

          <Text color="textMuted" mt={2} maxW="720px">
            This page previews every theme token currently defined in system.ts:
            raw tokens, semantic tokens, motion tokens, and global CSS behavior.
          </Text>
        </Box>

        <PreviewCard
          title="1. Color Tokens"
          tokenPath="theme.tokens.colors"
          description="Raw palette colors generated from the SaaS UI palette generator."
        >
          <Stack gap={8}>
            <TokenPreview
              name="white"
              value={`{ value: "#ffffff" }`}
              preview={<ColorSwatch token="white" value="#ffffff" />}
            />

            <TokenPreview
              name="black"
              value={`{ value: "#0c1015" }`}
              preview={<ColorSwatch token="black" value="#0c1015" />}
            />

            {Object.entries(colorScales).map(([name, values]) => (
              <ColorScale key={name} name={name} values={values} />
            ))}
          </Stack>
        </PreviewCard>

        <PreviewCard
          title="2. Semantic Color Tokens"
          tokenPath="theme.semanticTokens.colors"
          description="App-level colors used in components. These should be preferred over raw palette values."
        >
          <Stack gap={0}>
            {semanticColors.map((token) => (
              <TokenPreview
                key={token.name}
                name={token.name}
                value={token.value}
                preview={
                  <Box
                    bg={token.name}
                    color={
                      token.name.toLowerCase().includes("text") ||
                      token.name.toLowerCase().includes("danger") ||
                      token.name.toLowerCase().includes("success") ||
                      token.name.toLowerCase().includes("warning") ||
                      token.name === "accent"
                        ? undefined
                        : "textMain"
                    }
                    borderWidth="1px"
                    borderColor="borderSubtle"
                    rounded="md"
                    px={4}
                    py={2}
                  >
                    <Text
                      color={
                        token.name.toLowerCase().includes("text") ||
                        token.name.toLowerCase().includes("danger") ||
                        token.name.toLowerCase().includes("success") ||
                        token.name.toLowerCase().includes("warning") ||
                        token.name === "accent"
                          ? token.name
                          : undefined
                      }
                      fontWeight="semibold"
                    >
                      {token.name}
                    </Text>
                  </Box>
                }
              />
            ))}
          </Stack>
        </PreviewCard>

        <PreviewCard
          title="3. Font Tokens"
          tokenPath="theme.tokens.fonts"
          description="Typography tokens. Inter is used for body and heading text."
        >
          <Stack gap={0}>
            <TokenPreview
              name="heading"
              value={`{ value: "Inter, system-ui, sans-serif" }`}
              preview={
                <Heading size="md" fontFamily="heading">
                  Heading font
                </Heading>
              }
            />

            <TokenPreview
              name="body"
              value={`{ value: "Inter, system-ui, sans-serif" }`}
              preview={<Text fontFamily="body">Body font example</Text>}
            />

            <TokenPreview
              name="mono"
              value={`{ value: "JetBrains Mono, SFMono-Regular, Menlo, Monaco, Consolas, monospace" }`}
              preview={
                <Box as="code" fontFamily="mono" fontSize="sm">
                  const courseId = "abc-123";
                </Box>
              }
            />
          </Stack>
        </PreviewCard>

        <PreviewCard
          title="4. Radius Tokens"
          tokenPath="theme.tokens.radii"
          description="Shape tokens for cards, panels, buttons, and smaller UI elements."
        >
          <Stack gap={0}>
            {radii.map(([name, value]) => (
              <TokenPreview
                key={name}
                name={name}
                value={`{ value: "${value}" }`}
                preview={
                  <Box
                    w="160px"
                    h="48px"
                    bg="panelBgSubtle"
                    borderWidth="1px"
                    borderColor="borderSubtle"
                    rounded={name}
                  />
                }
              />
            ))}
          </Stack>
        </PreviewCard>

        <PreviewCard
          title="5. Shadow Tokens"
          tokenPath="theme.tokens.shadows"
          description="Elevation tokens. In dark UI, shadows should usually be paired with borders."
        >
          <Stack gap={0}>
            {shadows.map(([name, value]) => (
              <TokenPreview
                key={name}
                name={name}
                value={`{ value: "${value}" }`}
                preview={
                  <Box
                    w="160px"
                    h="48px"
                    bg="panelBg"
                    borderWidth="1px"
                    borderColor="borderSubtle"
                    rounded="card"
                    shadow={name}
                  />
                }
              />
            ))}
          </Stack>
        </PreviewCard>

        <PreviewCard
          title="6. Spacing Tokens"
          tokenPath="theme.tokens.spacing"
          description="Spacing tokens for padding, margins, and layout gaps."
        >
          <Stack gap={0}>
            {spacing.map(([name, value]) => (
              <TokenPreview
                key={name}
                name={name}
                value={`{ value: "${value}" }`}
                preview={
                  <HStack gap={3}>
                    <Box w={name} h="20px" bg="accent" rounded="sm" />
                    <Text color="textMuted" fontSize="sm">
                      {value}
                    </Text>
                  </HStack>
                }
              />
            ))}
          </Stack>
        </PreviewCard>

        <PreviewCard
          title="7. Size Tokens"
          tokenPath="theme.tokens.sizes"
          description="Fixed dimensions for layout elements and avatars."
        >
          <Stack gap={0}>
            {sizes.map(([name, value]) => (
              <TokenPreview
                key={name}
                name={name}
                value={`{ value: "${value}" }`}
                preview={
                  name.toLowerCase().includes("avatar") ? (
                    <Box
                      w={name}
                      h={name}
                      bg="accent"
                      rounded="full"
                      borderWidth="1px"
                      borderColor="borderSubtle"
                    />
                  ) : (
                    <Box
                      w="180px"
                      h="32px"
                      bg="panelBgSubtle"
                      borderWidth="1px"
                      borderColor="borderSubtle"
                      rounded="md"
                    >
                      <Box h="full" w={name} maxW="100%" bg="accentMuted" />
                    </Box>
                  )
                }
              />
            ))}
          </Stack>
        </PreviewCard>

        <PreviewCard
          title="8. Cursor Tokens"
          tokenPath="theme.tokens.cursors"
          description="Interaction cursor tokens for clickable, disabled, and draggable custom elements."
        >
          <Stack gap={0}>
            {cursors.map(([name, value]) => (
              <TokenPreview
                key={name}
                name={name}
                value={`{ value: "${value}" }`}
                preview={
                  <Box
                    cursor={name}
                    bg="panelBgSubtle"
                    borderWidth="1px"
                    borderColor="borderSubtle"
                    rounded="button"
                    px={4}
                    py={2}
                    userSelect="none"
                  >
                    Hover me
                  </Box>
                }
              />
            ))}
          </Stack>
        </PreviewCard>

        <PreviewCard
          title="9. Z-Index Tokens"
          tokenPath="theme.tokens.zIndex"
          description="Layering tokens for sticky navs, dropdowns, drawers, modals, and toasts."
        >
          <Stack gap={0}>
            {zIndexes.map(([name, value]) => (
              <TokenPreview
                key={name}
                name={name}
                value={`{ value: "${value}" }`}
                preview={
                  <Box position="relative" h="56px">
                    <Box
                      position="absolute"
                      left="0"
                      top="12px"
                      w="120px"
                      h="32px"
                      bg="panelBgSubtle"
                      borderWidth="1px"
                      borderColor="borderSubtle"
                      rounded="md"
                    />
                    <Box
                      position="absolute"
                      left="32px"
                      top="0"
                      w="120px"
                      h="32px"
                      bg="accentMuted"
                      borderWidth="1px"
                      borderColor="accent"
                      rounded="md"
                      zIndex={name}
                    >
                      <Text fontSize="xs" px={2} py={1}>
                        {name}
                      </Text>
                    </Box>
                  </Box>
                }
              />
            ))}
          </Stack>
        </PreviewCard>

        <PreviewCard
          title="10. Duration Tokens"
          tokenPath="theme.tokens.durations"
          description="Motion timing tokens for hover states, transitions, and animation speed."
        >
          <Stack gap={0}>
            {durations.map(([name, value]) => (
              <TokenPreview
                key={name}
                name={name}
                value={`{ value: "${value}" }`}
                preview={
                  <Box
                    w="120px"
                    h="36px"
                    bg="panelBgSubtle"
                    borderWidth="1px"
                    borderColor="borderSubtle"
                    rounded="button"
                    transition={`all ${value} cubic-bezier(0.2, 0, 0, 1)`}
                    _hover={{
                      bg: "accentMuted",
                      transform: "translateY(-2px)",
                    }}
                  />
                }
              />
            ))}
          </Stack>
        </PreviewCard>

        <PreviewCard
          title="11. Easing Tokens"
          tokenPath="theme.tokens.easings"
          description="Motion curve tokens for smooth UI movement."
        >
          <Stack gap={0}>
            {easings.map(([name, value]) => (
              <TokenPreview
                key={name}
                name={name}
                value={`{ value: "${value}" }`}
                preview={
                  <Box
                    w="120px"
                    h="36px"
                    bg="panelBgSubtle"
                    borderWidth="1px"
                    borderColor="borderSubtle"
                    rounded="button"
                    transition={`all 240ms ${value}`}
                    _hover={{
                      bg: "accentMuted",
                      transform: "translateX(16px)",
                    }}
                  />
                }
              />
            ))}
          </Stack>
        </PreviewCard>

        <PreviewCard
          title="12. Animation Tokens"
          tokenPath="theme.tokens.animations"
          description="Reusable animation tokens based on Chakra's built-in keyframes."
        >
          <Stack gap={0}>
            {animations.map(([name, value]) => (
              <TokenPreview
                key={name}
                name={name}
                value={`{ value: "${value}" }`}
                preview={<AnimationPreviewButton name={name} />}
              />
            ))}
          </Stack>
        </PreviewCard>
        <PreviewCard
          title="13. Global CSS"
          tokenPath="globalCss"
          description="Global app defaults: body background, text color, font inheritance, links, forms, and selected text."
        >
          <Stack gap="cardGap">
            <Box>
              <Text fontWeight="semibold">Body background + text</Text>
              <Text color="textMuted">
                The page itself uses appBg and textMain from globalCss.
              </Text>
            </Box>

            <Box>
              <Text fontWeight="semibold">Link reset</Text>
              <Link href="#">
                This link inherits color and has no browser underline.
              </Link>
            </Box>

            <Stack gap="fieldGap">
              <Text fontWeight="semibold">Form font inheritance</Text>
              <Input placeholder="Input uses inherited font" />
              <Textarea placeholder="Textarea uses inherited font" />
            </Stack>

            <Box
              bg="panelBgSubtle"
              borderWidth="1px"
              borderColor="borderSubtle"
              rounded="card"
              p={4}
            >
              <Text fontWeight="semibold">Text selection</Text>
              <Text color="textMuted">
                Select this sentence with your mouse. It should use your
                ::selection colors from globalCss.
              </Text>
            </Box>
          </Stack>
        </PreviewCard>

        <PreviewCard
          title="14. Real Component Example"
          tokenPath="semantic tokens + component props"
          description="A realistic card using multiple tokens together."
        >
          <Box
            bg="panelBg"
            borderWidth="1px"
            borderColor="borderSubtle"
            rounded="panel"
            shadow="card"
            p={5}
            animation="fadeIn"
          >
            <Stack gap="cardGap">
              <HStack justify="space-between" align="start">
                <Box>
                  <Heading size="md">Software Development</Heading>
                  <Text color="textMuted">Course dashboard card</Text>
                </Box>

                <Badge colorPalette="brand" rounded="button">
                  Active
                </Badge>
              </HStack>

              <Text color="textMuted">
                This combines panelBg, borderSubtle, rounded panel, cardGap,
                textMuted, brand palette, and fadeIn animation.
              </Text>

              <HStack gap={3} wrap="wrap">
                <Button colorPalette="brand" rounded="button">
                  Open Course
                </Button>
                <Button variant="outline" rounded="button">
                  Assignments
                </Button>
              </HStack>
            </Stack>
          </Box>
        </PreviewCard>
      </Stack>
    </Box>
  );
}
