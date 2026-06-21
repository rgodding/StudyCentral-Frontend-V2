import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 30, // 30 seconds
            retry: 3, // Retry failed requests up to 3 times
            refetchOnWindowFocus: false, // Disable refetching on window focus
        },
    },
});