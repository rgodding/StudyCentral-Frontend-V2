import type { ChatRoomDto } from "@/types/api";
import {
  Badge,
  Box,
  Collapsible,
  HStack,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { LuChevronDown, LuChevronRight } from "react-icons/lu";


type Props = {
  courseChats: ChatRoomDto[];
  privateChats?: ChatRoomDto[];
  onSelectChat: (chat: ChatRoomDto) => void;
};

export function ChatListView({
  courseChats,
  privateChats = [],
  onSelectChat,
}: Props) {
  return (
    <Stack gap={2} p={4}>
      <ChatSection
        title="Course Chats"
        count={courseChats.length}
        unreadCount={courseChats.reduce(
          (total, chat) => total + chat.unreadCount,
          0,
        )}
      >
        {courseChats.map((chat) => (
          <ChatListItem
            key={chat.id}
            chat={chat}
            onClick={() => onSelectChat(chat)}
          />
        ))}
      </ChatSection>

      <ChatSection title="Private Chats" count={privateChats.length}>
        {privateChats.length === 0 ? (
          <Text px={3} py={2} color="gray.500" fontSize="sm">
            No private chats
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

function ChatSection({
  title,
  count,
  unreadCount = 0,
  children,
}: {
  title: string;
  count: number;
  unreadCount?: number;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);

  return (
    <Collapsible.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <HStack justify="space-between" py={2}>
        <Box>
          <HStack gap={2}>
            <Text fontWeight="semibold">{title}</Text>
            <Badge variant="subtle">{count}</Badge>
          </HStack>

          {unreadCount > 0 && (
            <Text fontSize="xs" color="red.500">
              Unread messages: {unreadCount}
            </Text>
          )}
        </Box>

        <Collapsible.Trigger asChild>
          <IconButton variant="ghost" size="sm" aria-label={`Toggle ${title}`}>
            {open ? <LuChevronDown /> : <LuChevronRight />}
          </IconButton>
        </Collapsible.Trigger>
      </HStack>

      <Collapsible.Content>
        <Stack gap={1}>{children}</Stack>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

function ChatListItem({
  chat,
  onClick,
}: {
  chat: ChatRoomDto;
  onClick: () => void;
}) {
  return (
    <Box
      px={3}
      py={3}
      rounded="md"
      cursor="pointer"
      _hover={{ bg: "gray.100" }}
      onClick={onClick}
    >
      <HStack justify="space-between" align="start">
        <Box>
          <Text fontWeight="medium">{chat.name}</Text>
          <Text fontSize="sm" color="gray.500">
            {chat.lastMessagePreview || "No messages yet"}
          </Text>
          <Text fontSize="xs" color="gray.400">
            {chat.memberCount} members
          </Text>
        </Box>

        {chat.unreadCount > 0 && (
          <Badge colorPalette="red" borderRadius="full">
            {chat.unreadCount}
          </Badge>
        )}
      </HStack>
    </Box>
  );
}
