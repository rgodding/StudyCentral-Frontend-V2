import { HStack, type StackProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

import { StudyBox, StudyIconButton } from "@/components/ui";

export type StudyChipVariant =
  | "default"
  | "subtle"
  | "accent"
  | "danger"
  | "success"
  | "warning"
  | "info";

export type StudyChipSize = "sm" | "md" | "lg";

export type StudyChipAnimation =
  | "none"
  | "fadeInFast"
  | "scaleInFast";

export type StudyChipProps = Omit<
  StackProps,
  "children" | "draggable" | "size"
> & {
  children: ReactNode;
  variant?: StudyChipVariant;
  size?: StudyChipSize;
  animationVariant?: StudyChipAnimation;

  selectable?: boolean;
  draggable?: boolean;

  removable?: boolean;
  removeLabel?: string;
  onRemove?: () => void;

  addable?: boolean;
  addLabel?: string;
  onAdd?: () => void;
};

const variantStyles: Record<StudyChipVariant, StackProps> = {
  default: {
    bg: "panelBgSubtle",
    color: "textMain",
    borderColor: "borderStrong",
  },

  subtle: {
    bg: "surfaceBg",
    color: "textMuted",
    borderColor: "borderSubtle",
  },

  accent: {
    bg: "activeBg",
    color: "accent",
    borderColor: "accent",
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

const sizeStyles: Record<StudyChipSize, StackProps> = {
  sm: {
    gap: 1.5,
    px: 2,
    py: 1,
    fontSize: "xs",
  },

  md: {
    gap: 2,
    px: 3,
    py: 2,
    fontSize: "sm",
  },

  lg: {
    gap: 2.5,
    px: 3.5,
    py: 2.5,
    fontSize: "md",
  },
};

const animationStyles: Record<StudyChipAnimation, StackProps> = {
  none: {},

  fadeInFast: {
    animation: "fadeInFast",
  },

  scaleInFast: {
    animation: "scaleInFast",
    transformOrigin: "center",
  },
};

const iconButtonSizeMap: Record<StudyChipSize, "xs" | "sm"> = {
  sm: "xs",
  md: "xs",
  lg: "sm",
};

export function StudyChip({
  children,
  variant = "default",
  size = "md",
  animationVariant = "none",

  selectable = false,
  draggable = false,

  removable = false,
  removeLabel,
  onRemove,

  addable = false,
  addLabel,
  onAdd,

  ...props
}: StudyChipProps) {
  return (
    <HStack
      justify="space-between"
      minW={0}
      maxW="280px"
      rounded="button"
      borderWidth="1px"
      userSelect={selectable ? "auto" : "none"}
      draggable={draggable}
      cursor={draggable ? "draggable" : undefined}
      transitionProperty="background-color, border-color, color, box-shadow, transform"
      transitionDuration="fast"
      {...variantStyles[variant]}
      {...sizeStyles[size]}
      {...animationStyles[animationVariant]}
      {...props}
    >
      <StudyBox variant="plain" minW={0} flex="1">
        {children}
      </StudyBox>

      {addable && (
        <StudyIconButton
          aria-label={addLabel ?? "Add item"}
          variant="ghost"
          size={iconButtonSizeMap[size]}
          flexShrink={0}
          onClick={onAdd}
        >
          +
        </StudyIconButton>
      )}

      {removable && (
        <StudyIconButton
          aria-label={removeLabel ?? "Remove item"}
          variant="ghost"
          size={iconButtonSizeMap[size]}
          flexShrink={0}
          onClick={onRemove}
        >
          ×
        </StudyIconButton>
      )}
    </HStack>
  );
}