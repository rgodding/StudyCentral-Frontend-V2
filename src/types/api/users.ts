import type { Guid } from "@/types/api/common";
import type { UserRole } from "@/types/api/enums";

export type UserDto = {
  id: Guid;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  role: UserRole;
  profilePictureUrl: string | null;
};

export type UpdateUserDto = {
  firstName: string;
  lastName: string;
};

export type ChangePasswordDto = {
  currentPassword: string;
  newPassword: string;
};