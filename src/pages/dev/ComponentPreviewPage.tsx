import { HStack, SimpleGrid, Stack } from "@chakra-ui/react";
import { useState, type ChangeEvent } from "react";
import {
  LuBell,
  LuBookOpen,
  LuCheck,
  LuClipboardList,
  LuEllipsis,
  LuEye,
  LuFile,
  LuGraduationCap,
  LuInfo,
  LuPencil,
  LuPlus,
  LuSettings,
  LuTrash,
} from "react-icons/lu";

import {
  StudyAvatar,
  StudyBadge,
  StudyBox,
  StudyButton,
  StudyCard,
  StudyChip,
  StudyConfirmDialog,
  StudyDialog,
  StudyDivider,
  StudyHeading,
  StudyIconButton,
  StudyImage,
  StudyLink,
  StudyListItem,
  StudyMenu,
  StudyPopover,
  StudySearchInput,
  StudyTable,
  StudyTabs,
  StudyText,
  StudyTooltip,
  type StudyTableColumn,
} from "@/components/ui";
import {
  PreviewCard,
  PreviewCode,
  PreviewLayout,
  PreviewSection,
} from "@/pages/dev/components";

const navItems = [
  { id: "buttons", label: "Buttons" },
  { id: "icon-buttons", label: "Icon Buttons" },
  { id: "typography", label: "Typography" },
  { id: "badges", label: "Badges" },
  { id: "chips", label: "Chips" },
  { id: "cards", label: "Cards" },
  { id: "boxes", label: "Boxes" },
  { id: "avatars", label: "Avatars" },
  { id: "images", label: "Images" },
  { id: "links-dividers", label: "Links & Dividers" },
  { id: "search", label: "Search Input" },
  { id: "list-items", label: "List Items" },
  { id: "menus-popovers", label: "Menus & Popovers" },
  { id: "dialogs", label: "Dialogs" },
  { id: "tabs", label: "Tabs" },
  { id: "tables", label: "Tables" },
];

const previewImageSrc = `data:image/svg+xml;utf8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450">
    <rect width="800" height="450" fill="#2563eb"/>
    <circle cx="640" cy="120" r="100" fill="#60a5fa" opacity="0.55"/>
    <circle cx="210" cy="330" r="150" fill="#1e40af" opacity="0.55"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="Arial" font-size="44" font-weight="700">StudyCentral</text>
  </svg>
`)}`;

type DemoStudent = {
  id: string;
  name: string;
  email: string;
  role: "Student" | "Teacher";
  status: "Active" | "Pending";
};

const demoStudents: DemoStudent[] = [
  {
    id: "1",
    name: "Ali Hassan",
    email: "ali.hassan@example.com",
    role: "Student",
    status: "Active",
  },
  {
    id: "2",
    name: "Emma Larsen",
    email: "emma.larsen@example.com",
    role: "Student",
    status: "Pending",
  },
  {
    id: "3",
    name: "Jonas Mikkelsen",
    email: "jonas.mikkelsen@example.com",
    role: "Teacher",
    status: "Active",
  },
];

const studentColumns: StudyTableColumn<DemoStudent>[] = [
  {
    key: "name",
    header: "Name",
    render: (student) => (
      <HStack gap={3}>
        <StudyAvatar fullName={student.name} size="sm" />
        <Stack gap={0}>
          <StudyText variant="label">{student.name}</StudyText>
          <StudyText variant="subtle">{student.email}</StudyText>
        </Stack>
      </HStack>
    ),
  },
  {
    key: "role",
    header: "Role",
    render: (student) => (
      <StudyBadge variant="role" size="sm">
        {student.role}
      </StudyBadge>
    ),
  },
  {
    key: "status",
    header: "Status",
    align: "end",
    render: (student) => (
      <StudyBadge
        variant={student.status === "Active" ? "success" : "warning"}
        size="sm"
      >
        {student.status}
      </StudyBadge>
    ),
  },
];

export function ComponentPreviewPage() {
  const [search, setSearch] = useState("");

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  function handleClearSearch() {
    setSearch("");
  }

  function getStudentRowKey(student: DemoStudent) {
    return student.id;
  }

  return (
    <PreviewLayout
      title="Component Preview"
      description="A visual reference for reusable StudyCentral UI components, variants, sizes, and common usage patterns."
      navItems={navItems}
    >
      <PreviewSection
        id="buttons"
        title="Buttons"
        description="Primary actions, secondary actions, destructive actions, ghost actions, and link-style buttons."
      >
        <PreviewCard title="Button variants" tokenPath="StudyButton">
          <HStack gap={3} wrap="wrap">
            <StudyButton variant="primary">Primary</StudyButton>
            <StudyButton variant="secondary">Secondary</StudyButton>
            <StudyButton variant="ghost">Ghost</StudyButton>
            <StudyButton variant="danger">Danger</StudyButton>
            <StudyButton variant="link">Link button</StudyButton>
          </HStack>
        </PreviewCard>

        <PreviewCard title="Button sizes" tokenPath="StudyButton.size">
          <HStack gap={3} align="center" wrap="wrap">
            <StudyButton size="sm">Small</StudyButton>
            <StudyButton size="md">Medium</StudyButton>
            <StudyButton size="lg">Large</StudyButton>
          </HStack>
        </PreviewCard>

        <PreviewCard title="Button states" tokenPath="StudyButton states">
          <HStack gap={3} wrap="wrap">
            <StudyButton disabled>Disabled</StudyButton>
            <StudyButton animationVariant="scaleInFast">Animated</StudyButton>
          </HStack>
        </PreviewCard>
      </PreviewSection>

      <PreviewSection
        id="icon-buttons"
        title="Icon Buttons"
        description="Compact icon-only controls for toolbars, navigation, and row actions."
      >
        <PreviewCard title="Icon button variants" tokenPath="StudyIconButton">
          <HStack gap={3} wrap="wrap">
            <StudyIconButton aria-label="Add" variant="primary">
              <LuPlus />
            </StudyIconButton>

            <StudyIconButton aria-label="Settings" variant="secondary">
              <LuSettings />
            </StudyIconButton>

            <StudyIconButton aria-label="View" variant="ghost">
              <LuEye />
            </StudyIconButton>

            <StudyIconButton aria-label="Delete" variant="danger">
              <LuTrash />
            </StudyIconButton>
          </HStack>
        </PreviewCard>

        <PreviewCard title="Icon button sizes" tokenPath="StudyIconButton.size">
          <HStack gap={3} align="center" wrap="wrap">
            <StudyIconButton aria-label="Small add" size="xs">
              <LuPlus />
            </StudyIconButton>

            <StudyIconButton aria-label="Small settings" size="sm">
              <LuSettings />
            </StudyIconButton>

            <StudyIconButton aria-label="Medium view" size="md">
              <LuEye />
            </StudyIconButton>

            <StudyIconButton aria-label="Large delete" size="lg">
              <LuTrash />
            </StudyIconButton>
          </HStack>
        </PreviewCard>
      </PreviewSection>

      <PreviewSection
        id="typography"
        title="Typography"
        description="Reusable heading and text wrappers."
      >
        <PreviewCard title="Heading variants" tokenPath="StudyHeading">
          <Stack gap={4}>
            <StudyHeading variant="page">Page heading</StudyHeading>
            <StudyHeading variant="section">Section heading</StudyHeading>
            <StudyHeading variant="card">Card heading</StudyHeading>
            <StudyHeading variant="subtle">Subtle heading</StudyHeading>
          </Stack>
        </PreviewCard>

        <PreviewCard title="Text variants" tokenPath="StudyText">
          <Stack gap={3}>
            <StudyText variant="body">Body text for normal content.</StudyText>
            <StudyText variant="muted">
              Muted text for descriptions and secondary content.
            </StudyText>
            <StudyText variant="subtle">
              Subtle text for metadata and low-emphasis details.
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
        id="badges"
        title="Badges"
        description="Small status labels for roles, states, and metadata."
      >
        <PreviewCard title="Badge variants" tokenPath="StudyBadge">
          <HStack gap={2} wrap="wrap">
            <StudyBadge variant="neutral">Neutral</StudyBadge>
            <StudyBadge variant="info">Info</StudyBadge>
            <StudyBadge variant="success">Success</StudyBadge>
            <StudyBadge variant="warning">Warning</StudyBadge>
            <StudyBadge variant="danger">Danger</StudyBadge>
            <StudyBadge variant="role">Teacher</StudyBadge>
            <StudyBadge variant="accent">Accent</StudyBadge>
          </HStack>
        </PreviewCard>

        <PreviewCard title="Badge sizes" tokenPath="StudyBadge.size">
          <HStack gap={2} align="center" wrap="wrap">
            <StudyBadge size="sm">Small</StudyBadge>
            <StudyBadge size="md">Medium</StudyBadge>
            <StudyBadge size="lg">Large</StudyBadge>
          </HStack>
        </PreviewCard>
      </PreviewSection>

      <PreviewSection
        id="chips"
        title="Chips"
        description="Compact item containers for selected files, filters, students, or removable values."
      >
        <PreviewCard title="Chip variants" tokenPath="StudyChip">
          <HStack gap={3} wrap="wrap">
            <StudyChip>Default chip</StudyChip>
            <StudyChip variant="subtle">Subtle chip</StudyChip>
            <StudyChip variant="accent">Accent chip</StudyChip>
            <StudyChip variant="success">Uploaded</StudyChip>
            <StudyChip variant="warning">Missing feedback</StudyChip>
            <StudyChip variant="danger">Failed</StudyChip>
            <StudyChip variant="info">Info chip</StudyChip>
          </HStack>
        </PreviewCard>

        <PreviewCard title="Interactive chips" tokenPath="StudyChip actions">
          <HStack gap={3} wrap="wrap">
            <StudyChip removable removeLabel="Remove file">
              report.pdf
            </StudyChip>

            <StudyChip addable addLabel="Add student" variant="accent">
              Add student
            </StudyChip>

            <StudyChip draggable variant="subtle">
              Draggable item
            </StudyChip>
          </HStack>
        </PreviewCard>
      </PreviewSection>

      <PreviewSection
        id="cards"
        title="Cards"
        description="Reusable surfaces for grouped content and clickable previews."
      >
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
          <StudyCard>
            <Stack gap={2}>
              <StudyHeading variant="card">Default card</StudyHeading>
              <StudyText variant="muted">
                Used for normal grouped content.
              </StudyText>
            </Stack>
          </StudyCard>

          <StudyCard variant="subtle">
            <Stack gap={2}>
              <StudyHeading variant="card">Subtle card</StudyHeading>
              <StudyText variant="muted">
                Used for lower-emphasis grouped content.
              </StudyText>
            </Stack>
          </StudyCard>

          <StudyCard variant="interactive">
            <Stack gap={2}>
              <StudyHeading variant="card">Interactive card</StudyHeading>
              <StudyText variant="muted">
                Used for clickable course or file cards.
              </StudyText>
            </Stack>
          </StudyCard>

          <StudyCard variant="danger">
            <Stack gap={2}>
              <StudyHeading variant="card">Danger card</StudyHeading>
              <StudyText variant="error">
                Used for destructive or high-risk information.
              </StudyText>
            </Stack>
          </StudyCard>
        </SimpleGrid>
      </PreviewSection>

      <PreviewSection
        id="boxes"
        title="Boxes"
        description="Low-level styled surface wrapper used by layout and feedback components."
      >
        <PreviewCard title="Box variants" tokenPath="StudyBox">
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
            <StudyBox variant="surface" size="md" rounded="card">
              <StudyText variant="label">Surface</StudyText>
              <StudyText variant="muted">Basic surface background.</StudyText>
            </StudyBox>

            <StudyBox variant="panel" size="md">
              <StudyText variant="label">Panel</StudyText>
              <StudyText variant="muted">Bordered panel surface.</StudyText>
            </StudyBox>

            <StudyBox variant="subtle" size="md">
              <StudyText variant="label">Subtle</StudyText>
              <StudyText variant="muted">Low-emphasis surface.</StudyText>
            </StudyBox>

            <StudyBox variant="info" size="md">
              <StudyText variant="label">Info</StudyText>
              <StudyText variant="muted">
                Informational status surface.
              </StudyText>
            </StudyBox>
          </SimpleGrid>
        </PreviewCard>
      </PreviewSection>

      <PreviewSection
        id="avatars"
        title="Avatars"
        description="Identity display with initials, image fallback, sizes, shapes, and variants."
      >
        <PreviewCard title="Avatar sizes" tokenPath="StudyAvatar.size">
          <HStack gap={4} align="center" wrap="wrap">
            <StudyAvatar fullName="Ali Hassan" size="sm" />
            <StudyAvatar fullName="Emma Larsen" size="md" />
            <StudyAvatar fullName="Jonas Mikkelsen" size="lg" />
          </HStack>
        </PreviewCard>

        <PreviewCard
          title="Avatar variants"
          tokenPath="StudyAvatar.avatarVariant"
        >
          <HStack gap={4} align="center" wrap="wrap">
            <StudyAvatar fullName="Accent User" avatarVariant="accent" />
            <StudyAvatar fullName="Neutral User" avatarVariant="neutral" />
            <StudyAvatar fullName="Success User" avatarVariant="success" />
            <StudyAvatar fullName="Warning User" avatarVariant="warning" />
            <StudyAvatar fullName="Danger User" avatarVariant="danger" />
            <StudyAvatar shape="rounded" />
          </HStack>
        </PreviewCard>
      </PreviewSection>

      <PreviewSection
        id="images"
        title="Images"
        description="Image wrapper variants for covers, thumbnails, logos, icons, and avatar-like images."
      >
        <PreviewCard title="Image variants" tokenPath="StudyImage">
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
            <StudyImage
              src={previewImageSrc}
              alt="Preview cover"
              variant="cover"
            />
            <StudyImage
              src={previewImageSrc}
              alt="Preview default"
              variant="default"
            />

            <HStack gap={4}>
              <StudyImage
                src={previewImageSrc}
                alt="Preview thumbnail"
                variant="thumbnail"
              />
              <StudyImage
                src={previewImageSrc}
                alt="Preview logo"
                variant="logo"
              />
              <StudyImage
                src={previewImageSrc}
                alt="Preview icon"
                variant="icon"
              />
              <StudyImage
                src={previewImageSrc}
                alt="Preview avatar"
                variant="avatar"
              />
            </HStack>
          </SimpleGrid>
        </PreviewCard>
      </PreviewSection>

      <PreviewSection
        id="links-dividers"
        title="Links & Dividers"
        description="Inline navigation links and separators."
      >
        <PreviewCard title="Link variants" tokenPath="StudyLink">
          <HStack gap={4} wrap="wrap">
            <StudyLink href="#links-dividers">Default link</StudyLink>
            <StudyLink href="#links-dividers" linkVariant="muted">
              Muted link
            </StudyLink>
            <StudyLink href="#links-dividers" linkVariant="subtle">
              Subtle link
            </StudyLink>
            <StudyLink href="#links-dividers" linkVariant="nav">
              Nav link
            </StudyLink>
            <StudyLink href="#links-dividers" linkVariant="danger">
              Danger link
            </StudyLink>
          </HStack>
        </PreviewCard>

        <PreviewCard title="Dividers" tokenPath="StudyDivider">
          <Stack gap={4}>
            <StudyDivider />
            <StudyDivider variant="strong" />
            <StudyDivider variant="accent" />
            <StudyDivider variant="danger" />

            <HStack h="40px" gap={4}>
              <StudyText>Left</StudyText>
              <StudyDivider orientation="vertical" variant="strong" />
              <StudyText>Right</StudyText>
            </HStack>
          </Stack>
        </PreviewCard>
      </PreviewSection>

      <PreviewSection
        id="search"
        title="Search Input"
        description="Search field used in course lists, file lists, student lists, and filters."
      >
        <PreviewCard title="Search input" tokenPath="StudySearchInput">
          <Stack gap={4} maxW="480px">
            <StudySearchInput
              placeholder="Search courses"
              value={search}
              onChange={handleSearchChange}
              onClear={handleClearSearch}
            />

            <StudySearchInput
              size="sm"
              variant="subtle"
              placeholder="Small search"
              value={search}
              onChange={handleSearchChange}
              onClear={handleClearSearch}
            />
          </Stack>
        </PreviewCard>
      </PreviewSection>

      <PreviewSection
        id="list-items"
        title="List Items"
        description="Reusable row/card item for files, assignments, announcements, and course members."
      >
        <PreviewCard title="List item variants" tokenPath="StudyListItem">
          <Stack gap={3}>
            <StudyListItem
              title="Mandatory assignment 1"
              description="Upload your report before the deadline."
              meta="Due 14:00"
              variant="interactive"
              leading={<StudyBadge variant="warning">Open</StudyBadge>}
              trailing={
                <StudyIconButton aria-label="Open assignment" size="sm">
                  <LuEye />
                </StudyIconButton>
              }
            />

            <StudyListItem
              title="report.pdf"
              description="PDF document"
              meta="2.4 MB"
              size="sm"
              variant="subtle"
              leading={<LuFile />}
            />

            <StudyListItem
              title="Submission received"
              description="The student has submitted the assignment."
              variant="success"
              leading={<LuCheck />}
            />
          </Stack>
        </PreviewCard>
      </PreviewSection>

      <PreviewSection
        id="menus-popovers"
        title="Menus, Popovers & Tooltips"
        description="Small overlays for actions, contextual information, and compact panels."
      >
        <PreviewCard title="Menu" tokenPath="StudyMenu">
          <StudyMenu
            trigger={
              <StudyIconButton aria-label="Open menu" variant="secondary">
                <LuEllipsis />
              </StudyIconButton>
            }
            items={[
              {
                value: "view",
                label: "View details",
                icon: <LuEye />,
              },
              {
                value: "edit",
                label: "Edit",
                icon: <LuPencil />,
              },
              {
                value: "delete",
                label: "Delete",
                icon: <LuTrash />,
                danger: true,
              },
            ]}
          />
        </PreviewCard>

        <PreviewCard title="Popover" tokenPath="StudyPopover">
          <StudyPopover
            title="Course actions"
            description="Quick actions for the selected course."
            showCloseButton
            trigger={
              <StudyButton variant="secondary" size="sm">
                Open popover
              </StudyButton>
            }
          >
            <Stack gap={3}>
              <StudyText variant="muted">
                This area can contain short forms, actions, or contextual
                details.
              </StudyText>

              <HStack gap={2}>
                <StudyButton size="sm">Save</StudyButton>
                <StudyButton variant="secondary" size="sm">
                  Cancel
                </StudyButton>
              </HStack>
            </Stack>
          </StudyPopover>
        </PreviewCard>

        <PreviewCard title="Tooltip" tokenPath="StudyTooltip">
          <HStack gap={3}>
            <StudyTooltip content="Create a new course">
              <StudyIconButton aria-label="Create course" variant="primary">
                <LuPlus />
              </StudyIconButton>
            </StudyTooltip>

            <StudyTooltip
              content="This action deletes the selected item."
              variant="danger"
            >
              <StudyIconButton aria-label="Delete item" variant="danger">
                <LuTrash />
              </StudyIconButton>
            </StudyTooltip>
          </HStack>
        </PreviewCard>
      </PreviewSection>

      <PreviewSection
        id="dialogs"
        title="Dialogs"
        description="Modal overlays for forms, confirmations, and high-focus actions."
      >
        <PreviewCard title="Dialog" tokenPath="StudyDialog">
          <StudyDialog
            title="Create course"
            description="Fill out the basic course information."
            trigger={<StudyButton>Create course</StudyButton>}
            footer={
              <>
                <StudyButton variant="secondary" size="sm">
                  Cancel
                </StudyButton>
                <StudyButton size="sm">Create</StudyButton>
              </>
            }
          >
            <Stack gap={3}>
              <StudyText variant="muted">
                This is a normal dialog body. Later this can contain a form.
              </StudyText>

              <StudyBox variant="subtle" size="sm">
                <StudyText variant="label">Course name</StudyText>
                <StudyText variant="subtle">
                  Example placeholder content.
                </StudyText>
              </StudyBox>
            </Stack>
          </StudyDialog>
        </PreviewCard>

        <PreviewCard title="Confirm dialog" tokenPath="StudyConfirmDialog">
          <StudyConfirmDialog
            title="Delete assignment"
            description="This action cannot be undone."
            trigger={
              <StudyButton variant="danger" size="sm">
                Delete assignment
              </StudyButton>
            }
            confirmLabel="Delete"
            onConfirm={() => undefined}
          >
            <StudyText variant="muted">
              Are you sure you want to delete this assignment?
            </StudyText>
          </StudyConfirmDialog>
        </PreviewCard>
      </PreviewSection>

      <PreviewSection
        id="tabs"
        title="Tabs"
        description="Tabbed content areas with optional icons."
      >
        <PreviewCard title="Default tabs" tokenPath="StudyTabs">
          <StudyTabs
            defaultValue="overview"
            items={[
              {
                value: "overview",
                label: "Overview",
                icon: <LuBookOpen />,
                content: (
                  <StudyCard variant="subtle" size="sm">
                    <StudyText>Overview tab content.</StudyText>
                  </StudyCard>
                ),
              },
              {
                value: "assignments",
                label: "Assignments",
                icon: <LuClipboardList />,
                content: (
                  <StudyCard variant="subtle" size="sm">
                    <StudyText>Assignments tab content.</StudyText>
                  </StudyCard>
                ),
              },
              {
                value: "students",
                label: "Students",
                icon: <LuGraduationCap />,
                content: (
                  <StudyCard variant="subtle" size="sm">
                    <StudyText>Students tab content.</StudyText>
                  </StudyCard>
                ),
              },
            ]}
          />
        </PreviewCard>

        <PreviewCard title="Subtle tabs" tokenPath="StudyTabs.tabsVariant">
          <StudyTabs
            tabsVariant="subtle"
            tabsSize="sm"
            defaultValue="active"
            items={[
              {
                value: "active",
                label: "Active",
                icon: <LuBell />,
                content: <StudyText>Active content.</StudyText>,
              },
              {
                value: "archived",
                label: "Archived",
                icon: <LuInfo />,
                content: <StudyText>Archived content.</StudyText>,
              },
            ]}
          />
        </PreviewCard>
      </PreviewSection>

      <PreviewSection
        id="tables"
        title="Tables"
        description="Basic data table wrapper for students, submissions, assignments, and course members."
      >
        <PreviewCard title="Student table" tokenPath="StudyTable">
          <StudyTable
            columns={studentColumns}
            items={demoStudents}
            getRowKey={getStudentRowKey}
            emptyText="No students found."
          />
        </PreviewCard>

        <PreviewCard title="Empty table" tokenPath="StudyTable.emptyText">
          <StudyTable
            columns={studentColumns}
            items={[]}
            getRowKey={getStudentRowKey}
            emptyText="No students found."
          />
        </PreviewCard>
      </PreviewSection>

      <PreviewSection
        id="quick-reference"
        title="Quick Reference"
        description="Small reference block for common usage patterns."
      >
        <PreviewCard title="Common imports" tokenPath="@/components/ui">
          <Stack gap={2}>
            <PreviewCode>{`import { StudyButton } from "@/components/ui";`}</PreviewCode>
            <PreviewCode>{`import { StudyCard } from "@/components/ui";`}</PreviewCode>
            <PreviewCode>{`import { StudyText } from "@/components/ui";`}</PreviewCode>
            <PreviewCode>{`import { StudyTabs } from "@/components/ui";`}</PreviewCode>
          </Stack>
        </PreviewCard>

        <PreviewCard title="Layout rule" tokenPath="project convention">
          <Stack gap={3}>
            <StudyText variant="muted">
              Use Study-components for styled UI surfaces and controls. Keep
              Chakra primitives for pure layout.
            </StudyText>

            <HStack gap={2} wrap="wrap">
              <StudyBadge variant="success">StudyButton</StudyBadge>
              <StudyBadge variant="success">StudyCard</StudyBadge>
              <StudyBadge variant="success">StudyText</StudyBadge>
              <StudyBadge variant="neutral">Stack</StudyBadge>
              <StudyBadge variant="neutral">HStack</StudyBadge>
              <StudyBadge variant="neutral">Grid</StudyBadge>
            </HStack>
          </Stack>
        </PreviewCard>
      </PreviewSection>
    </PreviewLayout>
  );
}
