import { Box, HStack, SimpleGrid, Stack } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { useState } from "react";

import { EmptyState, ErrorState, LoadingState } from "@/components/feedback";
import {
  StudyField,
  StudyInput,
  StudyTextarea,
} from "@/components/forms";
import {
  StudyAvatar,
  StudyBadge,
  StudyButton,
  StudyCard,
  StudyDivider,
  StudyHeading,
  StudyIconButton,
  StudyText,
} from "@/components/ui";
import { StudyFileInput } from "@/components/forms/StudyFileInput";

type PreviewCardProps = {
  title: string;
  tokenPath?: string;
  description?: string;
  children: ReactNode;
};

function PreviewCard({
  title,
  tokenPath,
  description,
  children,
}: PreviewCardProps) {
  return (
    <StudyCard p={0} overflow="hidden">
      <Box
        px={6}
        py={5}
        borderBottomWidth="1px"
        borderColor="borderSubtle"
      >
        <HStack justify="space-between" align="start" gap={6}>
          <Stack gap={1}>
            <StudyHeading variant="section">{title}</StudyHeading>

            {description && (
              <StudyText variant="muted" fontSize="md">
                {description}
              </StudyText>
            )}
          </Stack>

          {tokenPath && (
            <StudyText
              variant="label"
              color="textMain"
              whiteSpace="nowrap"
              pt={1}
            >
              {tokenPath}
            </StudyText>
          )}
        </HStack>
      </Box>

      <Box p={6}>{children}</Box>
    </StudyCard>
  );
}

type ComponentRowProps = {
  name: string;
  description: string;
  propsText?: string;
  children: ReactNode;
};

function ComponentRow({
  name,
  description,
  propsText,
  children,
}: ComponentRowProps) {
  return (
    <Box
      py={5}
      borderBottomWidth="1px"
      borderColor="borderSubtle"
      _last={{
        borderBottomWidth: 0,
      }}
    >
      <SimpleGrid columns={{ base: 1, lg: 3 }} gap={5} alignItems="center">
        <Stack gap={1}>
          <StudyText variant="label">{name}</StudyText>
          <StudyText variant="muted">{description}</StudyText>
        </Stack>

        <Box
          rounded="button"
          bg="panelBgSubtle"
          px={4}
          py={3}
          fontFamily="mono"
          fontSize="sm"
          color="textMuted"
          overflowX="auto"
        >
          {propsText ?? "default"}
        </Box>

        <Box>{children}</Box>
      </SimpleGrid>
    </Box>
  );
}

export function ComponentPreviewPage() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <Box minH="100vh" bg="appBg" color="textMain" px={8} py={8}>
      <Stack gap={8} maxW="contentMaxWidth" mx="auto">
        <Box>
          <StudyHeading variant="page">Component Preview</StudyHeading>
          <StudyText variant="muted" fontSize="md" mt={2}>
            Reusable StudyCentral frontend components and their supported
            variants.
          </StudyText>
        </Box>

        <PreviewCard
          title="1. Buttons"
          tokenPath="components/ui"
          description="Button wrappers for common StudyCentral actions."
        >
          <Stack gap={0}>
            <ComponentRow
              name="StudyButton"
              description="Primary action button."
              propsText='variant="primary"'
            >
              <StudyButton variant="primary">Primary</StudyButton>
            </ComponentRow>

            <ComponentRow
              name="StudyButton"
              description="Secondary action button."
              propsText='variant="secondary"'
            >
              <StudyButton variant="secondary">Secondary</StudyButton>
            </ComponentRow>

            <ComponentRow
              name="StudyButton"
              description="Low emphasis button."
              propsText='variant="ghost"'
            >
              <StudyButton variant="ghost">Ghost</StudyButton>
            </ComponentRow>

            <ComponentRow
              name="StudyButton"
              description="Danger/destructive action."
              propsText='variant="danger"'
            >
              <StudyButton variant="danger">Delete</StudyButton>
            </ComponentRow>

            <ComponentRow
              name="StudyButton"
              description="Inline link-style action."
              propsText='variant="link"'
            >
              <StudyButton variant="link">Open course</StudyButton>
            </ComponentRow>

            <ComponentRow
              name="StudyButton"
              description="Disabled button state."
              propsText="disabled"
            >
              <StudyButton disabled>Disabled</StudyButton>
            </ComponentRow>
          </Stack>
        </PreviewCard>

        <PreviewCard
          title="2. Icon Buttons"
          tokenPath="components/ui"
          description="Compact action buttons for icon-based actions."
        >
          <Stack gap={0}>
            <ComponentRow
              name="StudyIconButton"
              description="Primary icon action."
              propsText='variant="primary"'
            >
              <StudyIconButton aria-label="Add item" variant="primary">
                +
              </StudyIconButton>
            </ComponentRow>

            <ComponentRow
              name="StudyIconButton"
              description="Secondary icon action."
              propsText='variant="secondary"'
            >
              <StudyIconButton aria-label="Edit item" variant="secondary">
                ✎
              </StudyIconButton>
            </ComponentRow>

            <ComponentRow
              name="StudyIconButton"
              description="Ghost icon action."
              propsText='variant="ghost"'
            >
              <StudyIconButton aria-label="More options" variant="ghost">
                ⋯
              </StudyIconButton>
            </ComponentRow>

            <ComponentRow
              name="StudyIconButton"
              description="Destructive icon action."
              propsText='variant="danger"'
            >
              <StudyIconButton aria-label="Delete item" variant="danger">
                ×
              </StudyIconButton>
            </ComponentRow>
          </Stack>
        </PreviewCard>

        <PreviewCard
          title="3. Text"
          tokenPath="components/ui"
          description="Text variants for body, muted text, labels, and feedback messages."
        >
          <Stack gap={0}>
            <ComponentRow
              name="StudyText"
              description="Default paragraph text."
              propsText='variant="body"'
            >
              <StudyText variant="body">This is normal body text.</StudyText>
            </ComponentRow>

            <ComponentRow
              name="StudyText"
              description="Muted secondary text."
              propsText='variant="muted"'
            >
              <StudyText variant="muted">This is muted text.</StudyText>
            </ComponentRow>

            <ComponentRow
              name="StudyText"
              description="Subtle helper text."
              propsText='variant="subtle"'
            >
              <StudyText variant="subtle">This is subtle text.</StudyText>
            </ComponentRow>

            <ComponentRow
              name="StudyText"
              description="Form label text."
              propsText='variant="label"'
            >
              <StudyText variant="label">Label text</StudyText>
            </ComponentRow>

            <ComponentRow
              name="StudyText"
              description="Error text."
              propsText='variant="error"'
            >
              <StudyText variant="error">Something failed.</StudyText>
            </ComponentRow>

            <ComponentRow
              name="StudyText"
              description="Success text."
              propsText='variant="success"'
            >
              <StudyText variant="success">Saved successfully.</StudyText>
            </ComponentRow>

            <ComponentRow
              name="StudyText"
              description="Warning text."
              propsText='variant="warning"'
            >
              <StudyText variant="warning">Deadline is close.</StudyText>
            </ComponentRow>
          </Stack>
        </PreviewCard>

        <PreviewCard
          title="4. Headings"
          tokenPath="components/ui"
          description="Heading variants for page, section, card, and subtle titles."
        >
          <Stack gap={0}>
            <ComponentRow
              name="StudyHeading"
              description="Main page heading."
              propsText='variant="page"'
            >
              <StudyHeading variant="page">Page heading</StudyHeading>
            </ComponentRow>

            <ComponentRow
              name="StudyHeading"
              description="Section heading."
              propsText='variant="section"'
            >
              <StudyHeading variant="section">Section heading</StudyHeading>
            </ComponentRow>

            <ComponentRow
              name="StudyHeading"
              description="Card heading."
              propsText='variant="card"'
            >
              <StudyHeading variant="card">Card heading</StudyHeading>
            </ComponentRow>

            <ComponentRow
              name="StudyHeading"
              description="Small subtle heading."
              propsText='variant="subtle"'
            >
              <StudyHeading variant="subtle">Subtle heading</StudyHeading>
            </ComponentRow>
          </Stack>
        </PreviewCard>

        <PreviewCard
          title="5. Cards"
          tokenPath="components/ui"
          description="Card containers for page sections and item previews."
        >
          <Stack gap={0}>
            <ComponentRow
              name="StudyCard"
              description="Default surface card."
              propsText='variant="default"'
            >
              <StudyCard>
                <StudyHeading variant="card">Default card</StudyHeading>
                <StudyText variant="muted" mt={1}>
                  Used for regular content blocks.
                </StudyText>
              </StudyCard>
            </ComponentRow>

            <ComponentRow
              name="StudyCard"
              description="Subtle card with lower emphasis."
              propsText='variant="subtle"'
            >
              <StudyCard variant="subtle">
                <StudyHeading variant="card">Subtle card</StudyHeading>
                <StudyText variant="muted" mt={1}>
                  Used for secondary grouped content.
                </StudyText>
              </StudyCard>
            </ComponentRow>

            <ComponentRow
              name="StudyCard"
              description="Interactive hoverable card."
              propsText='variant="interactive"'
            >
              <StudyCard variant="interactive">
                <StudyHeading variant="card">Interactive card</StudyHeading>
                <StudyText variant="muted" mt={1}>
                  Used for clickable courses or assignments.
                </StudyText>
              </StudyCard>
            </ComponentRow>

            <ComponentRow
              name="StudyCard"
              description="Danger bordered card."
              propsText='variant="danger"'
            >
              <StudyCard variant="danger">
                <StudyHeading variant="card">Danger card</StudyHeading>
                <StudyText variant="muted" mt={1}>
                  Used around destructive sections.
                </StudyText>
              </StudyCard>
            </ComponentRow>
          </Stack>
        </PreviewCard>

        <PreviewCard
          title="6. Badges"
          tokenPath="components/ui"
          description="Small labels for roles, statuses, and metadata."
        >
          <Stack gap={0}>
            <ComponentRow
              name="StudyBadge"
              description="Neutral badge."
              propsText='variant="neutral"'
            >
              <StudyBadge variant="neutral">Neutral</StudyBadge>
            </ComponentRow>

            <ComponentRow
              name="StudyBadge"
              description="Info badge."
              propsText='variant="info"'
            >
              <StudyBadge variant="info">Info</StudyBadge>
            </ComponentRow>

            <ComponentRow
              name="StudyBadge"
              description="Success badge."
              propsText='variant="success"'
            >
              <StudyBadge variant="success">Submitted</StudyBadge>
            </ComponentRow>

            <ComponentRow
              name="StudyBadge"
              description="Warning badge."
              propsText='variant="warning"'
            >
              <StudyBadge variant="warning">Due soon</StudyBadge>
            </ComponentRow>

            <ComponentRow
              name="StudyBadge"
              description="Danger badge."
              propsText='variant="danger"'
            >
              <StudyBadge variant="danger">Overdue</StudyBadge>
            </ComponentRow>

            <ComponentRow
              name="StudyBadge"
              description="Role badge."
              propsText='variant="role"'
            >
              <StudyBadge variant="role">Teacher</StudyBadge>
            </ComponentRow>
          </Stack>
        </PreviewCard>

        <PreviewCard
          title="7. Avatars"
          tokenPath="components/ui"
          description="User avatar wrapper with size and shape options."
        >
          <Stack gap={0}>
            <ComponentRow
              name="StudyAvatar"
              description="Small circular avatar."
              propsText='size="sm" shape="circle"'
            >
              <StudyAvatar name="Student User" size="sm" shape="circle" />
            </ComponentRow>

            <ComponentRow
              name="StudyAvatar"
              description="Medium circular avatar."
              propsText='size="md" shape="circle"'
            >
              <StudyAvatar name="Teacher User" size="md" shape="circle" />
            </ComponentRow>

            <ComponentRow
              name="StudyAvatar"
              description="Large circular avatar."
              propsText='size="lg" shape="circle"'
            >
              <StudyAvatar name="Admin User" size="lg" shape="circle" />
            </ComponentRow>

            <ComponentRow
              name="StudyAvatar"
              description="Rounded avatar."
              propsText='size="md" shape="rounded"'
            >
              <StudyAvatar name="Rounded User" size="md" shape="rounded" />
            </ComponentRow>
          </Stack>
        </PreviewCard>

        <PreviewCard
          title="8. Divider"
          tokenPath="components/ui"
          description="Separator using the project's border token."
        >
          <Stack gap={4}>
            <StudyText variant="muted">Content above divider</StudyText>
            <StudyDivider />
            <StudyText variant="muted">Content below divider</StudyText>
          </Stack>
        </PreviewCard>

        <PreviewCard
          title="9. Form Components"
          tokenPath="components/forms"
          description="Basic reusable form wrappers."
        >
          <Stack gap={6}>
            <StudyField
              label="Course name"
              helperText="Use a short and clear course name."
              required
            >
              <StudyInput placeholder="Example: System Integration" />
            </StudyField>

            <StudyField label="Assignment description">
              <StudyTextarea placeholder="Write the assignment description..." />
            </StudyField>

            <StudyField
              label="Invalid field"
              errorText="This field is required."
              required
            >
              <StudyInput placeholder="Invalid input example" />
            </StudyField>

            <StudyField label="Files">
              <StudyFileInput
                label="Select files"
                helperText="You can select up to 5 files."
                maxFiles={5}
                selectedFiles={files}
                onChange={setFiles}
              />
            </StudyField>
          </Stack>
        </PreviewCard>

        <PreviewCard
          title="10. Feedback Components"
          tokenPath="components/feedback"
          description="Reusable states for loading, empty, and error UI."
        >
          <Stack gap={6}>
            <EmptyState
              title="No assignments yet"
              description="Assignments created for this course will appear here."
              actionLabel="Create assignment"
              onAction={() => undefined}
            />

            <LoadingState text="Loading course data..." />

            <ErrorState
              title="Could not load course"
              description="Check your connection or try again."
              onRetry={() => undefined}
            />
          </Stack>
        </PreviewCard>
      </Stack>
    </Box>
  );
}