import { LuBell } from "react-icons/lu";

import { StudyIconButton, type StudyIconButtonProps } from "@/components/ui";

type NavbarNotificationProps = Omit<
  StudyIconButtonProps,
  "aria-label" | "children"
>;

export function NavbarNotification(props: NavbarNotificationProps) {
  return (
    <StudyIconButton
      aria-label="Notifications"
      size="lg"
      variant="ghost"
      {...props}
    >
      <LuBell />
    </StudyIconButton>
  );
}