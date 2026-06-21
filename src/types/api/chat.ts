import type { ApiDate, Guid } from "@/types/api/common";
import type { ChatRoomType } from "@/types/api/enums";

export type ChatRoomDto = {
  id: Guid;
  name: string | null;
  type: ChatRoomType;
  courseId: Guid | null;
  courseName: string | null;
  lastMessageAt: ApiDate | null;
  lastMessagePreview: string | null;
  memberCount: number;
  createdAt: ApiDate;
  updatedAt: ApiDate | null;
};

export type ChatMessageDto = {
  id: Guid;
  chatRoomId: Guid;
  senderId: Guid;
  senderName: string | null;
  content: string | null;
  createdAt: ApiDate;
  updatedAt: ApiDate | null;
};

export type SendChatMessageDto = {
  chatRoomId: Guid;
  content: string;
};

export type CreatePrivateChatDto = {
  otherUserId: Guid;
};

export type CreateGroupChatDto = {
  name: string;
  memberIds: Guid[];
};

export type CreateCourseChatDto = {
  courseId: Guid;
};

export type UpdateChatRoomDto = {
  name: string;
};

export type ChatCurrentUserDto = {
  id: Guid;
  displayName: string | null;
};

export type ChatOnlineUserDto = {
  id: Guid;
  displayName: string | null;
  connectedAt: ApiDate;
};