import { authApi } from "@/api/authApi";
import { queryKeys } from "@/config/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.account.me,
      });
    },
  });
}