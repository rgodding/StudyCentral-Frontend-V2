import { queryClient } from "@/app/providers/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";


type QueryProviderProps = {
  children: ReactNode;
};

export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}