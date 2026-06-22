import { Tabs } from "@chakra-ui/react";
import type { ComponentProps, ReactNode } from "react";

export type StudyTabsVariant = "default" | "subtle" | "enclosed";
export type StudyTabsSize = "sm" | "md" | "lg";

type TabsRootProps = ComponentProps<typeof Tabs.Root>;
type TabsListProps = ComponentProps<typeof Tabs.List>;
type TabsTriggerProps = ComponentProps<typeof Tabs.Trigger>;
type TabsContentProps = ComponentProps<typeof Tabs.Content>;

type TabsListStyleProps = Partial<TabsListProps>;
type TabsTriggerStyleProps = Partial<
  Omit<TabsTriggerProps, "value" | "disabled" | "children">
>;
type TabsContentStyleProps = Partial<
  Omit<TabsContentProps, "value" | "children">
>;

export type StudyTabItem = {
  value: string;
  label: ReactNode;
  content: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
};

export type StudyTabsProps = Omit<
  TabsRootProps,
  "children" | "variant" | "size"
> & {
  items: StudyTabItem[];
  tabsVariant?: StudyTabsVariant;
  tabsSize?: StudyTabsSize;
  listProps?: TabsListProps;
  triggerProps?: TabsTriggerStyleProps;
  contentProps?: TabsContentStyleProps;
};

const listVariantStyles: Record<StudyTabsVariant, TabsListStyleProps> = {
  default: {
    borderBottomWidth: "1px",
    borderColor: "borderSubtle",
  },

  subtle: {
    bg: "panelBgSubtle",
    borderWidth: "1px",
    borderColor: "borderSubtle",
    rounded: "button",
    p: 1,
  },

  enclosed: {
    borderBottomWidth: "1px",
    borderColor: "borderStrong",
  },
};

const triggerVariantStyles: Record<StudyTabsVariant, TabsTriggerStyleProps> = {
  default: {
    color: "textMuted",
    borderBottomWidth: "2px",
    borderColor: "transparent",
    rounded: "0",
    _selected: {
      color: "accent",
      borderColor: "accent",
    },
    _hover: {
      color: "textMain",
    },
  },

  subtle: {
    color: "textMuted",
    rounded: "button",
    borderWidth: "1px",
    borderColor: "transparent",
    _selected: {
      color: "textMain",
      bg: "surfaceBg",
      borderColor: "borderStrong",
      shadow: "sm",
    },
    _hover: {
      color: "textMain",
      bg: "activeBg",
    },
  },

  enclosed: {
    color: "textMuted",
    borderWidth: "1px",
    borderColor: "transparent",
    borderBottomWidth: "0",
    roundedTop: "button",
    _selected: {
      color: "textMain",
      bg: "surfaceBg",
      borderColor: "borderStrong",
    },
    _hover: {
      color: "textMain",
      bg: "panelBgSubtle",
    },
  },
};

const triggerSizeStyles: Record<StudyTabsSize, TabsTriggerStyleProps> = {
  sm: {
    h: "32px",
    px: 3,
    fontSize: "sm",
  },

  md: {
    h: "40px",
    px: 4,
    fontSize: "sm",
  },

  lg: {
    h: "48px",
    px: 5,
    fontSize: "md",
  },
};

const contentSizeStyles: Record<StudyTabsSize, TabsContentStyleProps> = {
  sm: {
    pt: 3,
  },

  md: {
    pt: 4,
  },

  lg: {
    pt: 5,
  },
};

export function StudyTabs({
  items,
  tabsVariant = "default",
  tabsSize = "md",
  listProps,
  triggerProps,
  contentProps,
  ...rootProps
}: StudyTabsProps) {
  return (
    <Tabs.Root {...rootProps}>
      <Tabs.List
        gap={tabsVariant === "subtle" ? 1 : 0}
        overflowX="auto"
        overflowY="hidden"
        {...listVariantStyles[tabsVariant]}
        {...listProps}
      >
        {items.map((item) => (
          <Tabs.Trigger
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            gap={2}
            flexShrink={0}
            fontWeight="semibold"
            cursor={item.disabled ? "not-allowed" : "pointer"}
            transitionProperty="background-color, border-color, color, box-shadow"
            transitionDuration="fast"
            _disabled={{
              opacity: 0.55,
              cursor: "not-allowed",
            }}
            {...triggerVariantStyles[tabsVariant]}
            {...triggerSizeStyles[tabsSize]}
            {...triggerProps}
          >
            {item.icon}
            {item.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {items.map((item) => (
        <Tabs.Content
          key={item.value}
          value={item.value}
          animation="fadeInFast"
          {...contentSizeStyles[tabsSize]}
          {...contentProps}
        >
          {item.content}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}