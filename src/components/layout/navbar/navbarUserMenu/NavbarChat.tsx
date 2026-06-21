import { IconButton, type IconButtonProps } from "@chakra-ui/react";
import { LuMessageCircle } from "react-icons/lu";

type NavbarChatProps = Omit<IconButtonProps, "aria-label" | "children">;

export function NavbarChat(props: NavbarChatProps) {
  return (
    <IconButton
      aria-label="Chat"
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
      <LuMessageCircle />
    </IconButton>
  );
}