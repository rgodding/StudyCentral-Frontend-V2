import { Button, type ButtonProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

export type StudyButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "danger"
  | "link";

export type StudyButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export type StudyButtonAnimation =
  | "none"
  | "fadeInFast"
  | "scaleInFast";

export type StudyButtonProps = Omit<ButtonProps, "variant" | "size"> & {
  variant?: StudyButtonVariant;
  size?: StudyButtonSize;
  animationVariant?: StudyButtonAnimation;
  children: ReactNode;
};

const variantStyles: Record<StudyButtonVariant, ButtonProps> = {
  primary: {
    bg: "accent",
    color: "white",
    borderWidth: "1px",
    borderColor: "accent",
    _hover: {
      bg: "brand.700",
      borderColor: "brand.700",
    },
    _active: {
      bg: "brand.800",
      borderColor: "brand.800",
    },
  },

  secondary: {
    bg: "surfaceBg",
    color: "textMain",
    borderWidth: "1px",
    borderColor: "borderStrong",
    _hover: {
      bg: "panelBgSubtle",
      borderColor: "accent",
    },
    _active: {
      bg: "activeBg",
      borderColor: "accent",
    },
  },

  ghost: {
    bg: "transparent",
    color: "textMain",
    borderWidth: "1px",
    borderColor: "transparent",
    _hover: {
      bg: "activeBg",
      borderColor: "borderSubtle",
    },
    _active: {
      bg: "accentMuted",
      borderColor: "accent",
    },
  },

  danger: {
    bg: "red.600",
    color: "white",
    borderWidth: "1px",
    borderColor: "red.600",
    _hover: {
      bg: "red.700",
      borderColor: "red.700",
    },
    _active: {
      bg: "red.800",
      borderColor: "red.800",
    },
  },

  link: {
    bg: "transparent",
    color: "accent",
    h: "auto",
    minW: "auto",
    px: 0,
    borderWidth: "0",
    _hover: {
      textDecoration: "underline",
      textUnderlineOffset: "3px",
    },
    _active: {
      color: "brand.700",
    },
  },
};

const sizeStyles: Record<StudyButtonSize, ButtonProps> = {
  xs: {
    h: "24px",
    px: 2,
    fontSize: "xs",
  },

  sm: {
    h: "32px",
    px: 3,
    fontSize: "sm",
  },

  md: {
    h: "40px",
    px: 4,
    fontSize: "sm",
  },

  lg: {
    h: "48px",
    px: 5,
    fontSize: "md",
  },
  xl: {
    h: "56px",
    px: 6,
    fontSize: "md",
  },
};

const animationStyles: Record<StudyButtonAnimation, ButtonProps> = {
  none: {},

  fadeInFast: {
    animation: "fadeInFast",
  },

  scaleInFast: {
    animation: "scaleInFast",
    transformOrigin: "center",
  },
};

export function StudyButton({
  variant = "primary",
  size = "md",
  animationVariant = "none",
  children,
  ...props
}: StudyButtonProps) {
  return (
    <Button
      rounded="button"
      fontWeight="semibold"
      cursor="pointer"
      transitionProperty="background-color, border-color, color, box-shadow, transform"
      transitionDuration="fast"
      _disabled={{
        cursor: "not-allowed",
        opacity: 0.6,
        transform: "none",
      }}
      {...variantStyles[variant]}
      {...sizeStyles[size]}
      {...animationStyles[animationVariant]}
      {...props}
    >
      {children}
    </Button>
  );
}