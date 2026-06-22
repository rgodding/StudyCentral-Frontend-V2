import { Box, Flex, HStack, type BoxProps } from "@chakra-ui/react";

import { NavbarInfo } from "./navbarInfo";
import { NavbarMenu } from "./navbarMenu";
import { NavbarUserMenu } from "./navbarUserMenu";

export type NavbarProps = BoxProps & {
  height?: BoxProps["h"];
};

export function Navbar({ height = "full", ...props }: NavbarProps) {
  return (
    <Box
      as="header"
      h={height}
      bg="navBg"
      borderBottomWidth="1px"
      borderColor="accentMuted"
      zIndex="sticky"
      {...props}
    >
      <Flex h="full" align="center" justify="space-between" px={3} gap={6}>
        <HStack gap={4} minW={0}>
          <NavbarInfo />

          <Box aria-hidden h="32px" w="1px" bg="borderStrong" flexShrink={0} />

          <NavbarMenu />
        </HStack>

        <NavbarUserMenu />
      </Flex>
    </Box>
  );
}