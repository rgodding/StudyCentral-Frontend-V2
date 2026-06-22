import { LuMessageCircle } from "react-icons/lu";

import {
  StudyIconButton,
  StudyTooltip,
  type StudyIconButtonProps,
} from "@/components/ui";

const navbarChatText = {
  ariaLabel: "Chat",
  tooltip: "Chat - To be implemented",
};

export type NavbarChatProps = Omit<
  StudyIconButtonProps,
  "aria-label" | "children"
>;

export function NavbarChat(props: NavbarChatProps) {
  return (
    <StudyTooltip content={navbarChatText.tooltip} positioning={{ placement: "bottom" }}>
      <StudyIconButton
        aria-label={navbarChatText.ariaLabel}
        size="lg"
        variant="ghost"
        {...props}
      >
        <LuMessageCircle />
      </StudyIconButton>
    </StudyTooltip>
  );
}