import { useCallback, useEffect, useRef, useState } from "react";
import * as signalR from "@microsoft/signalr";

import type {
  ChatMessageDto,
  ChatOnlineUserDto,
  ChatRoomDto,
  Guid,
  SendChatMessageDto,
} from "@/types/api";

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

  const chatRoomIdRef = useRef<Guid | null>(null);
  const connectionRef = useRef<signalR.HubConnection | null>(null);

  useEffect(() => {
    if (!courseId) {
      return;
    }

    let isMounted = true;
    let hasLeftRoom = false;

    const hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(HUB_URL, {
        withCredentials: true,
      })
      .withAutomaticReconnect()
      .build();

    connectionRef.current = hubConnection;

    hubConnection.on("JoinedRoom", (room: ChatRoomDto) => {
      chatRoomIdRef.current = room.id;

      if (!isMounted) return;

      setChatRoom(room);
    });

    hubConnection.on(
      "ChatMessagesLoaded",
      (loadedMessages: ChatMessageDto[]) => {
        if (!isMounted) return;

        setMessages(loadedMessages);
      },
    );

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
      connectionRef.current = null;

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
      hubConnection.off("RoomUsersChanged");
      hubConnection.off("UserDisconnected");

      const roomId = chatRoomIdRef.current;

      async function leaveAndStop() {
        if (
          roomId &&
          !hasLeftRoom &&
          hubConnection.state === signalR.HubConnectionState.Connected
        ) {
          hasLeftRoom = true;

          try {
            await hubConnection.invoke("LeaveRoom", roomId);
          } catch (error) {
            console.error("Failed to leave chat room:", error);
          }
        }

        if (hubConnection.state !== signalR.HubConnectionState.Disconnected) {
          await hubConnection.stop().catch(() => {});
        }

        if (connectionRef.current === hubConnection) {
          connectionRef.current = null;
        }

        if (chatRoomIdRef.current === roomId) {
          chatRoomIdRef.current = null;
        }
      }

      leaveAndStop();
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

  const leaveRoom = useCallback(
    async (chatRoomId?: Guid) => {
      const activeConnection = connectionRef.current;
      const roomId = chatRoomId ?? chatRoomIdRef.current ?? chatRoom?.id;

      if (!activeConnection || !roomId) {
        return;
      }

      if (activeConnection.state !== signalR.HubConnectionState.Connected) {
        return;
      }

      await activeConnection.invoke("LeaveRoom", roomId);

      if (chatRoomIdRef.current === roomId) {
        chatRoomIdRef.current = null;
      }

      setChatRoom(null);
      setMessages([]);
      setOnlineUsers([]);
    },
    [chatRoom],
  );

  return {
    messages,
    chatRoom,
    connection,
    status,
    sendMessage,
    leaveRoom,
    onlineUsers,
  };
}