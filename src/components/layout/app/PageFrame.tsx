import type { BoxProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

import { StudyBox } from "@/components/ui";

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

// Renders the content inside Main Content area of the AppShell
export function PageFrame({
  children,
  frameWidth = "large",
  variant = "panel",
  ...props
}: PageFrameProps) {
  const isFull = frameWidth === "full";
  const isPanel = variant === "panel";

  return (
    <StudyBox
      variant="plain"
      w="full"
      h="full"
      bg="appBg"
      px={isFull ? 0 : { base: 4, md: 6 }}
    >
      <StudyBox
        variant={isPanel ? "surface" : "plain"}
        w="full"
        h="full"
        maxW={isFull ? "none" : pageFrameWidths[frameWidth]}
        mx="auto"
        borderLeftWidth={isPanel ? "1px" : "0"}
        borderRightWidth={isPanel ? "1px" : "0"}
        borderColor={isPanel ? "borderStrong" : "transparent"}
        px={isPanel ? { base: 4, md: 6 } : 0}
        py={isPanel ? { base: 2, md: 6 } : 0}
        overflowY="auto"
        overflowX="hidden"
        {...props}
      >
        {children}
      </StudyBox>
    </StudyBox>
  );
}