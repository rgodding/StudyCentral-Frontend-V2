import { Link } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

import { StudyText } from "@/components/ui";

export type SubNavbarItemProps = {
  label: ReactNode;
  to: string;
  exact?: boolean;
};

export function SubNavbarItem({ label, to, exact = false }: SubNavbarItemProps) {
  const location = useLocation();

  const isActive = exact
    ? location.pathname === to
    : location.pathname === to || location.pathname.startsWith(`${to}/`);

  return (
    <Link
      asChild
      h="full"
      px={3}
      display="flex"
      alignItems="center"
      color={isActive ? "accent" : "textMuted"}
      bg={isActive ? "activeBg" : "transparent"}
      borderBottomWidth="2px"
      borderBottomColor={isActive ? "accent" : "transparent"}
      textDecoration="none"
      whiteSpace="nowrap"
      transitionProperty="background-color, border-color, color"
      transitionDuration="fast"
      _hover={{
        color: "textMain",
        bg: "panelBgSubtle",
        textDecoration: "none",
      }}
    >
      <RouterLink to={to} aria-current={isActive ? "page" : undefined}>
        <StudyText
          as="span"
          variant="label"
          color="currentColor"
          fontSize="sm"
          lineHeight="1"
        >
          {label}
        </StudyText>
      </RouterLink>
    </Link>
  );
}