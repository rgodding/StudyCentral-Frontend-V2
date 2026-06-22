import { Badge, type BadgeProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

export type StudyBadgeVariant =
  | "neutral"
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "role"
  | "accent";

export type StudyBadgeSize = "sm" | "md" | "lg";

export type StudyBadgeProps = Omit<BadgeProps, "variant" | "size"> & {
  variant?: StudyBadgeVariant;
  size?: StudyBadgeSize;
  children: ReactNode;
};

const variantStyles: Record<StudyBadgeVariant, BadgeProps> = {
  neutral: {
    bg: "panelBgSubtle",
    color: "textMuted",
    borderColor: "borderSubtle",
  },

  info: {
    bg: "blue.100",
    color: "blue.700",
    borderColor: "blue.200",
  },

  success: {
    bg: "green.100",
    color: "successText",
    borderColor: "green.200",
  },

  warning: {
    bg: "yellow.100",
    color: "warningText",
    borderColor: "yellow.200",
  },

  danger: {
    bg: "red.100",
    color: "dangerText",
    borderColor: "red.200",
  },

  role: {
    bg: "purple.100",
    color: "purple.700",
    borderColor: "purple.200",
  },

  accent: {
    bg: "activeBg",
    color: "accent",
    borderColor: "accent",
  },
};

const sizeStyles: Record<StudyBadgeSize, BadgeProps> = {
  sm: {
    px: 1.5,
    py: 0,
    fontSize: "2xs",
  },

  md: {
    px: 2,
    py: 0.5,
    fontSize: "xs",
  },

  lg: {
    px: 2.5,
    py: 1,
    fontSize: "sm",
  },
};

export function StudyBadge({
  variant = "neutral",
  size = "md",
  children,
  ...props
}: StudyBadgeProps) {
  return (
    <Badge
      rounded="full"
      borderWidth="1px"
      fontWeight="semibold"
      textTransform="none"
      userSelect="none"
      lineHeight="1"
      {...variantStyles[variant]}
      {...sizeStyles[size]}
      {...props}
    >
      {children}
    </Badge>
  );
}