import { Box, HStack, type StackProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

import { StudyIconButton } from "@/components/ui/StudyIconButton";

type StudyChipVariant = "default" | "subtle" | "accent" | "danger";

type StudyChipProps = Omit<StackProps, "children" | "draggable"> & {
  children: ReactNode;
  variant?: StudyChipVariant;

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
    borderColor: "borderSubtle",
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
};

export function StudyChip({
  children,
  variant = "default",

  selectable = false,
  draggable = false,

  removable = false,
  removeLabel = "Remove item",
  onRemove,

  addable = false,
  addLabel = "Add item",
  onAdd,

  ...props
}: StudyChipProps) {
  return (
    <HStack
      justify="space-between"
      gap={2}
      minW={0}
      maxW="280px"
      rounded="button"
      borderWidth="1px"
      px={3}
      py={2}
      userSelect={selectable ? "auto" : "none"}
      draggable={draggable}
      transitionDuration="fast"
      {...variantStyles[variant]}
      {...props}
    >
      <Box minW={0} flex="1">
        {children}
      </Box>

      {addable && (
        <StudyIconButton
          aria-label={addLabel}
          variant="ghost"
          size="xs"
          flexShrink={0}
          onClick={onAdd}
        >
          +
        </StudyIconButton>
      )}

      {removable && (
        <StudyIconButton
          aria-label={removeLabel}
          variant="ghost"
          size="xs"
          flexShrink={0}
          onClick={onRemove}
        >
          ×
        </StudyIconButton>
      )}
    </HStack>
  );
}
