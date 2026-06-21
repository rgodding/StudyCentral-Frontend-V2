import {
  Box,
  CloseButton,
  HStack,
  Portal,
  Stack,
  Toast,
  Toaster,
} from "@chakra-ui/react";

import { StudyText } from "@/components/ui/StudyText";
import { getToastIcon } from "@/utils/toasterUtils";
import { studyToaster } from "./studyToasterInstance";

const toastStyles = {
  success: {
    bg: "green.100",
    borderColor: "green.300",
    color: "green.900",
    iconColor: "green.700",
    closeColor: "green.700",
    closeHoverBg: "green.200",
  },
  error: {
    bg: "red.100",
    borderColor: "red.300",
    color: "red.900",
    iconColor: "red.700",
    closeColor: "red.700",
    closeHoverBg: "red.200",
  },
  warning: {
    bg: "yellow.100",
    borderColor: "yellow.300",
    color: "yellow.900",
    iconColor: "yellow.700",
    closeColor: "yellow.700",
    closeHoverBg: "yellow.200",
  },
  info: {
    bg: "blue.100",
    borderColor: "blue.300",
    color: "blue.900",
    iconColor: "blue.700",
    closeColor: "blue.700",
    closeHoverBg: "blue.200",
  },
} as const;

function getToastStyle(type?: string) {
  if (type === "success" || type === "error" || type === "warning" || type === "info") {
    return toastStyles[type];
  }

  return toastStyles.info;
}

export function StudyToaster() {
  return (
    <Portal>
      <Toaster toaster={studyToaster}>
        {(toast) => {
          const styles = getToastStyle(toast.type);

          return (
            <Toast.Root
              width="360px"
              rounded="card"
              borderWidth="1px"
              borderColor={styles.borderColor}
              bg={styles.bg}
              color={styles.color}
              shadow="floating"
              userSelect="none"
            >
              <HStack align="start" gap={3} p={4}>
                <ToastIndicator type={toast.type} />

                <Stack gap={1} flex="1" minW={0}>
                  {toast.title && (
                    <Toast.Title asChild>
                      <StudyText
                        fontWeight="semibold"
                        color={styles.color}
                        truncate
                      >
                        {toast.title}
                      </StudyText>
                    </Toast.Title>
                  )}

                  {toast.description && (
                    <Toast.Description asChild>
                      <StudyText color={styles.color} opacity={0.85} lineClamp={3}>
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
                      color={styles.closeColor}
                      bg="transparent"
                      borderWidth="1px"
                      borderColor="transparent"
                      transitionProperty="colors, border-color, background-color"
                      transitionDuration="normal"
                      _hover={{
                        color: styles.color,
                        bg: styles.closeHoverBg,
                        borderColor: styles.closeColor,
                      }}
                      _active={{
                        bg: styles.closeHoverBg,
                        borderColor: styles.closeColor,
                      }}
                    />
                  </Toast.CloseTrigger>
                )}
              </HStack>
            </Toast.Root>
          );
        }}
      </Toaster>
    </Portal>
  );
}

type ToastIndicatorProps = {
  type?: string;
};

function ToastIndicator({ type }: ToastIndicatorProps) {
  const styles = getToastStyle(type);
  const Icon = getToastIcon(type);

  return (
    <Box
      as={Icon}
      mt={0.5}
      boxSize="18px"
      color={styles.iconColor}
      flexShrink={0}
    />
  );
}