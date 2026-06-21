import { IconButton, type IconButtonProps } from "@chakra-ui/react";

type StudyIconButtonVariant = "primary" | "secondary" | "ghost" | "danger";

type StudyIconButtonProps = Omit<IconButtonProps, "variant"> & {
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
    },
  },
  danger: {
    bg: "transparent",
    color: "dangerText",
    _hover: {
      bg: "red.50",
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
      transitionDuration="fast"
      _disabled={{
        cursor: "not-allowed",
        opacity: 0.6,
      }}
      {...variantStyles[variant]}
      {...props}
    />
  );
}