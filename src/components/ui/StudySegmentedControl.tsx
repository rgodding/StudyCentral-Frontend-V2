import { Tabs } from "@chakra-ui/react";
import type { ComponentProps, ReactNode } from "react";

export type StudySegmentedControlVariant = "subtle" | "underline";
export type StudySegmentedControlSize = "xs" | "sm" | "md" | "section";

type TabsRootProps = ComponentProps<typeof Tabs.Root>;
type TabsListProps = ComponentProps<typeof Tabs.List>;
type TabsTriggerProps = ComponentProps<typeof Tabs.Trigger>;

type TabsListStyleProps = Partial<TabsListProps>;
type TabsTriggerStyleProps = Partial<
  Omit<TabsTriggerProps, "value" | "disabled" | "children">
>;

export type StudySegmentedControlItem = {
  value: string;
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
};

export type StudySegmentedControlProps = Omit<
  TabsRootProps,
  "children" | "variant" | "size"
> & {
  items: StudySegmentedControlItem[];
  controlVariant?: StudySegmentedControlVariant;
  controlSize?: StudySegmentedControlSize;
  showActiveUnderline?: boolean;
  listProps?: TabsListProps;
  triggerProps?: TabsTriggerStyleProps;
};

const listVariantStyles: Record<
  StudySegmentedControlVariant,
  TabsListStyleProps
> = {
  subtle: {
    bg: "panelBgSubtle",
    borderWidth: "1px",
    borderColor: "borderSubtle",
    rounded: "button",
  },

  underline: {
    bg: "transparent",
    borderBottomWidth: "1px",
    borderColor: "borderSubtle",
  },
};

const listSizeStyles: Record<StudySegmentedControlSize, TabsListStyleProps> = {
  xs: {
    h: "22px",
    minH: "22px",
    p: "1px",
  },

  sm: {
    h: "28px",
    p: "2px",
  },

  md: {
    h: "36px",
    p: "3px",
  },

  section: {
    h: "36px",
    p: "3px",
  },
};

const triggerVariantStyles: Record<
  StudySegmentedControlVariant,
  TabsTriggerStyleProps
> = {
  subtle: {
    color: "textMuted",
    rounded: "button",
    borderWidth: "1px",
    borderColor: "transparent",
    _selected: {
      color: "accent",
      bg: "surfaceBg",
      borderColor: "borderStrong",
      shadow: "xs",
    },
    _hover: {
      color: "textMain",
      bg: "activeBg",
    },
  },

  underline: {
    color: "textMuted",
    rounded: "0",
    borderBottomWidth: "2px",
    borderColor: "transparent",
    _selected: {
      color: "accent",
      borderColor: "accent",
    },
    _hover: {
      color: "textMain",
    },
  },
};
const triggerSizeStyles: Record<
  StudySegmentedControlSize,
  TabsTriggerStyleProps
> = {
  xs: {
    h: "20px",
    px: 2,
    py: 0,
    fontSize: "xs",
    lineHeight: "1",
  },

  sm: {
    h: "24px",
    px: 3,
    py: 0,
    fontSize: "xs",
    lineHeight: "1",
  },

  md: {
    h: "28px",
    px: 3,
    py: 0,
    fontSize: "sm",
    lineHeight: "1",
  },

  section: {
    h: "28px",
    px: 3,
    py: 0,
    fontSize: "sm",
    lineHeight: "1",
  },
};

const activeUnderlineStyles: TabsTriggerStyleProps = {
  position: "relative",
  _selected: {
    _after: {
      content: '""',
      position: "absolute",
      left: 2,
      right: 2,
      bottom: "-6px",
      h: "2px",
      bg: "accent",
      rounded: "full",
    },
  },
};

export function StudySegmentedControl({
  items,
  controlVariant = "subtle",
  controlSize = "md",
  showActiveUnderline = false,
  listProps,
  triggerProps,
  ...rootProps
}: StudySegmentedControlProps) {
  return (
    <Tabs.Root {...rootProps}>
      <Tabs.List
        gap={controlVariant === "subtle" ? 1 : 0}
        w="fit-content"
        flexShrink={0}
        overflow="visible"
        {...listVariantStyles[controlVariant]}
        {...(controlVariant === "subtle" ? listSizeStyles[controlSize] : {})}
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
            _before={{
              display: "none",
              content: "none",
            }}
            _disabled={{
              opacity: 0.55,
              cursor: "not-allowed",
            }}
            {...triggerVariantStyles[controlVariant]}
            {...triggerSizeStyles[controlSize]}
            {...(showActiveUnderline ? activeUnderlineStyles : {})}
            {...triggerProps}
          >
            {item.icon}
            {item.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs.Root>
  );
}
