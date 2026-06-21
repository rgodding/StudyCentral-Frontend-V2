import { Box, Stack, type BoxProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

import { StudyButton } from "@/components/ui/StudyButton";
import { StudyHeading } from "@/components/ui/StudyHeading";
import { StudyText } from "@/components/ui/StudyText";

type EmptyStateProps = Omit<BoxProps, "title"> & {
  title: string;
  description?: string;
  icon?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  action?: ReactNode;
};

export function EmptyState({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  action,
  ...props
}: EmptyStateProps) {
  return (
    <Box
      w="full"
      rounded="card"
      borderWidth="1px"
      borderColor="borderSubtle"
      bg="surfaceBg"
      px={6}
      py={10}
      textAlign="center"
      {...props}
    >
      <Stack align="center" gap={4}>
        {icon && (
          <Box color="textMuted" fontSize="3xl">
            {icon}
          </Box>
        )}

        <Stack gap={1} align="center" maxW="420px">
          <StudyHeading variant="card">{title}</StudyHeading>

          {description && <StudyText variant="muted">{description}</StudyText>}
        </Stack>

        {action ??
          (actionLabel && onAction ? (
            <StudyButton variant="secondary" onClick={onAction}>
              {actionLabel}
            </StudyButton>
          ) : null)}
      </Stack>
    </Box>
  );
}
