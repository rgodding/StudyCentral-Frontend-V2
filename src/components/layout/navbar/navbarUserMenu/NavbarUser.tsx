import {
  Box,
  HStack,
  IconButton,
  Menu,
  Portal,
  Text,
  type IconButtonProps,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  LuLanguages,
  LuLogOut,
  LuMoon,
  LuSettings,
  LuSun,
  LuUserRound,
} from "react-icons/lu";
import { useNavigate } from "react-router-dom";

import { useStudyToast } from "@/components/feedback";
import { useAuth } from "@/hooks";
import {
  getColorMode,
  toggleColorMode,
  type ColorMode,
} from "@/utils/colorMode";
import { StudyBadge, StudyText } from "@/components/ui";

type NavbarUserProps = Omit<IconButtonProps, "aria-label" | "children">;

export function NavbarUser(props: NavbarUserProps) {
  const navigate = useNavigate();
  const toast = useStudyToast();

  const { user, logout, logoutStatus } = useAuth();

  const [colorMode, setColorMode] = useState<ColorMode>(getColorMode);

  const isLoggingOut = logoutStatus === "pending";
  const isDark = colorMode === "dark";

  const fullName = user ? `${user.firstName} ${user.lastName}` : "User";

  function handleColorModeToggle() {
    const nextMode = toggleColorMode();
    setColorMode(nextMode);
  }

  async function handleLogout() {
    try {
      await logout();

      toast.success({
        title: "Signed out successfully.",
      });

      navigate("/login", { replace: true });
    } catch {
      toast.error({
        title: "Could not sign out.",
      });
    }
  }

  return (
    <Menu.Root positioning={{ placement: "bottom-end" }}>
      <Menu.Trigger asChild>
        <IconButton
          aria-label="User menu"
          size="sm"
          rounded="button"
          variant="ghost"
          color="textMuted"
          disabled={isLoggingOut}
          _hover={{
            color: "textMain",
            bg: "panelBgSubtle",
          }}
          _active={{
            bg: "activeBg",
          }}
          {...props}
        >
          <LuUserRound />
        </IconButton>
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
            <Box px={3} py={2} justifyContent="center">
              <Text
                fontSize="sm"
                fontWeight="semibold"
                color="textMain"
                truncate
              >
                {fullName}
              </Text>

              {user && (
                <StudyBadge variant="neutral" mt={1} py={0.5} px={2}>
                  <StudyText variant="smallSubtle">{user.role}</StudyText>
                </StudyBadge>
              )}
            </Box>

            <Menu.Separator borderColor="borderSubtle" />

            <Menu.Item
              value="account"
              color="textMain"
              rounded="button"
              cursor="pointer"
              onClick={() => navigate("/account")}
              _hover={{
                bg: "panelBgSubtle",
              }}
            >
              <LuUserRound />
              Account
            </Menu.Item>

            <Menu.Item
              value="settings"
              color="textMain"
              rounded="button"
              cursor="pointer"
              onClick={() => navigate("/account")}
              _hover={{
                bg: "panelBgSubtle",
              }}
            >
              <LuSettings />
              Settings
            </Menu.Item>

            <Menu.Separator borderColor="borderSubtle" />

            <Menu.Item
              value="color-mode"
              color="textMain"
              rounded="button"
              cursor="pointer"
              onClick={handleColorModeToggle}
              _hover={{
                bg: "panelBgSubtle",
              }}
            >
              {isDark ? <LuSun /> : <LuMoon />}
              {isDark ? "Light mode" : "Dark mode"}
            </Menu.Item>

            <Menu.Item
              value="language"
              color="textMain"
              rounded="button"
              cursor="pointer"
              disabled
              _hover={{
                bg: "panelBgSubtle",
              }}
            >
              <LuLanguages />
              <HStack justify="space-between" w="full">
                <Text>Language</Text>
                <Text fontSize="xs" color="textSubtle">
                  Later
                </Text>
              </HStack>
            </Menu.Item>

            <Menu.Separator borderColor="borderSubtle" />

            <Menu.Item
              value="logout"
              color="dangerText"
              rounded="button"
              cursor="pointer"
              disabled={isLoggingOut}
              onClick={handleLogout}
              _hover={{
                bg: "panelBgSubtle",
              }}
            >
              <LuLogOut />
              Sign out
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
