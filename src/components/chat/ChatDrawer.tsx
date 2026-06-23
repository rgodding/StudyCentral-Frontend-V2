import { ChatListView } from "@/components/chat/ChatListView";
import { OpenChatView } from "@/components/chat/OpenChatView";
import {
  StudyIconButton,
  StudyTooltip,
  type StudyIconButtonProps,
} from "@/components/ui";
import { useChatConnection } from "@/hooks/chat/useChatConnection";
import { useChatRoomsConnection } from "@/hooks/chat/useChatRoomsConnection";
import type { ChatRoomDto } from "@/types/api";
import {
  Badge,
  Box,
  CloseButton,
  Drawer,
  HStack,
  Portal,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { LuArrowLeft, LuMessageCircle } from "react-icons/lu";

const chatDrawerText = {
  ariaLabel: "Open chat",
  tooltip: "Chat",
  title: "Chats",
  subtitle: "Course chats and private messages",
  backAriaLabel: "Back to chats",
};

export type ChatDrawerProps = Omit<
  StudyIconButtonProps,
  "aria-label" | "children"
>;

export function ChatDrawer(props: ChatDrawerProps) {
  const [open, setOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState<ChatRoomDto | null>(null);
  const [message, setMessage] = useState("");

  const { courseChats, reloadCourseChats } = useChatRoomsConnection();

  const totalUnreadCount = courseChats.reduce(
    (total, chat) => total + chat.unreadCount,
    0,
  );

  const hasUnreadMessages = totalUnreadCount > 0;

  const { messages, onlineUsers, sendMessage, leaveRoom, status } =
    useChatConnection(selectedChat?.courseId);

  const handleSendMessage = async () => {
    const trimmed = message.trim();

    if (!trimmed || !selectedChat) {
      return;
    }

    await sendMessage({
      content: trimmed,
    });

    setMessage("");
  };

  const handleSelectChat = async (chat: ChatRoomDto) => {
    setSelectedChat(chat);

    window.setTimeout(() => {
      reloadCourseChats();
    }, 300);
  };

  const handleBackToChats = async () => {
    if (selectedChat) {
      await leaveRoom(selectedChat.id);
    }

    setSelectedChat(null);
    setMessage("");
    await reloadCourseChats();
  };

  const handleDrawerOpenChange = async (details: { open: boolean }) => {
    setOpen(details.open);

    if (details.open) {
      return;
    }

    if (selectedChat) {
      await leaveRoom(selectedChat.id);
    }

    setSelectedChat(null);
    setMessage("");
    await reloadCourseChats();
  };

  return (
    <Drawer.Root
      placement="end"
      size="md"
      open={open}
      onOpenChange={handleDrawerOpenChange}
    >
      <StudyTooltip
        content={chatDrawerText.tooltip}
        positioning={{ placement: "bottom" }}
      >
        <Drawer.Trigger asChild>
          <StudyIconButton
            aria-label={chatDrawerText.ariaLabel}
            size="lg"
            variant={hasUnreadMessages ? "primary" : "ghost"}
            position="relative"
            {...props}
          >
            <LuMessageCircle />

            {hasUnreadMessages && (
              <Badge
                position="absolute"
                top="-1"
                right="-1"
                minW="5"
                h="5"
                px={1.5}
                rounded="full"
                bg="dangerText"
                color="white"
                borderWidth="2px"
                borderColor="navBg"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                fontSize="xs"
                lineHeight="1"
              >
                {totalUnreadCount}
              </Badge>
            )}
          </StudyIconButton>
        </Drawer.Trigger>
      </StudyTooltip>

      <Portal>
        <Drawer.Backdrop bg="blackAlpha.600" />

        <Drawer.Positioner>
          <Drawer.Content
            h="100dvh"
            bg="surfaceBg"
            color="textMain"
            borderLeftWidth="1px"
            borderColor="borderSubtle"
          >
            <Drawer.Header
              borderBottomWidth="1px"
              borderColor="borderSubtle"
              flexShrink={0}
              pr={12}
            >
              {selectedChat ? (
                <HStack gap={3} align="start">
                  <StudyIconButton
                    aria-label={chatDrawerText.backAriaLabel}
                    variant="ghost"
                    size="sm"
                    flexShrink={0}
                    onClick={handleBackToChats}
                  >
                    <LuArrowLeft />
                  </StudyIconButton>

                  <Box minW={0}>
                    <Drawer.Title asChild>
                      <Text fontWeight="semibold" truncate>
                        {selectedChat.name}
                      </Text>
                    </Drawer.Title>

                    <HStack gap={2} mt={1} wrap="wrap">
                      <Text fontSize="sm" color="textMuted">
                        {selectedChat.type} chat
                      </Text>

                      <Badge
                        size="sm"
                        colorPalette={status === "Connected" ? "green" : "gray"}
                        w="fit-content"
                      >
                        {status}
                      </Badge>
                    </HStack>
                  </Box>
                </HStack>
              ) : (
                <Box>
                  <Drawer.Title asChild>
                    <Text fontWeight="semibold">{chatDrawerText.title}</Text>
                  </Drawer.Title>

                  <Text fontSize="sm" color="textMuted" mt={1}>
                    {chatDrawerText.subtitle}
                  </Text>
                </Box>
              )}
            </Drawer.Header>

            <Drawer.Body
              p={0}
              display="flex"
              flexDirection="column"
              minH={0}
              flex="1"
              bg="appBg"
            >
              {selectedChat ? (
                <OpenChatView
                  chat={selectedChat}
                  messages={messages}
                  onlineUsers={onlineUsers}
                  message={message}
                  setMessage={setMessage}
                  sendMessage={handleSendMessage}
                />
              ) : (
                <ChatListView
                  courseChats={courseChats}
                  onSelectChat={handleSelectChat}
                  onReloadChats={reloadCourseChats}
                />
              )}
            </Drawer.Body>

            <Drawer.CloseTrigger asChild>
              <CloseButton
                size="sm"
                position="absolute"
                top={3}
                right={3}
                rounded="button"
                color="textMuted"
                bg="transparent"
                borderWidth="1px"
                borderColor="transparent"
                transitionDuration="normal"
                _hover={{
                  color: "textMain",
                  bg: "activeBg",
                  borderColor: "borderStrong",
                }}
              />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}
