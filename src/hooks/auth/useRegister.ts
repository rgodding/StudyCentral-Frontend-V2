import { useMutation, useQueryClient } from "@tanstack/react-query";

import { authApi } from "@/api/authApi";
import { queryKeys } from "@/config/queryKeys";
import type { RegisterDto } from "@/types/api";

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: RegisterDto) => authApi.register(dto),
    onSuccess: (user) => {
      queryClient.setQueryData(queryKeys.auth.currentUser, user);
    },
  });
}