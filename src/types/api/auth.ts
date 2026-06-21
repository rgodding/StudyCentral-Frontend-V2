import type { UserDto } from "@/types/api/users";

export type LoginDto = {
  email: string;
  password: string;
};

export type RegisterDto = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type AuthResponseDto = {
  user: UserDto;
};