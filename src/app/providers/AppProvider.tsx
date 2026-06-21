import { ChakraProvider, Theme } from "@chakra-ui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useLayoutEffect, useState, type ReactNode } from "react";

import { queryClient } from "@/app/providers/queryClient";
import { StudyToaster } from "@/components/feedback";
import { system } from "@/theme";
import {
  applyColorMode,
  COLOR_MODE_CHANGE_EVENT,
  getColorMode,
  type ColorMode,
} from "@/utils/colorMode";

type Props = {
  children: ReactNode;
};

export function AppProviders({ children }: Props) {
  const [colorMode, setColorModeState] = useState<ColorMode>(getColorMode);

  useLayoutEffect(() => {
    applyColorMode(colorMode);
  }, [colorMode]);

  useEffect(() => {
    function handleColorModeChange(event: Event) {
      const customEvent = event as CustomEvent<ColorMode>;

      setColorModeState(customEvent.detail);
    }

    function handleStorage(event: StorageEvent) {
      if (event.key !== "studycentral-color-mode") return;

      setColorModeState(getColorMode());
    }

    window.addEventListener(COLOR_MODE_CHANGE_EVENT, handleColorModeChange);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(
        COLOR_MODE_CHANGE_EVENT,
        handleColorModeChange,
      );
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return (
    <ChakraProvider value={system}>
      <Theme appearance={colorMode}>
        <QueryClientProvider client={queryClient}>
          {children}
          <StudyToaster />
        </QueryClientProvider>
      </Theme>
    </ChakraProvider>
  );
}
