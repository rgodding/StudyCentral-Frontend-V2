import { Box, Stack, type BoxProps } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { StudyButton } from "@/components/ui/StudyButton";
import { StudyHeading } from "@/components/ui/StudyHeading";
import { StudyText } from "@/components/ui/StudyText";

type ErrorStateProps = Omit<BoxProps, "title"> & {
  title?: string;
  description?: string;
  retryLabel?: string;
  onRetry?: () => void;
  action?: ReactNode;
};

export function ErrorState({
  title,
  description,
  retryLabel,
  onRetry,
  action,
  ...props
}: ErrorStateProps) {
  const { t } = useTranslation();

  const resolvedTitle = title ?? t("common.feedback.genericErrorTitle");
  const resolvedDescription =
    description ?? t("common.feedback.genericErrorDescription");
  const resolvedRetryLabel = retryLabel ?? t("common.actions.tryAgain");

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
            {resolvedTitle}
          </StudyHeading>

          {resolvedDescription && (
            <StudyText variant="muted">{resolvedDescription}</StudyText>
          )}
        </Stack>

        {action ??
          (onRetry ? (
            <StudyButton variant="danger" onClick={onRetry}>
              {resolvedRetryLabel}
            </StudyButton>
          ) : null)}
      </Stack>
    </Box>
  );
}