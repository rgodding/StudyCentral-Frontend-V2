import type { Guid } from "@/types/api/common";
import type { ChatRoomType } from "@/types/api/enums";

export type ChatRoomDto = {
  id: Guid;
  name: string | null;
  type: ChatRoomType;
  courseId?: Guid | null;
  courseName?: string | null;
  memberCount: number;
  unreadCount: number;
  lastMessagePreview?: string | null;
  lastMessageAt?: string | null;
  createdAt: string;
};

export type ChatMessageDto = {
  id: Guid;
  chatRoomId: Guid;
  senderId: Guid;
  senderName: string;
  content: string;
  createdAt: string;
  editedAt?: string | null;
  deletedAt?: string | null;
};

export type SendChatMessageDto = {
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
  userId: Guid;
  name: string;
  profilePictureUrl?: string;
};
