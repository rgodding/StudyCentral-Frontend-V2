import { IconButton, type IconButtonProps } from "@chakra-ui/react";

export type StudyIconButtonVariant = "primary" | "secondary" | "ghost" | "danger";

export type StudyIconButtonProps = Omit<IconButtonProps, "variant"> & {
  variant?: StudyIconButtonVariant;
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
  },
  secondary: {
    bg: "surfaceBg",
    color: "textMain",
    borderWidth: "1px",
    borderColor: "borderSubtle",
    _hover: {
      bg: "panelBgSubtle",
      borderColor: "borderStrong",
    },
  },
  ghost: {
    bg: "transparent",
    color: "textMain",
    _hover: {
      bg: "activeBg",
      opacity: 0.75,
    },
    _active: {
      bg: "activeBg",
      opacity: 0.65,
    },
  },
  danger: {
    bg: "transparent",
    color: "dangerText",
    _hover: {
      bg: "red.50",
      opacity: 0.75,
    },
    _active: {
      bg: "red.50",
      opacity: 0.65,
    },
  },
};

export function StudyIconButton({
  variant = "ghost",
  ...props
}: StudyIconButtonProps) {
  return (
    <IconButton
      rounded="button"
      cursor="pointer"
      transitionProperty="background-color, border-color, color, opacity"
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
      }}
      {...variantStyles[variant]}
      {...props}
    />
  );
}