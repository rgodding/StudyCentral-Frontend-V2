import { Box, Grid, HStack, SimpleGrid, Stack } from "@chakra-ui/react";

import {
  StudyBadge,
  StudyBox,
  StudyButton,
  StudyCard,
  StudyDivider,
  StudyHeading,
  StudyText,
} from "@/components/ui";
import {
  PreviewCard,
  PreviewCode,
  PreviewLayout,
  PreviewSection,
} from "@/pages/dev/components";

const navItems = [
  { id: "brand-colors", label: "Brand Colors" },
  { id: "semantic-colors", label: "Semantic Colors" },
  { id: "typography", label: "Typography" },
  { id: "radii", label: "Radii" },
  { id: "shadows", label: "Shadows" },
  { id: "spacing", label: "Spacing" },
  { id: "sizes", label: "Sizes" },
  { id: "z-index", label: "Z-Index" },
  { id: "durations", label: "Durations" },
  { id: "easings", label: "Easings" },
  { id: "animations", label: "Animations" },
  { id: "surfaces", label: "Surfaces" },
];

const brandColors = [
  "brand.50",
  "brand.100",
  "brand.200",
  "brand.300",
  "brand.400",
  "brand.500",
  "brand.600",
  "brand.700",
  "brand.800",
  "brand.900",
];

const semanticColors = [
  "appBg",
  "surfaceBg",
  "panelBg",
  "panelBgSubtle",
  "borderSubtle",
  "borderStrong",
  "textMain",
  "textMuted",
  "textSubtle",
  "accent",
  "accentMuted",
  "activeBg",
  "navBg",
  "dangerText",
  "successText",
  "warningText",
];

const radii = ["button", "card", "panel", "full"];

const shadows = ["card", "panel", "overlay"];

const spacing = [
  "pageX",
  "pageY",
  "sectionGap",
  "cardGap",
  "fieldGap",
];

const sizes = [
  "mainNavbarHeight",
  "courseNavbarHeight",
  "avatarSm",
  "avatarMd",
  "avatarLg",
];

const zIndices = ["base", "nav", "overlay", "modal", "toast"];

const durations = ["fast", "normal", "slow"];

const easings = ["default", "emphasized"];

const animations = [
  "bounce",
  "ping",
  "fadeInFast",
  "fadeOutFast",
  "fadeIn",
  "fadeOut",
  "slideDownFast",
  "slideUpFast",
  "slideOutToTopFast",
  "slideInFromLeft",
  "slideInFromRight",
  "slideInFromTop",
  "slideInFromBottom",
  "scaleInFast",
  "scaleIn",
];

export function ThemePreviewPage() {
  return (
    <PreviewLayout
      title="Theme Preview"
      description="A visual reference for StudyCentral theme tokens, semantic colors, typography, spacing, shadows, radii, and animations."
      navItems={navItems}
    >
      <PreviewSection
        id="brand-colors"
        title="Brand Colors"
        description="Raw brand palette tokens. Use semantic tokens first in real components, and raw palette tokens only when the meaning is specific."
      >
        <PreviewCard title="Brand palette" tokenPath="theme.tokens.colors.brand">
          <SimpleGrid columns={{ base: 2, sm: 3, md: 5 }} gap={3}>
            {brandColors.map((color) => (
              <ColorPreview key={color} name={color} bg={color} />
            ))}
          </SimpleGrid>
        </PreviewCard>
      </PreviewSection>

      <PreviewSection
        id="semantic-colors"
        title="Semantic Colors"
        description="Main application color tokens. These should be preferred in components because they work across light and dark modes."
      >
        <PreviewCard
          title="Semantic tokens"
          tokenPath="theme.semanticTokens.colors"
        >
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={3}>
            {semanticColors.map((color) => (
              <ColorPreview key={color} name={color} bg={color} />
            ))}
          </SimpleGrid>
        </PreviewCard>
      </PreviewSection>

      <PreviewSection
        id="typography"
        title="Typography"
        description="Heading and text styles used by StudyCentral wrapper components."
      >
        <PreviewCard title="Headings" tokenPath="StudyHeading">
          <Stack gap={4}>
            <StudyHeading variant="page">Page heading</StudyHeading>
            <StudyHeading variant="section">Section heading</StudyHeading>
            <StudyHeading variant="card">Card heading</StudyHeading>
            <StudyHeading variant="subtle">Subtle heading</StudyHeading>
          </Stack>
        </PreviewCard>

        <PreviewCard title="Text variants" tokenPath="StudyText">
          <Stack gap={3}>
            <StudyText variant="body">Body text for normal readable content.</StudyText>
            <StudyText variant="muted">
              Muted text for descriptions and secondary information.
            </StudyText>
            <StudyText variant="subtle">
              Subtle text for metadata and low-emphasis information.
            </StudyText>
            <StudyText variant="label">Label text</StudyText>
            <StudyText variant="accent">Accent text</StudyText>
            <StudyText variant="success">Success text</StudyText>
            <StudyText variant="warning">Warning text</StudyText>
            <StudyText variant="error">Error text</StudyText>
          </Stack>
        </PreviewCard>
      </PreviewSection>

      <PreviewSection
        id="radii"
        title="Radii"
        description="Border radius tokens for buttons, cards, panels, and circular elements."
      >
        <PreviewCard title="Radius tokens" tokenPath="theme.tokens.radii">
          <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} gap={4}>
            {radii.map((radius) => (
              <TokenBlock key={radius} label={radius}>
                <Box
                  h="72px"
                  bg="panelBgSubtle"
                  borderWidth="1px"
                  borderColor="borderStrong"
                  rounded={radius}
                />
              </TokenBlock>
            ))}
          </SimpleGrid>
        </PreviewCard>
      </PreviewSection>

      <PreviewSection
        id="shadows"
        title="Shadows"
        description="Elevation tokens for cards, panels, overlays, menus, dialogs, and popovers."
      >
        <PreviewCard title="Shadow tokens" tokenPath="theme.tokens.shadows">
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
            {shadows.map((shadow) => (
              <TokenBlock key={shadow} label={shadow}>
                <Box
                  h="96px"
                  bg="surfaceBg"
                  borderWidth="1px"
                  borderColor="borderStrong"
                  rounded="card"
                  shadow={shadow}
                />
              </TokenBlock>
            ))}
          </SimpleGrid>
        </PreviewCard>
      </PreviewSection>

      <PreviewSection
        id="spacing"
        title="Spacing"
        description="Layout spacing tokens for pages, sections, cards, and forms."
      >
        <PreviewCard title="Spacing tokens" tokenPath="theme.tokens.spacing">
          <Stack gap={3}>
            {spacing.map((token) => (
              <MeasurementPreview key={token} name={token} property="w" />
            ))}
          </Stack>
        </PreviewCard>
      </PreviewSection>

      <PreviewSection
        id="sizes"
        title="Sizes"
        description="Reusable sizing tokens for layout heights and avatar sizes."
      >
        <PreviewCard title="Size tokens" tokenPath="theme.tokens.sizes">
          <Stack gap={3}>
            {sizes.map((token) => (
              <MeasurementPreview key={token} name={token} property="w" />
            ))}
          </Stack>
        </PreviewCard>
      </PreviewSection>

      <PreviewSection
        id="z-index"
        title="Z-Index"
        description="Layering tokens for navigation, overlays, modals, and toasts."
      >
        <PreviewCard title="Z-index tokens" tokenPath="theme.tokens.zIndex">
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={3}>
            {zIndices.map((token) => (
              <TokenPill key={token} label={token} />
            ))}
          </SimpleGrid>
        </PreviewCard>
      </PreviewSection>

      <PreviewSection
        id="durations"
        title="Durations"
        description="Animation and transition duration tokens."
      >
        <PreviewCard title="Duration tokens" tokenPath="theme.tokens.durations">
          <SimpleGrid columns={{ base: 1, sm: 3 }} gap={3}>
            {durations.map((token) => (
              <TokenPill key={token} label={token} />
            ))}
          </SimpleGrid>
        </PreviewCard>
      </PreviewSection>

      <PreviewSection
        id="easings"
        title="Easings"
        description="Timing-function tokens for motion."
      >
        <PreviewCard title="Easing tokens" tokenPath="theme.tokens.easings">
          <SimpleGrid columns={{ base: 1, sm: 2 }} gap={3}>
            {easings.map((token) => (
              <TokenPill key={token} label={token} />
            ))}
          </SimpleGrid>
        </PreviewCard>
      </PreviewSection>

      <PreviewSection
        id="animations"
        title="Animations"
        description="Reusable animation tokens. These should usually be applied to wrappers, cards, dialogs, menus, popovers, and page sections."
      >
        <PreviewCard title="Animation tokens" tokenPath="theme.tokens.animations">
          <Stack gap={3}>
            {animations.map((animation) => (
              <AnimationPreview key={animation} name={animation} />
            ))}
          </Stack>
        </PreviewCard>
      </PreviewSection>

      <PreviewSection
        id="surfaces"
        title="Surfaces"
        description="Common surface combinations using StudyCentral semantic colors."
      >
        <PreviewCard title="StudyBox variants" tokenPath="StudyBox">
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
            <StudyBox variant="surface" size="md" rounded="card">
              <StudyText variant="label">Surface</StudyText>
              <StudyText variant="muted">
                Basic page or content surface.
              </StudyText>
            </StudyBox>

            <StudyBox variant="panel" size="md">
              <StudyText variant="label">Panel</StudyText>
              <StudyText variant="muted">
                Strong bordered surface for main containers.
              </StudyText>
            </StudyBox>

            <StudyBox variant="subtle" size="md">
              <StudyText variant="label">Subtle</StudyText>
              <StudyText variant="muted">
                Lower-emphasis grouped content.
              </StudyText>
            </StudyBox>

            <StudyBox variant="nav" size="md" borderWidth="1px">
              <StudyText variant="label">Navigation</StudyText>
              <StudyText variant="muted">
                Navigation and sub-navigation background.
              </StudyText>
            </StudyBox>
          </SimpleGrid>
        </PreviewCard>

        <PreviewCard title="Status surfaces" tokenPath="StudyBox status variants">
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
            <StatusSurface variant="success" label="Success" />
            <StatusSurface variant="warning" label="Warning" />
            <StatusSurface variant="danger" label="Danger" />
            <StatusSurface variant="info" label="Info" />
          </SimpleGrid>
        </PreviewCard>

        <PreviewCard title="Component samples" tokenPath="Study components">
          <Stack gap={4}>
            <HStack gap={3} wrap="wrap">
              <StudyButton>Primary</StudyButton>
              <StudyButton variant="secondary">Secondary</StudyButton>
              <StudyButton variant="ghost">Ghost</StudyButton>
              <StudyButton variant="danger">Danger</StudyButton>
            </HStack>

            <HStack gap={2} wrap="wrap">
              <StudyBadge variant="neutral">Neutral</StudyBadge>
              <StudyBadge variant="accent">Accent</StudyBadge>
              <StudyBadge variant="success">Success</StudyBadge>
              <StudyBadge variant="warning">Warning</StudyBadge>
              <StudyBadge variant="danger">Danger</StudyBadge>
              <StudyBadge variant="role">Role</StudyBadge>
            </HStack>

            <StudyDivider />

            <StudyCard variant="interactive" size="sm">
              <StudyHeading variant="card">Interactive card</StudyHeading>
              <StudyText variant="muted">
                Used for clickable cards such as courses, assignments, and files.
              </StudyText>
            </StudyCard>
          </Stack>
        </PreviewCard>
      </PreviewSection>
    </PreviewLayout>
  );
}

type ColorPreviewProps = {
  name: string;
  bg: string;
};

function ColorPreview({ name, bg }: ColorPreviewProps) {
  return (
    <Stack gap={2}>
      <Box
        h="72px"
        rounded="card"
        bg={bg}
        borderWidth="1px"
        borderColor="borderStrong"
      />

      <PreviewCode>{name}</PreviewCode>
    </Stack>
  );
}

type TokenBlockProps = {
  label: string;
  children: React.ReactNode;
};

function TokenBlock({ label, children }: TokenBlockProps) {
  return (
    <Stack gap={2}>
      {children}
      <PreviewCode>{label}</PreviewCode>
    </Stack>
  );
}

type TokenPillProps = {
  label: string;
};

function TokenPill({ label }: TokenPillProps) {
  return (
    <StudyBox
      variant="subtle"
      px={3}
      py={2}
      rounded="button"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      gap={3}
    >
      <StudyText variant="label" size="sm">
        {label}
      </StudyText>

      <PreviewCode>{label}</PreviewCode>
    </StudyBox>
  );
}

type MeasurementPreviewProps = {
  name: string;
  property: "w" | "h";
};

function MeasurementPreview({ name, property }: MeasurementPreviewProps) {
  return (
    <Grid templateColumns={{ base: "1fr", md: "160px minmax(0, 1fr)" }} gap={3}>
      <PreviewCode>{name}</PreviewCode>

      <HStack gap={3} minW={0}>
        <Box
          {...{ [property]: name }}
          h="14px"
          maxW="full"
          minW="4px"
          rounded="full"
          bg="accent"
        />

        <StudyText variant="muted" size="sm">
          token: {name}
        </StudyText>
      </HStack>
    </Grid>
  );
}

type AnimationPreviewProps = {
  name: string;
};

function AnimationPreview({ name }: AnimationPreviewProps) {
  return (
    <HStack
      justify="space-between"
      gap={4}
      p={3}
      rounded="card"
      borderWidth="1px"
      borderColor="borderSubtle"
      bg="panelBgSubtle"
    >
      <Stack gap={1}>
        <StudyText variant="label">{name}</StudyText>
        <PreviewCode>{`animation="${name}"`}</PreviewCode>
      </Stack>

      <Box
        boxSize="40px"
        rounded="card"
        bg="accent"
        animation={name}
        flexShrink={0}
      />
    </HStack>
  );
}

type StatusSurfaceProps = {
  variant: "success" | "warning" | "danger" | "info";
  label: string;
};

function StatusSurface({ variant, label }: StatusSurfaceProps) {
  return (
    <StudyBox variant={variant} size="md">
      <StudyText variant="label">{label}</StudyText>
      <StudyText variant="muted">
        Preview of the {variant} surface variant.
      </StudyText>
    </StudyBox>
  );
}