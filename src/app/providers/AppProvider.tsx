import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import type { ReactNode } from "react";

import { QueryProvider } from "./QueryProvider";

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  return (
    <ChakraProvider value={defaultSystem}>
      <QueryProvider>{children}</QueryProvider>
    </ChakraProvider>
  );
}