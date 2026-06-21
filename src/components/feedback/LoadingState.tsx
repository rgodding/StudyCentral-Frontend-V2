import { Box, Spinner, Stack, type BoxProps } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { StudyText } from "@/components/ui/StudyText";

type LoadingStateProps = BoxProps & {
  text?: string;
  fullHeight?: boolean;
};

export function LoadingState({
  text,
  fullHeight = false,
  ...props
}: LoadingStateProps) {
  const { t } = useTranslation();

  return (
    <Box
      w="full"
      minH={fullHeight ? "100vh" : "240px"}
      display="flex"
      alignItems="center"
      justifyContent="center"
      {...props}
    >
      <Stack align="center" gap={3}>
        <Spinner size="md" color="accent" />
        <StudyText variant="muted">
          {text ?? t("common.feedback.loading")}
        </StudyText>
      </Stack>
    </Box>
  );
}