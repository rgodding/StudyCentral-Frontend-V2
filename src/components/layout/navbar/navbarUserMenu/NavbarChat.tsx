import { ChatDrawer } from "@/components/chat/ChatDrawer";
import type { ChatDrawerProps } from "@/components/chat/ChatDrawer";

export type NavbarChatProps = ChatDrawerProps;

export function NavbarChat(props: NavbarChatProps) {
  return <ChatDrawer {...props} />;
}