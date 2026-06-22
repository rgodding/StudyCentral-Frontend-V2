import { Text, type TextProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

export type StudyTextVariant =
  | "body"
  | "muted"
  | "subtle"
  | "smallSubtle"
  | "label"
  | "error"
  | "success"
  | "warning"
  | "info"
  | "accent";

export type StudyTextSize = "xs" | "sm" | "md" | "lg";

export type StudyTextWeight = "normal" | "medium" | "semibold" | "bold";

export type StudyTextProps = Omit<TextProps, "variant" | "size"> & {
  variant?: StudyTextVariant;
  size?: StudyTextSize;
  weight?: StudyTextWeight;
  children: ReactNode;
};

const variantStyles: Record<StudyTextVariant, TextProps> = {
  body: {
    color: "textMain",
    lineHeight: "1.6",
  },

  muted: {
    color: "textMuted",
    lineHeight: "1.6",
  },

  subtle: {
    color: "textSubtle",
    lineHeight: "1.5",
  },

  smallSubtle: {
    color: "textSubtle",
    lineHeight: "1",
  },

  label: {
    color: "textMain",
    lineHeight: "1.4",
  },

  error: {
    color: "dangerText",
    lineHeight: "1.5",
  },

  success: {
    color: "successText",
    lineHeight: "1.5",
  },

  warning: {
    color: "warningText",
    lineHeight: "1.5",
  },

  info: {
    color: "blue.700",
    lineHeight: "1.5",
  },

  accent: {
    color: "accent",
    lineHeight: "1.5",
  },
};

const sizeStyles: Record<StudyTextSize, TextProps> = {
  xs: {
    fontSize: "xs",
  },

  sm: {
    fontSize: "sm",
  },

  md: {
    fontSize: "md",
  },

  lg: {
    fontSize: "lg",
  },
};

const weightStyles: Record<StudyTextWeight, TextProps> = {
  normal: {
    fontWeight: "normal",
  },

  medium: {
    fontWeight: "medium",
  },

  semibold: {
    fontWeight: "semibold",
  },

  bold: {
    fontWeight: "bold",
  },
};

const defaultSizeByVariant: Record<StudyTextVariant, StudyTextSize> = {
  body: "sm",
  muted: "sm",
  subtle: "xs",
  smallSubtle: "xs",
  label: "sm",
  error: "sm",
  success: "sm",
  warning: "sm",
  info: "sm",
  accent: "sm",
};

const defaultWeightByVariant: Record<StudyTextVariant, StudyTextWeight> = {
  body: "normal",
  muted: "normal",
  subtle: "normal",
  smallSubtle: "normal",
  label: "semibold",
  error: "normal",
  success: "normal",
  warning: "normal",
  info: "normal",
  accent: "semibold",
};

export function StudyText({
  variant = "body",
  size,
  weight,
  children,
  ...props
}: StudyTextProps) {
  const resolvedSize = size ?? defaultSizeByVariant[variant];
  const resolvedWeight = weight ?? defaultWeightByVariant[variant];

  return (
    <Text
      {...variantStyles[variant]}
      {...sizeStyles[resolvedSize]}
      {...weightStyles[resolvedWeight]}
      {...props}
    >
      {children}
    </Text>
  );
}