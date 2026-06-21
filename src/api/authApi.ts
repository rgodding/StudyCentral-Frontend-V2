import { apiClient } from "@/api/axiosClient";
import { apiRoutes } from "@/config/apiRoutes";
import type { LoginDto, RegisterDto, UserDto } from "@/types/api";

export const authApi = {
  register: async (dto: RegisterDto): Promise<UserDto> => {
    const response = await apiClient.post<UserDto>(
      apiRoutes.auth.register,
      dto,
    );

    return response.data;
  },

  login: async (dto: LoginDto): Promise<UserDto> => {
    const response = await apiClient.post<UserDto>(
      apiRoutes.auth.login,
      dto,
    );

    return response.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post(apiRoutes.auth.logout);
  },

  generateHash: async (value?: string): Promise<string> => {
    const response = await apiClient.get<string>(apiRoutes.auth.generatorHash, {
      params: {
        value,
      },
    });

    return response.data;
  },
};