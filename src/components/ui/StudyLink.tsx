import { Link, type LinkProps } from "@chakra-ui/react";

export type StudyLinkVariant =
  | "default"
  | "muted"
  | "nav"
  | "danger"
  | "subtle";

export type StudyLinkSize = "sm" | "md" | "lg";

export type StudyLinkProps = Omit<LinkProps, "variant" | "size"> & {
  linkVariant?: StudyLinkVariant;
  size?: StudyLinkSize;
};

const variantStyles: Record<StudyLinkVariant, LinkProps> = {
  default: {
    color: "accent",
    fontWeight: "semibold",
    textDecoration: "none",
    _hover: {
      textDecoration: "underline",
      textUnderlineOffset: "3px",
    },
    _active: {
      color: "brand.700",
    },
  },

  muted: {
    color: "textMuted",
    fontWeight: "medium",
    textDecoration: "none",
    _hover: {
      color: "textMain",
      textDecoration: "underline",
      textUnderlineOffset: "3px",
    },
    _active: {
      color: "textMain",
    },
  },

  subtle: {
    color: "textSubtle",
    fontWeight: "medium",
    textDecoration: "none",
    _hover: {
      color: "textMuted",
      textDecoration: "underline",
      textUnderlineOffset: "3px",
    },
    _active: {
      color: "textMain",
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
    _active: {
      color: "accent",
    },
  },

  danger: {
    color: "dangerText",
    fontWeight: "semibold",
    textDecoration: "none",
    _hover: {
      textDecoration: "underline",
      textUnderlineOffset: "3px",
    },
    _active: {
      color: "red.700",
    },
  },
};

const sizeStyles: Record<StudyLinkSize, LinkProps> = {
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

export function StudyLink({
  linkVariant = "default",
  size = "md",
  children,
  ...props
}: StudyLinkProps) {
  return (
    <Link
      transitionProperty="color, text-decoration-color"
      transitionDuration="fast"
      _focus={{
        outline: "none",
        boxShadow: "none",
      }}
      _focusVisible={{
        outline: "2px solid",
        outlineColor: "accent",
        outlineOffset: "2px",
        rounded: "sm",
      }}
      {...variantStyles[linkVariant]}
      {...sizeStyles[size]}
      {...props}
    >
      {children}
    </Link>
  );
}
