import { HStack, type StackProps } from "@chakra-ui/react";

import { NavbarChat } from "./NavbarChat";
import { NavbarNotification } from "./NavbarNotification";
import { NavbarUser } from "./NavbarUser";

export type NavbarUserMenuProps = StackProps;

export function NavbarUserMenu(props: NavbarUserMenuProps) {
  return (
    <HStack gap={2} align="center" flexShrink={0} {...props}>
      <NavbarNotification />
      <NavbarChat />
      <NavbarUser />
    </HStack>
  );
}