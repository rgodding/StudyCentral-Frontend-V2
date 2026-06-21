import { Box, Stack, type BoxProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

import { StudyButton } from "@/components/ui/StudyButton";
import { StudyHeading } from "@/components/ui/StudyHeading";
import { StudyText } from "@/components/ui/StudyText";
import { commonText } from "@/content";

type ErrorStateProps = Omit<BoxProps, "title"> & {
  title?: string;
  description?: string;
  retryLabel?: string;
  onRetry?: () => void;
  action?: ReactNode;
};

export function ErrorState({
  title = commonText.feedback.genericErrorTitle,
  description = commonText.feedback.genericErrorDescription,
  retryLabel = commonText.actions.tryAgain,
  onRetry,
  action,
  ...props
}: ErrorStateProps) {
  return (
    <Box
      w="full"
      rounded="card"
      borderWidth="1px"
      borderColor="red.200"
      bg="surfaceBg"
      px={6}
      py={10}
      textAlign="center"
      {...props}
    >
      <Stack align="center" gap={4}>
        <Stack gap={1} align="center" maxW="460px">
          <StudyHeading variant="card" color="dangerText">
            {title}
          </StudyHeading>

          {description && <StudyText variant="muted">{description}</StudyText>}
        </Stack>

        {action ??
          (onRetry ? (
            <StudyButton variant="danger" onClick={onRetry}>
              {retryLabel}
            </StudyButton>
          ) : null)}
      </Stack>
    </Box>
  );
}
