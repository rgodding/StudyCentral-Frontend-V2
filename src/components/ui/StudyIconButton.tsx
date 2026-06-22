import { IconButton, type IconButtonProps } from "@chakra-ui/react";

export type StudyIconButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "danger";

export type StudyIconButtonSize = "xs" | "sm" | "md" | "lg";

export type StudyIconButtonAnimation =
  | "none"
  | "fadeInFast"
  | "scaleInFast";

export type StudyIconButtonProps = Omit<
  IconButtonProps,
  "variant" | "size"
> & {
  variant?: StudyIconButtonVariant;
  size?: StudyIconButtonSize;
  animationVariant?: StudyIconButtonAnimation;
};

const variantStyles: Record<StudyIconButtonVariant, IconButtonProps> = {
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
    bg: "transparent",
    color: "dangerText",
    borderWidth: "1px",
    borderColor: "transparent",
    _hover: {
      bg: "red.50",
      borderColor: "red.200",
    },
    _active: {
      bg: "red.100",
      borderColor: "red.300",
    },
  },
};

const sizeStyles: Record<StudyIconButtonSize, IconButtonProps> = {
  xs: {
    minW: "28px",
    h: "28px",
    fontSize: "xs",
  },

  sm: {
    minW: "32px",
    h: "32px",
    fontSize: "sm",
  },

  md: {
    minW: "40px",
    h: "40px",
    fontSize: "md",
  },

  lg: {
    minW: "48px",
    h: "48px",
    fontSize: "lg",
  },
};

const animationStyles: Record<StudyIconButtonAnimation, IconButtonProps> = {
  none: {},

  fadeInFast: {
    animation: "fadeInFast",
  },

  scaleInFast: {
    animation: "scaleInFast",
    transformOrigin: "center",
  },
};

export function StudyIconButton({
  variant = "ghost",
  size = "md",
  animationVariant = "none",
  ...props
}: StudyIconButtonProps) {
  return (
    <IconButton
      rounded="button"
      cursor="pointer"
      transitionProperty="background-color, border-color, color, box-shadow, transform"
      transitionDuration="fast"
      _focus={{
        outline: "none",
        boxShadow: "none",
      }}
      _focusVisible={{
        outline: "2px solid",
        outlineColor: "accent",
        outlineOffset: "2px",
      }}
      _disabled={{
        cursor: "not-allowed",
        opacity: 0.6,
        transform: "none",
      }}
      {...variantStyles[variant]}
      {...sizeStyles[size]}
      {...animationStyles[animationVariant]}
      {...props}
    />
  );
}