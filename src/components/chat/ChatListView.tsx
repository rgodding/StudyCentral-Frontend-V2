import { Badge, Box, Collapsible, HStack, Stack, Text } from "@chakra-ui/react";
import { useState, type ReactNode } from "react";
import { LuChevronDown, LuChevronRight } from "react-icons/lu";

import { StudyIconButton } from "@/components/ui";
import type { ChatRoomDto } from "@/types/api";

import { ChatMarkAllSeenButton } from "./ChatMarkAllSeenButton";

type ChatListViewProps = {
  courseChats: ChatRoomDto[];
  onSelectChat: (chat: ChatRoomDto) => void;
  onReloadChats?: () => Promise<void> | void;
};

const privateChats: ChatRoomDto[] = [];

const chatListViewText = {
  courseChats: "Course Chats",
  privateChats: "Private Chats",
  noPrivateChats: "No private chats",
  unreadMessages: "Unread messages:",
  noMessagesYet: "No messages yet",
  members: "members",
  toggle: "Toggle",
};

export function ChatListView({
  courseChats,
  onSelectChat,
  onReloadChats,
}: ChatListViewProps) {
  const totalUnreadCount = courseChats.reduce(
    (total, chat) => total + chat.unreadCount,
    0,
  );

  return (
    <Stack gap={2} p={4}>
      <ChatSection
        title={chatListViewText.courseChats}
        count={courseChats.length}
        unreadCount={totalUnreadCount}
        onMarkedAllSeen={onReloadChats}
      >
        {courseChats.map((chat) => (
          <ChatListItem
            key={chat.id}
            chat={chat}
            onClick={() => onSelectChat(chat)}
          />
        ))}
      </ChatSection>

      <ChatSection title={chatListViewText.privateChats} count={privateChats.length}>
        {privateChats.length === 0 ? (
          <Text px={3} py={2} color="textMuted" fontSize="sm">
            {chatListViewText.noPrivateChats}
          </Text>
        ) : (
          privateChats.map((chat) => (
            <ChatListItem
              key={chat.id}
              chat={chat}
              onClick={() => onSelectChat(chat)}
            />
          ))
        )}
      </ChatSection>
    </Stack>
  );
}

type ChatSectionProps = {
  title: string;
  count: number;
  unreadCount?: number;
  onMarkedAllSeen?: () => Promise<void> | void;
  children: ReactNode;
};

function ChatSection({
  title,
  count,
  unreadCount = 0,
  onMarkedAllSeen,
  children,
}: ChatSectionProps) {
  const [open, setOpen] = useState(true);
  const hasUnreadMessages = unreadCount > 0;

  return (
    <Collapsible.Root open={open} onOpenChange={(details) => setOpen(details.open)}>
      <HStack justify="space-between" align="start" py={2} gap={3}>
        <Box minW={0} flex="1">
          <HStack gap={2} wrap="wrap">
            <Text fontWeight="semibold" color="textMain">
              {title}
            </Text>

            <Badge variant="subtle" w="fit-content">
              {count}
            </Badge>
          </HStack>

          {hasUnreadMessages && (
            <HStack mt={1.5} gap={3} justify="space-between" align="center">
              <Text fontSize="xs" color="dangerText">
                {chatListViewText.unreadMessages} {unreadCount}
              </Text>

              <ChatMarkAllSeenButton
                size="xs"
                variant="secondary"
                onMarkedAllSeen={onMarkedAllSeen}
              />
            </HStack>
          )}
        </Box>

        <Collapsible.Trigger asChild>
          <StudyIconButton
            variant="ghost"
            size="sm"
            aria-label={`${chatListViewText.toggle} ${title}`}
            flexShrink={0}
          >
            {open ? <LuChevronDown /> : <LuChevronRight />}
          </StudyIconButton>
        </Collapsible.Trigger>
      </HStack>

      <Collapsible.Content>
        <Stack gap={1}>{children}</Stack>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

type ChatListItemProps = {
  chat: ChatRoomDto;
  onClick: () => void;
};

function ChatListItem({ chat, onClick }: ChatListItemProps) {
  return (
    <Box
      px={3}
      py={3}
      rounded="card"
      cursor="pointer"
      borderWidth="1px"
      borderColor="transparent"
      transitionDuration="fast"
      _hover={{
        bg: "panelBgSubtle",
        borderColor: "borderSubtle",
      }}
      onClick={onClick}
    >
      <HStack justify="space-between" align="start" gap={3}>
        <Box minW={0}>
          <Text fontWeight="medium" color="textMain" truncate>
            {chat.name}
          </Text>

          <Text fontSize="sm" color="textMuted" lineClamp={1}>
            {chat.lastMessagePreview || chatListViewText.noMessagesYet}
          </Text>

          <Text fontSize="xs" color="textSubtle">
            {chat.memberCount} {chatListViewText.members}
          </Text>
        </Box>

        {chat.unreadCount > 0 && (
          <Badge
            bg="dangerText"
            color="white"
            rounded="full"
            minW="5"
            h="5"
            px={1.5}
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            flexShrink={0}
          >
            {chat.unreadCount}
          </Badge>
        )}
      </HStack>
    </Box>
  );
}