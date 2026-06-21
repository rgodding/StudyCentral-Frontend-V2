import type { Guid } from "@/types/api/common";
import type { UserRole } from "@/types/api/enums";

export type UserDto = {
  id: Guid;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  profilePictureUrl: string | null;
};

export type UpdateUserDto = {
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
};

export type ChangePasswordDto = {
  currentPassword: string;
  newPassword: string;
};