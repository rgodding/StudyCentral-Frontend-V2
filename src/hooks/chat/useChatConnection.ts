import { useCallback, useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import type { Guid, ChatMessageDto, ChatRoomDto, ChatOnlineUserDto, SendChatMessageDto } from "@/types/api";


const HUB_URL = `${import.meta.env.VITE_API_BASE_URL}/hubs/chat`;

type ChatStatus =
  | "Disconnected"
  | "Connecting"
  | "Connected"
  | "Reconnecting"
  | "Connection failed";

type UserDisconnectedEvent = {
  chatRoomId: Guid;
  userId: Guid;
  message: string;
  disconnectedAt: string;
};

export function useChatConnection(courseId?: Guid | null) {
  const [messages, setMessages] = useState<ChatMessageDto[]>([]);
  const [chatRoom, setChatRoom] = useState<ChatRoomDto | null>(null);
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null,
  );
  const [status, setStatus] = useState<ChatStatus>("Disconnected");
  const [onlineUsers, setOnlineUsers] = useState<ChatOnlineUserDto[]>([]);

  useEffect(() => {
    if (!courseId) {
      return;
    }

    let isMounted = true;

    const hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(HUB_URL, {
        withCredentials: true,
      })
      .withAutomaticReconnect()
      .build();

    hubConnection.on("JoinedRoom", (room: ChatRoomDto) => {
      if (!isMounted) return;

      setChatRoom(room);
    });

    hubConnection.on("ChatMessagesLoaded", (messages: ChatMessageDto[]) => {
      if (!isMounted) return;

      setMessages(messages);
    });

    hubConnection.on("ReceiveMessage", (message: ChatMessageDto) => {
      if (!isMounted) return;

      setMessages((previousMessages) => [...previousMessages, message]);
    });
    hubConnection.on("RoomUsersChanged", (users: ChatOnlineUserDto[]) => {
      if (!isMounted) return;

      setOnlineUsers(users);
    });

    hubConnection.on("UserDisconnected", (event: UserDisconnectedEvent) => {
      if (!isMounted) return;

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          id: crypto.randomUUID(),
          chatRoomId: event.chatRoomId,
          senderId: event.userId,
          senderName: "System",
          content: event.message,
          createdAt: event.disconnectedAt,
          editedAt: null,
          deletedAt: null,
        },
      ]);
    });

    hubConnection.onreconnecting(() => {
      if (!isMounted) return;

      setStatus("Reconnecting");
    });

    hubConnection.onreconnected(async () => {
      if (!isMounted) return;

      setStatus("Connected");

      try {
        await hubConnection.invoke("JoinCourseRoom", courseId);
      } catch (error) {
        console.error("Failed to rejoin course room:", error);
      }
    });

    hubConnection.onclose(() => {
      if (!isMounted) return;

      setConnection(null);
      setStatus("Disconnected");
    });

    async function startConnection() {
      try {
        setStatus("Connecting");

        await hubConnection.start();

        if (!isMounted) return;

        setConnection(hubConnection);
        setStatus("Connected");

        await hubConnection.invoke("JoinCourseRoom", courseId);
      } catch (error) {
        if (!isMounted) return;

        console.error("SignalR error:", error);
        setConnection(null);
        setStatus("Connection failed");
      }
    }

    startConnection();

    return () => {
      isMounted = false;

      hubConnection.off("JoinedRoom");
      hubConnection.off("ChatMessagesLoaded");
      hubConnection.off("ReceiveMessage");
      hubConnection.off("UserDisconnected");
      hubConnection.off("CourseChatRoomsChanged");
      hubConnection.off("RoomUsersChanged");

      setConnection(null);
      setChatRoom(null);
      setMessages([]);

      if (hubConnection.state !== signalR.HubConnectionState.Disconnected) {
        hubConnection.stop().catch(() => {});
      }
    };
  }, [courseId]);

  const sendMessage = useCallback(
    async (dto: SendChatMessageDto) => {
      if (!connection || !chatRoom) {
        return;
      }

      await connection.invoke("SendMessage", chatRoom.id, dto);
    },
    [connection, chatRoom],
  );

  return {
    messages,
    chatRoom,
    connection,
    status,
    sendMessage,
    onlineUsers,
  };
}
