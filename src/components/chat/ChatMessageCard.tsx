import type { ChatMessageDto } from "@/types/api";
import { Box, Text } from "@chakra-ui/react";


type Props = {
  message: ChatMessageDto;
};

export function ChatMessageCard({ message }: Props) {
  return (
    <Box p={2} borderWidth="1px" borderRadius="md">
      <Text fontWeight="bold">{message.senderName}</Text>

      <Text>{message.content}</Text>

      <Text fontSize="xs" color="gray.500">
        {new Date(message.createdAt).toLocaleString()}
      </Text>
    </Box>
  );
}