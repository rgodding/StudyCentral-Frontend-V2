import { apiClient } from "@/api/axiosClient";
import { apiRoutes } from "@/config/apiRoutes";
import type { ChangePasswordDto, UpdateUserDto, UserDto } from "@/types/api";

export const accountApi = {
  getCurrentUser: async (): Promise<UserDto> => {
    const response = await apiClient.get<UserDto>(apiRoutes.account.me);

    return response.data;
  },

  updateCurrentUser: async (dto: UpdateUserDto): Promise<UserDto> => {
    const response = await apiClient.put<UserDto>(apiRoutes.account.me, dto);

    return response.data;
  },

  changePassword: async (dto: ChangePasswordDto): Promise<void> => {
    await apiClient.put(apiRoutes.account.password, dto);
  },

  uploadProfilePicture: async (file: File): Promise<void> => {
    const formData = new FormData();
    formData.append("file", file);

    await apiClient.post(apiRoutes.account.profilePicture, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  deleteProfilePicture: async (): Promise<void> => {
    await apiClient.delete(apiRoutes.account.profilePicture);
  },
};