import { Popover, Portal } from "@chakra-ui/react";
import type { ComponentProps, ReactNode } from "react";
import { LuX } from "react-icons/lu";

import { StudyIconButton } from "./StudyIconButton";
import { StudyText } from "./StudyText";

export type StudyPopoverVariant = "default" | "subtle" | "danger";
export type StudyPopoverSize = "sm" | "md" | "lg";
export type StudyPopoverAnimation = "none" | "fadeInFast" | "scaleInFast";

type PopoverRootProps = ComponentProps<typeof Popover.Root>;
type PopoverContentProps = ComponentProps<typeof Popover.Content>;

export type StudyPopoverProps = Omit<PopoverRootProps, "children" | "size"> & {
  trigger: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  variant?: StudyPopoverVariant;
  size?: StudyPopoverSize;
  animationVariant?: StudyPopoverAnimation;
  showCloseButton?: boolean;
  closeLabel?: string;
  contentProps?: PopoverContentProps;
};

const variantStyles: Record<StudyPopoverVariant, PopoverContentProps> = {
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

  danger: {
    bg: "red.50",
    color: "dangerText",
    borderColor: "red.200",
  },
};

const sizeStyles: Record<StudyPopoverSize, PopoverContentProps> = {
  sm: {
    w: "260px",
  },

  md: {
    w: "340px",
  },

  lg: {
    w: "440px",
  },
};

const animationStyles: Record<StudyPopoverAnimation, PopoverContentProps> = {
  none: {},

  fadeInFast: {
    animation: "fadeInFast",
  },

  scaleInFast: {
    animation: "scaleInFast",
    transformOrigin: "center",
  },
};

export function StudyPopover({
  trigger,
  title,
  description,
  children,
  footer,
  variant = "default",
  size = "md",
  animationVariant = "scaleInFast",
  showCloseButton = false,
  closeLabel = "Close popover",
  contentProps,
  ...rootProps
}: StudyPopoverProps) {
  const hasHeader = title || description || showCloseButton;

  return (
    <Popover.Root {...rootProps}>
      <Popover.Trigger asChild>{trigger}</Popover.Trigger>

      <Portal>
        <Popover.Positioner>
          <Popover.Content
            rounded="card"
            borderWidth="1px"
            shadow="panel"
            overflow="hidden"
            {...variantStyles[variant]}
            {...sizeStyles[size]}
            {...animationStyles[animationVariant]}
            {...contentProps}
          >
            {hasHeader && (
              <Popover.Header
                display="flex"
                alignItems="start"
                justifyContent="space-between"
                gap={3}
                px={4}
                py={3}
                borderBottomWidth="1px"
                borderColor="borderSubtle"
              >
                <div>
                  {title && (
                    <Popover.Title fontWeight="semibold" lineHeight="1.3">
                      {title}
                    </Popover.Title>
                  )}

                  {description && (
                    <Popover.Description asChild>
                      <StudyText variant="muted" size="sm" mt={1}>
                        {description}
                      </StudyText>
                    </Popover.Description>
                  )}
                </div>

                {showCloseButton && (
                  <Popover.CloseTrigger asChild>
                    <StudyIconButton
                      aria-label={closeLabel}
                      variant="ghost"
                      size="xs"
                      flexShrink={0}
                    >
                      <LuX />
                    </StudyIconButton>
                  </Popover.CloseTrigger>
                )}
              </Popover.Header>
            )}

            <Popover.Body px={4} py={4}>
              {children}
            </Popover.Body>

            {footer && (
              <Popover.Footer
                px={4}
                py={3}
                borderTopWidth="1px"
                borderColor="borderSubtle"
              >
                {footer}
              </Popover.Footer>
            )}
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
}