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

export type StudyBadgeProps = Omit<BadgeProps, "variant"> & {
  variant?: StudyBadgeVariant;
  children: ReactNode;
};

const variantStyles: Record<StudyBadgeVariant, BadgeProps> = {
  neutral: {
    bg: "gray.100",
    color: "gray.700",
  },
  info: {
    bg: "blue.100",
    color: "blue.700",
  },
  success: {
    bg: "green.100",
    color: "green.700",
  },
  warning: {
    bg: "yellow.100",
    color: "yellow.800",
  },
  danger: {
    bg: "red.100",
    color: "red.700",
  },
  role: {
    bg: "purple.100",
    color: "purple.700",
  },
  accent: {
    bg: "activeBg",
    color: "accent",
  },
};

export function StudyBadge({
  variant = "neutral",
  children,
  ...props
}: StudyBadgeProps) {
  return (
    <Badge
      rounded="full"
      px={2}
      py={0.5}
      fontSize="xs"
      fontWeight="semibold"
      textTransform="none"
      userSelect="none"
      {...variantStyles[variant]}
      {...props}
    >
      {children}
    </Badge>
  );
}