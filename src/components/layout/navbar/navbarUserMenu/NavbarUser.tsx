import { Box, HStack } from "@chakra-ui/react";
import { useState } from "react";
import {
  LuBookOpen,
  LuLanguages,
  LuLogOut,
  LuMoon,
  LuSettings,
  LuSun,
  LuUserRound,
} from "react-icons/lu";
import { useNavigate } from "react-router-dom";

import { routes } from "@/app/routes/routes";
import { useStudyToast } from "@/components/feedback";
import {
  StudyAvatar,
  StudyBadge,
  StudyIconButton,
  StudyMenu,
  StudyText,
  type StudyIconButtonProps,
} from "@/components/ui";
import { useAuth } from "@/hooks";
import {
  getColorMode,
  toggleColorMode,
  type ColorMode,
} from "@/utils/colorMode";
import { getImageUrl } from "@/utils/getImageUrl";

const navbarUserText = {
  ariaLabel: "User menu",
  account: "Account",
  settings: "Settings",
  lightMode: "Light mode",
  darkMode: "Dark mode",
  language: "Language",
  componentPreview: "Component Preview",
  themePreview: "Theme Preview",
  later: "Later",
  signOut: "Sign out",
  signedOutSuccessfully: "Signed out successfully.",
  couldNotSignOut: "Could not sign out.",
};
export type NavbarUserProps = Omit<
  StudyIconButtonProps,
  "aria-label" | "children"
>;

export function NavbarUser(props: NavbarUserProps) {
  const navigate = useNavigate();
  const toast = useStudyToast();

  const { user, logout, logoutStatus } = useAuth();

  const [colorMode, setColorMode] = useState<ColorMode>(getColorMode);

  const isLoggingOut = logoutStatus === "pending";
  const isDark = colorMode === "dark";
  const fullName = user ? `${user.firstName} ${user.lastName}` : undefined;
  const profilePictureUrl = getImageUrl(user?.profilePictureUrl);

  function handleColorModeToggle() {
    const nextMode = toggleColorMode();
    setColorMode(nextMode);
  }

  async function handleLogout() {
    try {
      await logout();

      toast.success({
        title: navbarUserText.signedOutSuccessfully,
      });

      navigate(routes.login, { replace: true });
    } catch {
      toast.error({
        title: navbarUserText.couldNotSignOut,
      });
    }
  }

  if (!user) {
    return null;
  }

  return (
    <StudyMenu
      positioning={{ placement: "bottom-end", offset: { mainAxis: 18 } }}
      contentProps={{
        minW: "230px",
      }}
      trigger={
        <StudyIconButton
          aria-label={navbarUserText.ariaLabel}
          size="sm"
          variant="ghost"
          disabled={isLoggingOut}
          {...props}
        >
          <StudyAvatar
            name={fullName}
            src={profilePictureUrl}
            size="md"
            shape="circle"
          />
        </StudyIconButton>
      }
      header={
        <Box px={3} py={2}>
          <HStack
            align="center"
            justify="space-between"
            gap={2}
            flexWrap="wrap"
          >
            <StudyText
              fontSize="sm"
              fontWeight="semibold"
              color="textMain"
              minW={0}
              maxW="150px"
              truncate
            >
              {user.firstName}
            </StudyText>

            <StudyBadge variant="accent" flexShrink={0}>
              {user.role}
            </StudyBadge>
          </HStack>
        </Box>
      }
      items={[
        {
          value: "account",
          label: navbarUserText.account,
          icon: <LuUserRound />,
          onSelect: () => navigate(routes.account),
        },
        {
          value: "settings",
          label: navbarUserText.settings,
          icon: <LuSettings />,
          onSelect: () => navigate(routes.settings),
        },
        {
          value: "color-mode",
          label: isDark ? navbarUserText.lightMode : navbarUserText.darkMode,
          icon: isDark ? <LuSun /> : <LuMoon />,
          separatorBefore: true,
          onSelect: handleColorModeToggle,
        },
        {
          value: "language",
          label: (
            <HStack justify="space-between" w="full">
              <StudyText>{navbarUserText.language}</StudyText>

              <StudyText fontSize="xs" color="textSubtle">
                {navbarUserText.later}
              </StudyText>
            </HStack>
          ),
          icon: <LuLanguages />,
          disabled: true,
        },
        {
          value: "component-preview",
          label: navbarUserText.componentPreview,
          icon: <LuBookOpen />,
          separatorBefore: true,
          onSelect: () => navigate(routes.componentPreview),
        },
        {
          value: "theme-preview",
          label: navbarUserText.themePreview,
          icon: <LuBookOpen />,
          onSelect: () => navigate(routes.themePreview),
        },
        {
          value: "logout",
          label: navbarUserText.signOut,
          icon: <LuLogOut />,
          danger: true,
          disabled: isLoggingOut,
          separatorBefore: true,
          onSelect: () => {
            void handleLogout();
          },
        },
      ]}
    />
  );
}
