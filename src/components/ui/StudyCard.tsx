import { Box, type BoxProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

export type StudyCardVariant =
  | "default"
  | "subtle"
  | "interactive"
  | "danger"
  | "success"
  | "warning"
  | "info";

export type StudyCardSize = "sm" | "md" | "lg";

export type StudyCardShadow = "none" | "sm" | "md" | "lg";

export type StudyCardAnimation =
  | "none"
  | "fadeInFast"
  | "fadeIn"
  | "scaleInFast"
  | "slideInFromBottom";

export type StudyCardProps = Omit<BoxProps, "variant" | "size"> & {
  variant?: StudyCardVariant;
  size?: StudyCardSize;
  shadowSize?: StudyCardShadow;
  animationVariant?: StudyCardAnimation;
  children: ReactNode;
};

const variantStyles: Record<StudyCardVariant, BoxProps> = {
  default: {
    bg: "surfaceBg",
    borderWidth: "1px",
    borderColor: "borderStrong",
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
    borderColor: "borderStrong",
    shadow: "card",
    cursor: "button",
    _hover: {
      borderColor: "accent",
      shadow: "panel",
      transform: "translateY(-1px)",
    },
    _active: {
      transform: "translateY(0)",
      shadow: "card",
    },
  },

  danger: {
    bg: "red.50",
    color: "dangerText",
    borderWidth: "1px",
    borderColor: "red.200",
    shadow: "card",
  },

  success: {
    bg: "green.50",
    color: "successText",
    borderWidth: "1px",
    borderColor: "green.200",
    shadow: "card",
  },

  warning: {
    bg: "yellow.50",
    color: "warningText",
    borderWidth: "1px",
    borderColor: "yellow.200",
    shadow: "card",
  },

  info: {
    bg: "blue.50",
    color: "blue.700",
    borderWidth: "1px",
    borderColor: "blue.200",
    shadow: "card",
  },
};

const shadowStyles: Record<StudyCardShadow, BoxProps> = {
  none: {
    shadow: "none",
  },

  sm: {
    shadow: "card",
  },

  md: {
    shadow: "panel",
  },

  lg: {
    shadow: "modal",
  },
};

const sizeStyles: Record<StudyCardSize, BoxProps> = {
  sm: {
    p: 3,
  },

  md: {
    p: { base: 4, md: 5 },
  },

  lg: {
    p: { base: 5, md: 6 },
  },
};

const animationStyles: Record<StudyCardAnimation, BoxProps> = {
  none: {},

  fadeInFast: {
    animation: "fadeInFast",
  },

  fadeIn: {
    animation: "fadeIn",
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

export function StudyCard({
  variant = "default",
  size = "md",
  shadowSize = "sm",
  animationVariant = "none",
  children,
  ...props
}: StudyCardProps) {
  return (
    <Box
      rounded="card"
      transitionProperty="background-color, border-color, box-shadow, transform"
      transitionDuration="fast"
      {...variantStyles[variant]}
      {...sizeStyles[size]}
      {...(shadowSize ? shadowStyles[shadowSize] : {})}
      {...animationStyles[animationVariant]}
      {...props}
    >
      {children}
    </Box>
  );
}
