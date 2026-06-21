import { Heading, type HeadingProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

type StudyHeadingVariant = "page" | "section" | "card" | "subtle";

type StudyHeadingProps = Omit<HeadingProps, "variant"> & {
  variant?: StudyHeadingVariant;
  children: ReactNode;
};

const variantStyles: Record<StudyHeadingVariant, HeadingProps> = {
  page: {
    as: "h1",
    color: "textMain",
    fontSize: { base: "2xl", md: "3xl" },
    fontWeight: "bold",
    lineHeight: "1.15",
  },
  section: {
    as: "h2",
    color: "textMain",
    fontSize: { base: "xl", md: "2xl" },
    fontWeight: "semibold",
    lineHeight: "1.2",
  },
  card: {
    as: "h3",
    color: "textMain",
    fontSize: "md",
    fontWeight: "semibold",
    lineHeight: "1.3",
  },
  subtle: {
    as: "h4",
    color: "textMuted",
    fontSize: "sm",
    fontWeight: "semibold",
    lineHeight: "1.3",
  },
};

export function StudyHeading({
  variant = "section",
  children,
  ...props
}: StudyHeadingProps) {
  return (
    <Heading {...variantStyles[variant]} {...props}>
      {children}
    </Heading>
  );
}
