import { Button, type ButtonProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

type StudyButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "link";

type StudyButtonProps = Omit<ButtonProps, "variant"> & {
  variant?: StudyButtonVariant;
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
    bg: "red.600",
    color: "white",
    borderWidth: "1px",
    borderColor: "red.600",
    _hover: {
      bg: "red.700",
      borderColor: "red.700",
    },
  },
  link: {
    bg: "transparent",
    color: "accent",
    h: "auto",
    minW: "auto",
    px: 0,
    _hover: {
      textDecoration: "underline",
    },
  },
};

export function StudyButton({
  variant = "primary",
  children,
  ...props
}: StudyButtonProps) {
  return (
    <Button
      rounded="button"
      fontWeight="semibold"
      cursor="pointer"
      transitionDuration="fast"
      _disabled={{
        cursor: "not-allowed",
        opacity: 0.6,
      }}
      {...variantStyles[variant]}
      {...props}
    >
      {children}
    </Button>
  );
}