import { Heading, type HeadingProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

export type StudyHeadingVariant =
  | "page"
  | "section"
  | "card"
  | "subtle";

export type StudyHeadingSize = "sm" | "md" | "lg" | "xl";

export type StudyHeadingColor =
  | "default"
  | "muted"
  | "subtle"
  | "accent"
  | "danger"
  | "success"
  | "warning";

export type StudyHeadingProps = Omit<
  HeadingProps,
  "variant" | "size" | "color"
> & {
  variant?: StudyHeadingVariant;
  size?: StudyHeadingSize;
  colorScheme?: StudyHeadingColor;
  children: ReactNode;
};

const variantStyles: Record<StudyHeadingVariant, HeadingProps> = {
  page: {
    as: "h1",
    fontWeight: "bold",
    lineHeight: "1.15",
  },

  section: {
    as: "h2",
    fontWeight: "semibold",
    lineHeight: "1.2",
  },

  card: {
    as: "h3",
    fontWeight: "semibold",
    lineHeight: "1.3",
  },

  subtle: {
    as: "h4",
    fontWeight: "semibold",
    lineHeight: "1.3",
  },
};

const sizeStyles: Record<StudyHeadingSize, HeadingProps> = {
  sm: {
    fontSize: "sm",
  },

  md: {
    fontSize: "md",
  },

  lg: {
    fontSize: { base: "xl", md: "2xl" },
  },

  xl: {
    fontSize: { base: "2xl", md: "3xl" },
  },
};

const colorStyles: Record<StudyHeadingColor, HeadingProps> = {
  default: {
    color: "textMain",
  },

  muted: {
    color: "textMuted",
  },

  subtle: {
    color: "textSubtle",
  },

  accent: {
    color: "accent",
  },

  danger: {
    color: "dangerText",
  },

  success: {
    color: "successText",
  },

  warning: {
    color: "warningText",
  },
};

const defaultSizeByVariant: Record<StudyHeadingVariant, StudyHeadingSize> = {
  page: "xl",
  section: "lg",
  card: "md",
  subtle: "sm",
};

const defaultColorByVariant: Record<StudyHeadingVariant, StudyHeadingColor> = {
  page: "default",
  section: "default",
  card: "default",
  subtle: "muted",
};

export function StudyHeading({
  variant = "section",
  size,
  colorScheme,
  children,
  ...props
}: StudyHeadingProps) {
  const resolvedSize = size ?? defaultSizeByVariant[variant];
  const resolvedColor = colorScheme ?? defaultColorByVariant[variant];

  return (
    <Heading
      {...variantStyles[variant]}
      {...sizeStyles[resolvedSize]}
      {...colorStyles[resolvedColor]}
      {...props}
    >
      {children}
    </Heading>
  );
}