import { Box, type BoxProps } from "@chakra-ui/react";

type StudyBoxVariant =
  | "plain"
  | "surface"
  | "panel"
  | "subtle"
  | "nav"
  | "danger"
  | "success"
  | "warning"
  | "info";

type StudyBoxAnimation =
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

type StudyBoxProps = BoxProps & {
  variant?: StudyBoxVariant;
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
    borderColor: "borderSubtle",
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
    borderColor: "borderSubtle",
  },

  danger: {
    bg: "red.50",
    color: "dangerText",
    borderWidth: "1px",
    borderColor: "red.100",
    rounded: "card",
  },

  success: {
    bg: "green.50",
    color: "successText",
    borderWidth: "1px",
    borderColor: "green.100",
    rounded: "card",
  },

  warning: {
    bg: "yellow.50",
    color: "warningText",
    borderWidth: "1px",
    borderColor: "yellow.100",
    rounded: "card",
  },

  info: {
    bg: "blue.50",
    color: "blue.700",
    borderWidth: "1px",
    borderColor: "blue.100",
    rounded: "card",
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
  slideOutToTopFast: {
    animation: "slideOutToTopFast",
    transformOrigin: "top",
  },
};

export function StudyBox({
  variant = "plain",
  animationVariant = "none",
  children,
  ...props
}: StudyBoxProps) {
  return (
    <Box
      {...variantStyles[variant]}
      {...animationStyles[animationVariant]}
      {...props}
    >
      {children}
    </Box>
  );
}
