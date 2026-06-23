import type { Guid } from "@/types/api";

import { apiBaseRoutes } from "./apiBaseRoutes";

export const chatApiRoutes = {
  courseRoom: (courseId: Guid) =>
    `${apiBaseRoutes.chat}/courses/${courseId}/room`,

  messages: (chatRoomId: Guid) =>
    `${apiBaseRoutes.chat}/rooms/${chatRoomId}/messages`,

  hub: apiBaseRoutes.hubs.chat,
} as const;