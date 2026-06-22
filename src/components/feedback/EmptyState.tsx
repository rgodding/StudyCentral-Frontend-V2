import { Box, Stack, type BoxProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

import {
  StudyBox,
  StudyButton,
  StudyHeading,
  StudyText,
} from "@/components/ui";

type EmptyStateSize = "sm" | "md";

type EmptyStateProps = Omit<BoxProps, "title"> & {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  actionLabel?: ReactNode;
  onAction?: () => void;
  action?: ReactNode;
  size?: EmptyStateSize;
};

export function EmptyState({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  action,
  size = "md",
  ...props
}: EmptyStateProps) {
  const isSmall = size === "sm";

  return (
    <StudyBox
      variant="plain"
      w="full"
      rounded="card"
      borderWidth="1px"
      borderColor="borderSubtle"
      bg="surfaceBg"
      px={isSmall ? 4 : 6}
      py={isSmall ? 6 : 10}
      textAlign="center"
      {...props}
    >
      <Stack align="center" gap={isSmall ? 3 : 4}>
        {icon != null && (
          <Box color="textMuted" fontSize={isSmall ? "2xl" : "3xl"}>
            {icon}
          </Box>
        )}

        <Stack gap={1} align="center" maxW={isSmall ? "360px" : "420px"}>
          <StudyHeading variant="card" fontSize={isSmall ? "md" : undefined}>
            {title}
          </StudyHeading>

          {description != null && (
            <StudyText variant="muted" fontSize={isSmall ? "sm" : undefined}>
              {description}
            </StudyText>
          )}
        </Stack>

        {action ??
          (actionLabel != null && onAction ? (
            <StudyButton
              variant="secondary"
              size={isSmall ? "sm" : "md"}
              onClick={onAction}
            >
              {actionLabel}
            </StudyButton>
          ) : null)}
      </Stack>
    </StudyBox>
  );
}