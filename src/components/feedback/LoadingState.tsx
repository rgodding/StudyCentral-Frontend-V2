import { Box, Spinner, Stack, type BoxProps } from "@chakra-ui/react";

import { StudyText } from "@/components/ui/StudyText";
import { commonText } from "@/content";

type LoadingStateProps = BoxProps & {
  text?: string;
  fullHeight?: boolean;
};

export function LoadingState({
  text = commonText.feedback.loading,
  fullHeight = false,
  ...props
}: LoadingStateProps) {
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
        <StudyText variant="muted">{text}</StudyText>
      </Stack>
    </Box>
  );
}