import { LuBell } from "react-icons/lu";

import {
  StudyIconButton,
  StudyTooltip,
  type StudyIconButtonProps,
} from "@/components/ui";

const navbarNotificationText = {
  ariaLabel: "Notifications",
  tooltip: "Notifications - To be implemented",
};

export type NavbarNotificationProps = Omit<
  StudyIconButtonProps,
  "aria-label" | "children"
>;

export function NavbarNotification(props: NavbarNotificationProps) {
  return (
    <StudyTooltip
      content={navbarNotificationText.tooltip}
      positioning={{ placement: "bottom" }}
    >
      <StudyIconButton
        aria-label={navbarNotificationText.ariaLabel}
        size="lg"
        variant="ghost"
        {...props}
      >
        <LuBell />
      </StudyIconButton>
    </StudyTooltip>
  );
}