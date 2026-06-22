import { HStack, type StackProps } from "@chakra-ui/react";

import { NavbarLogo } from "./NavbarLogo";
import { NavbarTitle } from "./NavbarTitle";

export type NavbarInfoProps = StackProps;

export function NavbarInfo(props: NavbarInfoProps) {
  return (
    <HStack gap={3} align="center" flexShrink={0} {...props}>
      <NavbarLogo />
      <NavbarTitle />
    </HStack>
  );
}