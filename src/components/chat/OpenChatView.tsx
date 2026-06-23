import { useEffect, useRef } from "react";
import {
  Avatar,
  Box,
  Flex,
  HStack,
  IconButton,
  Input,
  Popover,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";
import { LuSend } from "react-icons/lu";

import { getImageUrl } from "@/utils/getImageUrl";
import type { ChatRoomDto, ChatMessageDto, ChatOnlineUserDto } from "@/types/api";


type Props = {
  chat: ChatRoomDto;
  messages: ChatMessageDto[];
  onlineUsers: ChatOnlineUserDto[];
  message: string;
  setMessage: (value: string) => void;
  sendMessage: () => void;
};

export function OpenChatView({
  chat,
  messages,
  onlineUsers,
  message,
  setMessage,
  sendMessage,
}: Props) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Flex direction="column" height="100%" minH={0}>
      <OnlineUsersBar onlineUsers={onlineUsers} />

      <Stack flex="1" minH={0} gap={3} overflowY="auto" p={4}>
        <Box flex="1" />

        {sortedMessages.map((message) => (
          <ChatBubble
            key={message.id}
            senderName={message.senderName}
            content={message.content}
            createdAt={message.createdAt}
          />
        ))}

        <div ref={bottomRef} />
      </Stack>

      <Box borderTopWidth="1px" p={4} flexShrink={0}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            sendMessage();
          }}
        >
          <HStack>
            <Input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder={`Message ${chat.name}...`}
            />

            <IconButton
              aria-label="Send message"
              type="submit"
              disabled={!message.trim()}
            >
              <LuSend />
            </IconButton>
          </HStack>
        </form>
      </Box>
    </Flex>
  );
}

type OnlineUsersBarProps = {
  onlineUsers: ChatOnlineUserDto[];
};

function OnlineUsersBar({ onlineUsers }: OnlineUsersBarProps) {

  return (
    <Box borderBottomWidth="1px" px={4} py={2} flexShrink={0}>
      <HStack gap={2}>
        {onlineUsers.map((user) => (
          <Popover.Root key={user.userId}>
            <Popover.Trigger asChild>
              <Avatar.Root size="xs" cursor="pointer">
                <Avatar.Fallback name={user.name} />

                {user.profilePictureUrl && (
                  <Avatar.Image
                    src={getImageUrl(user.profilePictureUrl)}
                    alt={user.name}
                  />
                )}
              </Avatar.Root>
            </Popover.Trigger>

            <Portal>
              <Popover.Positioner>
                <Popover.Content width="auto" px={3} py={2}>
                  <Popover.Arrow />

                  <Popover.Body p={0}>
                    <Text fontSize="sm" fontWeight="medium">
                      {user.name}
                    </Text>
                  </Popover.Body>
                </Popover.Content>
              </Popover.Positioner>
            </Portal>
          </Popover.Root>
        ))}

        <Text fontSize="sm" color="gray.500">
          {onlineUsers.length} online
        </Text>
      </HStack>
    </Box>
  );
}

type ChatBubbleProps = {
  senderName: string;
  content: string;
  createdAt: string;
};

function ChatBubble({ senderName, content, createdAt }: ChatBubbleProps) {
  const time = new Date(createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Box bg="gray.100" borderRadius="lg" px={3} py={2} maxWidth="80%">
      <HStack justify="space-between" mb={1}>
        <Text fontSize="xs" color="gray.500">
          {senderName}
        </Text>

        <Text fontSize="xs" color="gray.400">
          {time}
        </Text>
      </HStack>

      <Text>{content}</Text>
    </Box>
  );
}
