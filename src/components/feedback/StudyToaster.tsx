import {
  Box,
  CloseButton,
  HStack,
  Portal,
  Stack,
  Toast,
  Toaster,
} from "@chakra-ui/react";

import { studyToaster } from "@/components/feedback/studyToasterInstance";
import { StudyText } from "@/components/ui/StudyText";
import {
  getToastBackgroundColor,
  getToastBorderColor,
  getToastIcon,
  getToastIndicatorColor,
} from "@/utils/toasterUtils";

export function StudyToaster() {
  return (
    <Portal>
      <Toaster toaster={studyToaster}>
        {(toast) => (
          <Toast.Root
            width="360px"
            rounded="card"
            borderWidth="1px"
            borderColor={getToastBorderColor(toast.type)}
            bg={getToastBackgroundColor(toast.type)}
            color="textMain"
            shadow="floating"
            userSelect="none"
          >
            <HStack align="start" gap={3} p={4}>
              <ToastIndicator type={toast.type} />

              <Stack gap={1} flex="1" minW={0}>
                {toast.title && (
                  <Toast.Title asChild>
                    <StudyText variant="label" truncate>
                      {toast.title}
                    </StudyText>
                  </Toast.Title>
                )}

                {toast.description && (
                  <Toast.Description asChild>
                    <StudyText variant="muted" lineClamp={3}>
                      {toast.description}
                    </StudyText>
                  </Toast.Description>
                )}
              </Stack>

              {toast.closable && (
                <Toast.CloseTrigger asChild>
                  <CloseButton
                    size="sm"
                    rounded="button"
                    color="textMuted"
                    bg="transparent"
                    borderWidth="1px"
                    borderColor="transparent"
                    transitionProperty="colors, border-color, background-color"
                    transitionDuration="normal"
                    _hover={{
                      color: "textMain",
                      bg: "blackAlpha.100",
                      borderColor: "blackAlpha.300",
                    }}
                    _active={{
                      bg: "blackAlpha.200",
                      borderColor: "blackAlpha.400",
                    }}
                  />
                </Toast.CloseTrigger>
              )}
            </HStack>
          </Toast.Root>
        )}
      </Toaster>
    </Portal>
  );
}

type ToastIndicatorProps = {
  type?: string;
};

function ToastIndicator({ type }: ToastIndicatorProps) {
  const color = getToastIndicatorColor(type);
  const Icon = getToastIcon(type);

  return <Box as={Icon} mt={0.5} boxSize="18px" color={color} flexShrink={0} />;
}
