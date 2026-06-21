import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { accountApi } from "@/api/accountApi";
import { queryKeys } from "@/config/queryKeys";

export function useCurrentUser() {
  return useQuery({
    queryKey: queryKeys.account.me,

    queryFn: async () => {
      try {
        return await accountApi.getCurrentUser();
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          return null;
        }

        throw error;
      }
    },

    retry: false,
    refetchOnWindowFocus: false,
  });
}
