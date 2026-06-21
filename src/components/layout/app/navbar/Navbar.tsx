import { Box, Flex, HStack, type BoxProps } from "@chakra-ui/react";

import { ColorModeToggle } from "@/components/ui";
import { NavbarLogo } from "./NavbarLogo";
import { NavbarTitle } from "./NavbarTitle";

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
          <HStack gap={3} flexShrink={0}>
            <NavbarLogo opacity={0.8} />
            <NavbarTitle />
          </HStack>

          <Box h="32px" w="1px" bg="borderStrong" flexShrink={0} />
        </HStack>

        <HStack gap={2} flexShrink={0}>
          <ColorModeToggle />
        </HStack>
      </Flex>
    </Box>
  );
}

/*
 <NavbarNavigation /> : 31

 36-38
 <NavbarNotification /> 
          <NavbarChat />
          <NavbarUser />
*/
