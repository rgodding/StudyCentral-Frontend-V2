import { useQuery } from "@tanstack/react-query";

import { accountApi } from "@/api/accountApi";
import { queryKeys } from "@/config/queryKeys";

export function useCurrentUser() {
  return useQuery({
    queryKey: queryKeys.auth.currentUser,
    queryFn: accountApi.getCurrentUser,
    retry: false,
  });
}