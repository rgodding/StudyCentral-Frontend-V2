import { HStack, Icon, Menu, Portal, type StackProps } from "@chakra-ui/react";
import { LuMenu } from "react-icons/lu";
import { Link as RouterLink, useLocation } from "react-router-dom";

import { StudyIconButton, StudyText } from "@/components/ui";
import { NavbarNavItem } from "./NavbarNavItem";
import {
  studentNavigationItems,
  type NavbarNavigationItem,
} from "./navbarNavigationItems";

const navbarMenuText = {
  openNavigationMenu: "Open navigation menu",
  currentPrefix: "Current:",
};

function isNavigationItemActive(pathname: string, item: NavbarNavigationItem) {
  if (item.exact) {
    return pathname === item.path;
  }

  return pathname === item.path || pathname.startsWith(`${item.path}/`);
}

export type NavbarMenuProps = StackProps;

export function NavbarMenu(props: NavbarMenuProps) {
  const location = useLocation();

  const activeItem = studentNavigationItems.find((item) =>
    isNavigationItemActive(location.pathname, item),
  );

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
            aria-label={navbarMenuText.openNavigationMenu}
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
                  <StudyText
                    variant="label"
                    px={3}
                    py={2}
                    fontSize="xs"
                    fontWeight="semibold"
                    color="textSubtle"
                  >
                    {navbarMenuText.currentPrefix} {activeItem.label}
                  </StudyText>

                  <Menu.Separator borderColor="borderSubtle" />
                </>
              )}

              {studentNavigationItems.map((item) => {
                const isActive = isNavigationItemActive(
                  location.pathname,
                  item,
                );

                return (
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
                    <RouterLink
                      to={item.path}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <Icon as={item.icon} boxSize={4} />
                      {item.label}
                    </RouterLink>
                  </Menu.Item>
                );
              })}
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </>
  );
}