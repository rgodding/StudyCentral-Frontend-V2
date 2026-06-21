import { Text, type TextProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

type StudyTextVariant =
  | "body"
  | "muted"
  | "subtle"
  | "smallSubtle"
  | "label"
  | "error"
  | "success"
  | "warning";

export type StudyTextProps = Omit<TextProps, "variant"> & {
  variant?: StudyTextVariant;
  children: ReactNode;
};

const variantStyles: Record<StudyTextVariant, TextProps> = {
  body: {
    color: "textMain",
    fontSize: "sm",
    lineHeight: "1.6",
  },
  muted: {
    color: "textMuted",
    fontSize: "sm",
    lineHeight: "1.6",
  },
  subtle: {
    color: "textSubtle",
    fontSize: "xs",
    lineHeight: "1.5",
  },
  smallSubtle: {
    color: "textSubtle",
    fontSize: "xx-small",
    lineHeight: "1",
  },
  label: {
    color: "textMain",
    fontSize: "sm",
    fontWeight: "semibold",
    lineHeight: "1.4",
  },
  error: {
    color: "dangerText",
    fontSize: "sm",
    lineHeight: "1.5",
  },
  success: {
    color: "successText",
    fontSize: "sm",
    lineHeight: "1.5",
  },
  warning: {
    color: "warningText",
    fontSize: "sm",
    lineHeight: "1.5",
  },
};

export function StudyText({
  variant = "body",
  children,
  ...props
}: StudyTextProps) {
  return (
    <Text {...variantStyles[variant]} {...props}>
      {children}
    </Text>
  );
}
