import { useMutation, useQueryClient } from "@tanstack/react-query";

import { authApi } from "@/api/authApi";
import { queryKeys } from "@/config/queryKeys";
import type { LoginDto } from "@/types/api";

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: LoginDto) => authApi.login(dto),
    onSuccess: (user) => {
      queryClient.setQueryData(queryKeys.auth.currentUser, user);
    },
  });
}