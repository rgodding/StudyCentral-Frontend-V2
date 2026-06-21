import { IconButton, type IconButtonProps } from "@chakra-ui/react";
import { LuBell } from "react-icons/lu";

type NavbarNotificationProps = Omit<IconButtonProps, "aria-label" | "children">;

export function NavbarNotification(props: NavbarNotificationProps) {
  return (
    <IconButton
      aria-label="Notifications"
      size="sm"
      rounded="button"
      variant="ghost"
      color="textMuted"
      _hover={{
        color: "textMain",
        bg: "panelBgSubtle",
      }}
      _active={{
        bg: "activeBg",
      }}
      {...props}
    >
      <LuBell />
    </IconButton>
  );
}