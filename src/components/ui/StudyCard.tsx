import { Box, type BoxProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

type StudyCardVariant = "default" | "subtle" | "interactive" | "danger";

type StudyCardProps = Omit<BoxProps, "variant"> & {
  variant?: StudyCardVariant;
  children: ReactNode;
};

const variantStyles: Record<StudyCardVariant, BoxProps> = {
  default: {
    bg: "surfaceBg",
    borderWidth: "1px",
    borderColor: "borderSubtle",
    shadow: "card",
  },
  subtle: {
    bg: "panelBgSubtle",
    borderWidth: "1px",
    borderColor: "borderSubtle",
    shadow: "none",
  },
  interactive: {
    bg: "surfaceBg",
    borderWidth: "1px",
    borderColor: "borderSubtle",
    shadow: "card",
    cursor: "button",
    _hover: {
      borderColor: "borderStrong",
      shadow: "panel",
      transform: "translateY(-1px)",
    },
  },
  danger: {
    bg: "surfaceBg",
    borderWidth: "1px",
    borderColor: "red.200",
    shadow: "card",
  },
};

export function StudyCard({
  variant = "default",
  children,
  ...props
}: StudyCardProps) {
  return (
    <Box
      rounded="card"
      p={5}
      transitionProperty="border-color, box-shadow, transform"
      transitionDuration="fast"
      {...variantStyles[variant]}
      {...props}
    >
      {children}
    </Box>
  );
}
