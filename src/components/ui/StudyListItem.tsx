import { HStack, Stack, type StackProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

import { StudyBox } from "./StudyBox";
import { StudyText } from "./StudyText";

export type StudyListItemVariant =
  | "default"
  | "subtle"
  | "interactive"
  | "danger"
  | "success"
  | "warning"
  | "info";

export type StudyListItemSize = "sm" | "md" | "lg";

export type StudyListItemAnimation =
  | "none"
  | "fadeInFast"
  | "scaleInFast"
  | "slideInFromBottom";

export type StudyListItemProps = Omit<
  StackProps,
  "children" | "size" | "title"
> & {
  title: ReactNode;
  description?: ReactNode;
  meta?: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
  children?: ReactNode;
  variant?: StudyListItemVariant;
  size?: StudyListItemSize;
  animationVariant?: StudyListItemAnimation;
};

const variantStyles: Record<StudyListItemVariant, StackProps> = {
  default: {
    bg: "surfaceBg",
    color: "textMain",
    borderColor: "borderSubtle",
  },

  subtle: {
    bg: "panelBgSubtle",
    color: "textMain",
    borderColor: "borderSubtle",
  },

  interactive: {
    bg: "surfaceBg",
    color: "textMain",
    borderColor: "borderSubtle",
    cursor: "pointer",
    _hover: {
      bg: "panelBgSubtle",
      borderColor: "borderStrong",
      transform: "translateY(-1px)",
    },
    _active: {
      bg: "activeBg",
      transform: "translateY(0)",
    },
  },

  danger: {
    bg: "red.50",
    color: "dangerText",
    borderColor: "red.200",
  },

  success: {
    bg: "green.50",
    color: "successText",
    borderColor: "green.200",
  },

  warning: {
    bg: "yellow.50",
    color: "warningText",
    borderColor: "yellow.200",
  },

  info: {
    bg: "blue.50",
    color: "blue.700",
    borderColor: "blue.200",
  },
};

const sizeStyles: Record<StudyListItemSize, StackProps> = {
  sm: {
    gap: 2,
    px: 3,
    py: 2.5,
  },

  md: {
    gap: 3,
    px: 4,
    py: 3,
  },

  lg: {
    gap: 4,
    px: 5,
    py: 4,
  },
};

const animationStyles: Record<StudyListItemAnimation, StackProps> = {
  none: {},

  fadeInFast: {
    animation: "fadeInFast",
  },

  scaleInFast: {
    animation: "scaleInFast",
    transformOrigin: "center",
  },

  slideInFromBottom: {
    animation: "slideInFromBottom",
    transformOrigin: "bottom",
  },
};

const titleSizeMap: Record<StudyListItemSize, "sm" | "md" | "lg"> = {
  sm: "sm",
  md: "md",
  lg: "lg",
};

const textSizeMap: Record<StudyListItemSize, "xs" | "sm" | "md"> = {
  sm: "xs",
  md: "sm",
  lg: "md",
};

export function StudyListItem({
  title,
  description,
  meta,
  leading,
  trailing,
  children,
  variant = "default",
  size = "md",
  animationVariant = "none",
  ...props
}: StudyListItemProps) {
  return (
    <HStack
      align="start"
      justify="space-between"
      minW={0}
      w="full"
      rounded="card"
      borderWidth="1px"
      transitionProperty="background-color, border-color, box-shadow, transform"
      transitionDuration="fast"
      {...variantStyles[variant]}
      {...sizeStyles[size]}
      {...animationStyles[animationVariant]}
      {...props}
    >
      {leading && (
        <StudyBox variant="plain" flexShrink={0}>
          {leading}
        </StudyBox>
      )}

      <Stack gap={1} minW={0} flex="1">
        <HStack justify="space-between" align="start" gap={3} minW={0}>
          <StudyText
            variant="label"
            size={titleSizeMap[size]}
            truncate
            minW={0}
          >
            {title}
          </StudyText>

          {meta && (
            <StudyText
              variant="subtle"
              size="xs"
              whiteSpace="nowrap"
              flexShrink={0}
            >
              {meta}
            </StudyText>
          )}
        </HStack>

        {description && (
          <StudyText variant="muted" size={textSizeMap[size]} lineClamp={2}>
            {description}
          </StudyText>
        )}

        {children}
      </Stack>

      {trailing && (
        <StudyBox variant="plain" flexShrink={0}>
          {trailing}
        </StudyBox>
      )}
    </HStack>
  );
}
