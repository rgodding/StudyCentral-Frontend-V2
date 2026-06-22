import { Portal, Tooltip } from "@chakra-ui/react";
import type { ComponentProps, ReactNode } from "react";

export type StudyTooltipVariant = "default" | "muted" | "danger" | "success";
export type StudyTooltipSize = "sm" | "md";

type TooltipRootProps = ComponentProps<typeof Tooltip.Root>;
type TooltipContentProps = ComponentProps<typeof Tooltip.Content>;

export type StudyTooltipProps = Omit<TooltipRootProps, "children"> & {
  children: ReactNode;
  content: ReactNode;
  variant?: StudyTooltipVariant;
  size?: StudyTooltipSize;
  contentProps?: TooltipContentProps;
};

const variantStyles: Record<StudyTooltipVariant, TooltipContentProps> = {
  default: {
    bg: "textMain",
    color: "surfaceBg",
  },

  muted: {
    bg: "panelBgSubtle",
    color: "textMain",
    borderWidth: "1px",
    borderColor: "borderStrong",
  },

  danger: {
    bg: "red.600",
    color: "white",
  },

  success: {
    bg: "green.600",
    color: "white",
  },
};

const sizeStyles: Record<StudyTooltipSize, TooltipContentProps> = {
  sm: {
    px: 2,
    py: 1,
    fontSize: "xs",
  },

  md: {
    px: 2.5,
    py: 1.5,
    fontSize: "sm",
  },
};

export function StudyTooltip({
  children,
  content,
  variant = "default",
  size = "sm",
  contentProps,
  openDelay = 250,
  closeDelay = 100,
  ...rootProps
}: StudyTooltipProps) {
  return (
    <Tooltip.Root openDelay={openDelay} closeDelay={closeDelay} {...rootProps}>
      <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>

      <Portal>
        <Tooltip.Positioner>
          <Tooltip.Content
            rounded="button"
            shadow="panel"
            maxW="280px"
            lineHeight="1.4"
            fontWeight="medium"
            animation="fadeInFast"
            {...variantStyles[variant]}
            {...sizeStyles[size]}
            {...contentProps}
          >
            {content}
          </Tooltip.Content>
        </Tooltip.Positioner>
      </Portal>
    </Tooltip.Root>
  );
}