import {
  HStack,
  Icon,
  Menu,
  Portal,
  Text,
  type StackProps,
} from "@chakra-ui/react";
import { LuMenu } from "react-icons/lu";
import { Link as RouterLink, useLocation } from "react-router-dom";

import { StudyIconButton } from "@/components/ui";
import { NavbarNavItem } from "./NavbarNavItem";
import { studentNavigationItems } from "./navbarNavigationItems";

type NavbarMenuProps = StackProps;

export function NavbarMenu(props: NavbarMenuProps) {
  const location = useLocation();

  const activeItem = studentNavigationItems.find((item) => {
    if (item.exact) {
      return location.pathname === item.path;
    }

    return (
      location.pathname === item.path ||
      location.pathname.startsWith(`${item.path}/`)
    );
  });

  return (
    <>
      <HStack
        as="nav"
        gap={1}
        minW={0}
        display={{ base: "none", lg: "flex" }}
        {...props}
      >
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

      <Menu.Root positioning={{ placement: "bottom-start" }}>
        <Menu.Trigger asChild>
          <StudyIconButton
            aria-label="Open navigation menu"
            size="sm"
            variant="ghost"
            display={{ base: "inline-flex", lg: "none" }}
          >
            <LuMenu />
          </StudyIconButton>
        </Menu.Trigger>

        <Portal>
          <Menu.Positioner>
            <Menu.Content
              minW="220px"
              bg="surfaceBg"
              borderColor="borderSubtle"
              rounded="card"
              shadow="card"
              p={1}
            >
              {activeItem && (
                <>
                  <Text
                    px={3}
                    py={2}
                    fontSize="xs"
                    fontWeight="semibold"
                    color="textSubtle"
                  >
                    Current: {activeItem.label}
                  </Text>

                  <Menu.Separator borderColor="borderSubtle" />
                </>
              )}

              {studentNavigationItems.map((item) => (
                <Menu.Item
                  key={item.path}
                  value={item.path}
                  asChild
                  color="textMain"
                  rounded="button"
                  cursor="pointer"
                  _hover={{
                    bg: "panelBgSubtle",
                  }}
                >
                  <RouterLink to={item.path}>
                    <Icon as={item.icon} boxSize={4} />
                    {item.label}
                  </RouterLink>
                </Menu.Item>
              ))}
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </>
  );
}