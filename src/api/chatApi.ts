import { apiClient } from "@/api/axiosClient";
import { apiRoutes } from "@/config/apiRoutes";
import type {
  ChatMessageDto,
  ChatRoomDto,
  Guid,
  SendChatMessageDto,
} from "@/types/api";

function getAbsoluteApiUrl(path: string) {
  const baseUrl = apiClient.defaults.baseURL;

  if (!baseUrl) {
    throw new Error("Missing apiClient baseURL.");
  }

  return `${baseUrl.replace(/\/$/, "")}${path}`;
}

export const chatApi = {
  getCourseRoom: async (courseId: Guid): Promise<ChatRoomDto> => {
    const response = await apiClient.get<ChatRoomDto>(
      apiRoutes.chat.courseRoom(courseId),
    );

    return response.data;
  },

  getMessages: async (chatRoomId: Guid): Promise<ChatMessageDto[]> => {
    const response = await apiClient.get<ChatMessageDto[]>(
      apiRoutes.chat.messages(chatRoomId),
    );

    return response.data;
  },

  sendMessage: async (
    chatRoomId: Guid,
    dto: SendChatMessageDto,
  ): Promise<ChatMessageDto> => {
    const response = await apiClient.post<ChatMessageDto>(
      apiRoutes.chat.messages(chatRoomId),
      dto,
    );

    return response.data;
  },

  markAllSeen: async (): Promise<void> => {
    await apiClient.post(apiRoutes.chat.markAllSeen);
  },

  getHubUrl: (): string => {
    return getAbsoluteApiUrl(apiRoutes.chat.hub);
  },
};