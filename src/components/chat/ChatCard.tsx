import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";

import { ChatMessageCard } from "@/components/chat/ChatMessageCard";
import { useChatConnection } from "@/hooks/chat/useChatConnection";
import type { Guid } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { chatApi } from "@/api/chatApi";

type Props = {
  courseId: Guid;
};

export function ChatCard({ courseId }: Props) {
  const { messages, chatRoom, connection, status } =
    useChatConnection(courseId);
  const [content, setContent] = useState("");

  const { data: existingMessages = [] } = useQuery({
    queryKey: ["chat-messages", chatRoom?.id],
    queryFn: () => chatApi.getMessages(chatRoom!.id),
    enabled: !!chatRoom,
  });

  const allMessages = [...existingMessages, ...messages];

  async function sendMessage() {
    if (!connection || !chatRoom || !content.trim()) return;

    await connection.invoke("SendMessage", chatRoom.id, {
      content: content.trim(),
    });

    setContent("");
  }

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages.length]);

  return (
    <Flex
      direction="column"
      w="100%"
      maxW="100%"
      h="500px"
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
      mt={6}
    >
      <Flex
        align="center"
        justify="space-between"
        px={4}
        py={3}
        borderBottomWidth="1px"
      >
        <Box>
          <Heading size="md">Course Chat</Heading>
          <Text fontSize="sm">{chatRoom?.name ?? "Joining room..."}</Text>
        </Box>

        <Text fontSize="sm">{status}</Text>
      </Flex>

      <Box flex="1" overflowY="auto" p={4}>
        <Stack gap={2}>
          {allMessages.length === 0 ? (
            <Text>No messages yet.</Text>
          ) : (
            allMessages.map((message) => (
              <ChatMessageCard key={message.id} message={message} />
            ))
          )}

          <div ref={bottomRef} />
        </Stack>
      </Box>

      <Flex gap={2} p={3} borderTopWidth="1px">
        <Input
          value={content}
          placeholder="Write a message..."
          onChange={(event) => setContent(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              sendMessage();
            }
          }}
        />

        <Button
          onClick={sendMessage}
          disabled={!connection || !chatRoom || !content.trim()}
        >
          Send
        </Button>
      </Flex>
    </Flex>
  );
}
