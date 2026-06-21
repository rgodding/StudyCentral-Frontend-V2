import { ChakraProvider, Theme } from "@chakra-ui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

import { queryClient } from "@/app/providers/queryClient";
import { system } from "@/theme";

type Props = {
  children: ReactNode;
};

export function AppProviders({ children }: Props) {
  return (
    <ChakraProvider value={system}>
      <Theme appearance="dark">
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </Theme>
    </ChakraProvider>
  );
}
