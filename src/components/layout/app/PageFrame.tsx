import { Box, type BoxProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

type PageFrameWidth = "normal" | "large" | "full";
type PageFrameVariant = "plain" | "panel";

type PageFrameProps = BoxProps & {
  children: ReactNode;
  frameWidth?: PageFrameWidth;
  variant?: PageFrameVariant;
};

const pageFrameWidths: Record<PageFrameWidth, string> = {
  normal: "960px",
  large: "1180px",
  full: "100%",
};

export function PageFrame({
  children,
  frameWidth = "large",
  variant = "panel",
  ...props
}: PageFrameProps) {
  const isFull = frameWidth === "full";
  const isPanel = variant === "panel";

  return (
    <Box w="full" h="full" bg="appBg" px={isFull ? 0 : { base: 4, md: 6 }}>
      <Box
        w="full"
        h="full"
        maxW={isFull ? "none" : pageFrameWidths[frameWidth]}
        mx="auto"
        bg={isPanel ? "surfaceBg" : "transparent"}
        borderLeftWidth={isPanel ? "1px" : "0"}
        borderRightWidth={isPanel ? "1px" : "0"}
        borderColor="borderSubtle"
        px={isPanel ? { base: 4, md: 6 } : 0}
        py={isPanel ? { base: 2, md: 6 } : 0}
        overflow="auto"
        {...props}
      >
        {children}
      </Box>
    </Box>
  );
}
