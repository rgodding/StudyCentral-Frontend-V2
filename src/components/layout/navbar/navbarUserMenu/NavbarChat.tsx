import { LuMessageCircle } from "react-icons/lu";

import { StudyIconButton, type StudyIconButtonProps } from "@/components/ui";

type NavbarChatProps = Omit<StudyIconButtonProps, "aria-label" | "children">;

export function NavbarChat(props: NavbarChatProps) {
  return (
    <StudyIconButton aria-label="Chat" size="lg" variant="ghost" {...props}>
      <LuMessageCircle />
    </StudyIconButton>
  );
}