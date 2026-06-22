import { Box, Spinner, Stack, type BoxProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

import { StudyText } from "@/components/ui/StudyText";

type LoadingStateSize = "sm" | "md";

type LoadingStateProps = BoxProps & {
  text?: ReactNode;
  fullHeight?: boolean;
  size?: LoadingStateSize;
};

const loadingStateText = {
  defaultText: "Loading...",
};

export function LoadingState({
  text = loadingStateText.defaultText,
  fullHeight = false,
  size = "md",
  ...props
}: LoadingStateProps) {
  const isSmall = size === "sm";

  return (
    <Box
      w="full"
      minH={fullHeight ? "100vh" : isSmall ? "120px" : "240px"}
      display="flex"
      alignItems="center"
      justifyContent="center"
      {...props}
    >
      <Stack align="center" gap={isSmall ? 2 : 3}>
        <Spinner size={isSmall ? "sm" : "md"} color="accent" />

        <StudyText variant="muted" fontSize={isSmall ? "sm" : undefined}>
          {text}
        </StudyText>
      </Stack>
    </Box>
  );
}