import { Menu, Portal } from "@chakra-ui/react";
import { Fragment, type ComponentProps, type ReactNode } from "react";

export type StudyMenuVariant = "default" | "subtle";
export type StudyMenuSize = "sm" | "md";
export type StudyMenuAnimation = "none" | "fadeInFast" | "scaleInFast";

type MenuRootProps = ComponentProps<typeof Menu.Root>;
type MenuContentProps = ComponentProps<typeof Menu.Content>;
type MenuItemProps = ComponentProps<typeof Menu.Item>;
type MenuItemStyleProps = Omit<
  MenuItemProps,
  "value" | "disabled" | "onClick" | "children"
>;

export type StudyMenuItem = {
  value: string;
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  danger?: boolean;
  separatorBefore?: boolean;
  onSelect?: () => void;
};

export type StudyMenuProps = Omit<
  MenuRootProps,
  "children" | "variant" | "size"
> & {
  trigger: ReactNode;
  items: StudyMenuItem[];
  header?: ReactNode;
  menuVariant?: StudyMenuVariant;
  menuSize?: StudyMenuSize;
  animationVariant?: StudyMenuAnimation;
  contentProps?: MenuContentProps;
};

const variantStyles: Record<StudyMenuVariant, MenuContentProps> = {
  default: {
    bg: "surfaceBg",
    color: "textMain",
    borderColor: "borderStrong",
  },

  subtle: {
    bg: "panelBgSubtle",
    color: "textMain",
    borderColor: "borderSubtle",
  },
};

const sizeStyles: Record<StudyMenuSize, MenuContentProps> = {
  sm: {
    minW: "180px",
    p: 1,
  },

  md: {
    minW: "220px",
    p: 1.5,
  },
};

const itemSizeStyles: Record<StudyMenuSize, MenuItemStyleProps> = {
  sm: {
    px: 2,
    py: 1.5,
    fontSize: "sm",
  },

  md: {
    px: 2.5,
    py: 2,
    fontSize: "sm",
  },
};

const animationStyles: Record<StudyMenuAnimation, MenuContentProps> = {
  none: {},

  fadeInFast: {
    animation: "fadeInFast",
  },

  scaleInFast: {
    animation: "scaleInFast",
    transformOrigin: "top right",
  },
};

export function StudyMenu({
  trigger,
  items,
  header,
  menuVariant = "default",
  menuSize = "md",
  animationVariant = "scaleInFast",
  contentProps,
  ...rootProps
}: StudyMenuProps) {
  return (
    <Menu.Root {...rootProps}>
      <Menu.Trigger asChild>{trigger}</Menu.Trigger>

      <Portal>
        <Menu.Positioner>
          <Menu.Content
            rounded="card"
            borderWidth="1px"
            shadow="panel"
            overflow="hidden"
            {...variantStyles[menuVariant]}
            {...sizeStyles[menuSize]}
            {...animationStyles[animationVariant]}
            {...contentProps}
          >
            {header && (
              <>
                {header}
                <Menu.Separator borderColor="borderSubtle" />
              </>
            )}
            {items.map((item) => (
              <Fragment key={item.value}>
                {item.separatorBefore && (
                  <Menu.Separator borderColor="borderSubtle" />
                )}

                <Menu.Item
                  value={item.value}
                  disabled={item.disabled}
                  rounded="button"
                  cursor={item.disabled ? "not-allowed" : "pointer"}
                  color={item.danger ? "dangerText" : "textMain"}
                  transitionProperty="background-color, color"
                  transitionDuration="fast"
                  _hover={{
                    bg: item.danger ? "red.50" : "activeBg",
                  }}
                  _highlighted={{
                    bg: item.danger ? "red.50" : "activeBg",
                  }}
                  _disabled={{
                    opacity: 0.55,
                    cursor: "not-allowed",
                  }}
                  onClick={item.onSelect}
                  {...itemSizeStyles[menuSize]}
                >
                  {item.icon}
                  {item.label}
                </Menu.Item>
              </Fragment>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
