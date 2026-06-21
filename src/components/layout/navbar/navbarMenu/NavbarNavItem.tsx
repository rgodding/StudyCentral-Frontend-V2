import { HStack, Icon, Link } from "@chakra-ui/react";
import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import { Link as RouterLink, useLocation } from "react-router-dom";

import { StudyText } from "@/components/ui";

type NavbarNavItemProps = {
  to: string;
  icon: IconType;
  children: ReactNode;
  exact?: boolean;
};

export function NavbarNavItem({
  to,
  icon,
  children,
  exact = false,
}: NavbarNavItemProps) {
  const location = useLocation();

  const isActive = exact
    ? location.pathname === to
    : location.pathname === to || location.pathname.startsWith(`${to}/`);

  return (
    <Link
      asChild
      px={3}
      py={2}
      rounded="button"
      color={isActive ? "accent" : "textMuted"}
      bg={isActive ? "activeBg" : "transparent"}
      textDecoration="none"
      whiteSpace="nowrap"
      transitionProperty="colors, background-color"
      transitionDuration="fast"
      _hover={{
        color: "textMain",
        bg: "panelBgSubtle",
        textDecoration: "none",
      }}
      _active={{
        bg: "activeBg",
      }}
    >
      <RouterLink to={to}>
        <HStack gap={2}>
          <Icon as={icon} boxSize={4} />
          <StudyText
            as="span"
            variant="label"
            color="currentColor"
            fontSize="sm"
            lineHeight="1"
          >
            {children}
          </StudyText>
        </HStack>
      </RouterLink>
    </Link>
  );
}