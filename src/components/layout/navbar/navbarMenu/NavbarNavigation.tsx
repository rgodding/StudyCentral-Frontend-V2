import { HStack, type StackProps } from "@chakra-ui/react";

import { NavbarNavItem } from "./NavbarNavItem";
import { studentNavigationItems } from "./navbarNavigationItems";

type NavbarNavigationProps = StackProps;

export function NavbarNavigation(props: NavbarNavigationProps) {
  return (
    <HStack as="nav" gap={1} minW={0} {...props}>
      {studentNavigationItems.map((item) => (
        <NavbarNavItem
          key={item.path}
          to={item.path}
          icon={item.icon}
          exact={item.exact}
        >
          {item.label}
        </NavbarNavItem>
      ))}
    </HStack>
  );
}