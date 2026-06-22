import { Stack, type BoxProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

import {
  StudyBox,
  StudyButton,
  StudyHeading,
  StudyText,
} from "@/components/ui";

type ErrorStateSize = "sm" | "md";

type ErrorStateProps = Omit<BoxProps, "title"> & {
  title?: ReactNode;
  description?: ReactNode;
  retryLabel?: ReactNode;
  onRetry?: () => void;
  action?: ReactNode;
  size?: ErrorStateSize;
};

const errorStateText = {
  title: "Something went wrong",
  description: "The requested data could not be loaded.",
  retryLabel: "Try again",
};

export function ErrorState({
  title = errorStateText.title,
  description = errorStateText.description,
  retryLabel = errorStateText.retryLabel,
  onRetry,
  action,
  size = "md",
  ...props
}: ErrorStateProps) {
  const isSmall = size === "sm";

  return (
    <StudyBox
      variant="plain"
      w="full"
      rounded="card"
      borderWidth="1px"
      borderColor="red.200"
      bg="surfaceBg"
      px={isSmall ? 4 : 6}
      py={isSmall ? 6 : 10}
      textAlign="center"
      {...props}
    >
      <Stack align="center" gap={isSmall ? 3 : 4}>
        <Stack gap={1} align="center" maxW={isSmall ? "360px" : "460px"}>
          <StudyHeading
            variant="card"
            color="dangerText"
            fontSize={isSmall ? "md" : undefined}
          >
            {title}
          </StudyHeading>

          {description != null && (
            <StudyText variant="muted" fontSize={isSmall ? "sm" : undefined}>
              {description}
            </StudyText>
          )}
        </Stack>

        {action ??
          (onRetry ? (
            <StudyButton
              variant="danger"
              size={isSmall ? "sm" : "md"}
              onClick={onRetry}
            >
              {retryLabel}
            </StudyButton>
          ) : null)}
      </Stack>
    </StudyBox>
  );
}