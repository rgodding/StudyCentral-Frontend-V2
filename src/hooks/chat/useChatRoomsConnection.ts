import { useCallback, useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import type { ChatRoomDto } from "@/types/api";


const HUB_URL = `${import.meta.env.VITE_API_BASE_URL}/hubs/chat`;

type ChatRoomsStatus =
  | "Disconnected"
  | "Connecting"
  | "Connected"
  | "Reconnecting"
  | "Connection failed";

export function useChatRoomsConnection() {
  const [courseChats, setCourseChats] = useState<ChatRoomDto[]>([]);
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null,
  );
  const [status, setStatus] = useState<ChatRoomsStatus>("Disconnected");

  useEffect(() => {
    let isMounted = true;

    const hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(HUB_URL, {
        withCredentials: true,
      })
      .withAutomaticReconnect()
      .build();

    hubConnection.on("CourseChatRoomsLoaded", (rooms: ChatRoomDto[]) => {
      if (!isMounted) return;

      setCourseChats(rooms);
    });

    hubConnection.on("CourseChatRoomsChanged", async () => {
      if (!isMounted) return;

      await hubConnection.invoke("GetCourseChatRooms");
    });

    hubConnection.onreconnecting(() => {
      if (!isMounted) return;

      setStatus("Reconnecting");
    });

    hubConnection.onreconnected(async () => {
      if (!isMounted) return;

      setStatus("Connected");

      try {
        await hubConnection.invoke("GetCourseChatRooms");
      } catch (error) {
        console.error("Failed to reload course chat rooms:", error);
      }
    });

    hubConnection.onclose(() => {
      if (!isMounted) return;

      setConnection(null);
      setStatus("Disconnected");
    });

    async function start() {
      try {
        setStatus("Connecting");

        await hubConnection.start();

        if (!isMounted) return;

        setConnection(hubConnection);
        setStatus("Connected");

        await hubConnection.invoke("GetCourseChatRooms");
      } catch (error) {
        if (!isMounted) return;

        console.error("Course chat rooms SignalR error:", error);
        setConnection(null);
        setStatus("Connection failed");
      }
    }

    start();

    return () => {
      isMounted = false;

      hubConnection.off("CourseChatRoomsLoaded");

      setConnection(null);

      if (hubConnection.state !== signalR.HubConnectionState.Disconnected) {
        hubConnection.stop().catch(() => {});
      }
    };
  }, []);

  const reloadCourseChats = useCallback(async () => {
    if (!connection) {
      return;
    }

    await connection.invoke("GetCourseChatRooms");
  }, [connection]);

  return {
    courseChats,
    status,
    reloadCourseChats,
  };
}
