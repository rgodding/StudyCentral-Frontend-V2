import { Link, type LinkProps } from "@chakra-ui/react";

type StudyLinkVariant = "default" | "muted" | "nav" | "danger";

type StudyLinkProps = Omit<LinkProps, "variant"> & {
  linkVariant?: StudyLinkVariant;
};

const variantStyles: Record<StudyLinkVariant, LinkProps> = {
  default: {
    color: "accent",
    fontWeight: "semibold",
    _hover: {
      textDecoration: "underline",
      textUnderlineOffset: "3px",
    },
  },

  muted: {
    color: "textMuted",
    fontWeight: "medium",
    _hover: {
      color: "textMain",
      textDecoration: "underline",
      textUnderlineOffset: "3px",
    },
  },

  nav: {
    color: "textMuted",
    fontWeight: "medium",
    textDecoration: "none",
    _hover: {
      color: "textMain",
      textDecoration: "none",
    },
  },

  danger: {
    color: "dangerText",
    fontWeight: "semibold",
    _hover: {
      textDecoration: "underline",
      textUnderlineOffset: "3px",
    },
  },
};

export function StudyLink({
  linkVariant = "default",
  children,
  ...props
}: StudyLinkProps) {
  return (
    <Link {...variantStyles[linkVariant]} {...props}>
      {children}
    </Link>
  );
}