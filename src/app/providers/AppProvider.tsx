import { ChakraProvider, Theme } from "@chakra-ui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

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
  
  const hasMounted = useRef(false);

  useLayoutEffect(() => {
    if (!hasMounted.current) {
      applyColorMode(colorMode);
      hasMounted.current = true;
      return;
    }

    document.documentElement.classList.add("color-mode-transitioning");

    applyColorMode(colorMode);

    const timeoutId = window.setTimeout(() => {
      document.documentElement.classList.remove("color-mode-transitioning");
    }, 220);

    return () => {
      window.clearTimeout(timeoutId);
      document.documentElement.classList.remove("color-mode-transitioning");
    };
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
