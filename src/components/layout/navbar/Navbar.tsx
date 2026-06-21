import { Box, Flex, HStack, type BoxProps } from "@chakra-ui/react";

import { NavbarInfo } from "./navbarInfo";
import { NavbarUserMenu } from "./navbarUserMenu";
import { NavbarMenu } from "@/components/layout/navbar/navbarMenu";

type NavbarProps = BoxProps & {
  height?: string;
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

          <Box h="32px" w="1px" bg="borderStrong" flexShrink={0} />
          <NavbarMenu />
        </HStack>

        <NavbarUserMenu />
      </Flex>
    </Box>
  );
}