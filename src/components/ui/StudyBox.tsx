import { Box, type BoxProps } from "@chakra-ui/react";

export type StudyBoxVariant =
  | "plain"
  | "surface"
  | "panel"
  | "subtle"
  | "nav"
  | "danger"
  | "success"
  | "warning"
  | "info";

export type StudyBoxSize = "none" | "sm" | "md" | "lg";

export type StudyBoxAnimation =
  | "none"
  | "fadeInFast"
  | "fadeIn"
  | "slideDownFast"
  | "slideUpFast"
  | "slideOutToTopFast"
  | "slideInFromLeft"
  | "slideInFromRight"
  | "slideInFromTop"
  | "slideInFromBottom"
  | "scaleInFast"
  | "scaleIn";

export type StudyBoxProps = Omit<BoxProps, "size"> & {
  variant?: StudyBoxVariant;
  size?: StudyBoxSize;
  animationVariant?: StudyBoxAnimation;
};

const variantStyles: Record<StudyBoxVariant, BoxProps> = {
  plain: {},

  surface: {
    bg: "surfaceBg",
    color: "textMain",
  },

  panel: {
    bg: "panelBg",
    color: "textMain",
    borderWidth: "1px",
    borderColor: "borderStrong",
    rounded: "card",
    shadow: "card",
  },

  subtle: {
    bg: "panelBgSubtle",
    color: "textMain",
    borderWidth: "1px",
    borderColor: "borderSubtle",
    rounded: "card",
  },

  nav: {
    bg: "navBg",
    color: "textMain",
    borderColor: "borderStrong",
  },

  danger: {
    bg: "red.50",
    color: "dangerText",
    borderWidth: "1px",
    borderColor: "red.200",
    rounded: "card",
  },

  success: {
    bg: "green.50",
    color: "successText",
    borderWidth: "1px",
    borderColor: "green.200",
    rounded: "card",
  },

  warning: {
    bg: "yellow.50",
    color: "warningText",
    borderWidth: "1px",
    borderColor: "yellow.200",
    rounded: "card",
  },

  info: {
    bg: "blue.50",
    color: "blue.700",
    borderWidth: "1px",
    borderColor: "blue.200",
    rounded: "card",
  },
};

const sizeStyles: Record<StudyBoxSize, BoxProps> = {
  none: {},

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

const animationStyles: Record<StudyBoxAnimation, BoxProps> = {
  none: {},

  fadeInFast: {
    animation: "fadeInFast",
  },

  fadeIn: {
    animation: "fadeIn",
  },

  slideDownFast: {
    animation: "slideDownFast",
    transformOrigin: "top",
  },

  slideUpFast: {
    animation: "slideUpFast",
    transformOrigin: "bottom",
  },

  slideOutToTopFast: {
    animation: "slideOutToTopFast",
    transformOrigin: "top",
  },

  slideInFromLeft: {
    animation: "slideInFromLeft",
  },

  slideInFromRight: {
    animation: "slideInFromRight",
  },

  slideInFromTop: {
    animation: "slideInFromTop",
    transformOrigin: "top",
  },

  slideInFromBottom: {
    animation: "slideInFromBottom",
    transformOrigin: "bottom",
  },

  scaleInFast: {
    animation: "scaleInFast",
    transformOrigin: "center",
  },

  scaleIn: {
    animation: "scaleIn",
    transformOrigin: "center",
  },
};

export function StudyBox({
  variant = "plain",
  size = "none",
  animationVariant = "none",
  children,
  ...props
}: StudyBoxProps) {
  return (
    <Box
      {...variantStyles[variant]}
      {...sizeStyles[size]}
      {...animationStyles[animationVariant]}
      {...props}
    >
      {children}
    </Box>
  );
}