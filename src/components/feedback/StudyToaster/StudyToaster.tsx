import { HStack, Icon, Portal, Stack, Toast, Toaster } from "@chakra-ui/react";
import { LuX } from "react-icons/lu";

import { StudyIconButton } from "@/components/ui/StudyIconButton";
import { StudyText } from "@/components/ui/StudyText";
import { getToastIcon } from "@/utils/toasterUtils";
import { studyToaster } from "./studyToasterInstance";

const toastStyles = {
  success: {
    bg: "green.100",
    borderColor: "green.300",
    color: "green.900",
    iconColor: "green.700",
    closeHoverBg: "green.200",
  },
  error: {
    bg: "red.100",
    borderColor: "red.300",
    color: "red.900",
    iconColor: "red.700",
    closeHoverBg: "red.200",
  },
  warning: {
    bg: "yellow.100",
    borderColor: "yellow.300",
    color: "yellow.900",
    iconColor: "yellow.700",
    closeHoverBg: "yellow.200",
  },
  info: {
    bg: "blue.100",
    borderColor: "blue.300",
    color: "blue.900",
    iconColor: "blue.700",
    closeHoverBg: "blue.200",
  },
} as const;

type ToastType = keyof typeof toastStyles;

function isToastType(type?: string): type is ToastType {
  return (
    type === "success" ||
    type === "error" ||
    type === "warning" ||
    type === "info"
  );
}

function getToastStyle(type?: string) {
  if (isToastType(type)) {
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
              w="360px"
              maxW="calc(100vw - 32px)"
              rounded="card"
              borderWidth="1px"
              borderColor={styles.borderColor}
              bg={styles.bg}
              color={styles.color}
              shadow="overlay"
              userSelect="none"
            >
              <HStack align="start" gap={3} p={4}>
                <ToastIndicator type={toast.type} />

                <Stack gap={1} flex="1" minW={0}>
                  {toast.title && (
                    <Toast.Title asChild>
                      <StudyText
                        variant="label"
                        color={styles.color}
                        truncate
                      >
                        {toast.title}
                      </StudyText>
                    </Toast.Title>
                  )}

                  {toast.description && (
                    <Toast.Description asChild>
                      <StudyText
                        variant="body"
                        color={styles.color}
                        opacity={0.85}
                        lineClamp={3}
                      >
                        {toast.description}
                      </StudyText>
                    </Toast.Description>
                  )}
                </Stack>

                {toast.closable && (
                  <Toast.CloseTrigger asChild>
                    <StudyIconButton
                      aria-label="Close notification"
                      variant="ghost"
                      size="xs"
                      color={styles.iconColor}
                      flexShrink={0}
                      _hover={{
                        color: styles.color,
                        bg: styles.closeHoverBg,
                        borderColor: styles.iconColor,
                      }}
                      _active={{
                        bg: styles.closeHoverBg,
                        borderColor: styles.iconColor,
                      }}
                    >
                      <LuX />
                    </StudyIconButton>
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
  const ToastIcon = getToastIcon(type);

  return (
    <Icon
      as={ToastIcon}
      mt={0.5}
      boxSize="18px"
      color={styles.iconColor}
      flexShrink={0}
    />
  );
}