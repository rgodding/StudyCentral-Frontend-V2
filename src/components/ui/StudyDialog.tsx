import { Dialog, Portal, type BoxProps } from "@chakra-ui/react";
import type { ComponentProps, ReactNode } from "react";
import { LuX } from "react-icons/lu";

import { StudyIconButton } from "./StudyIconButton";
import { StudyText } from "./StudyText";

export type StudyDialogVariant = "default" | "danger";
export type StudyDialogSize = "sm" | "md" | "lg" | "xl";
export type StudyDialogAnimation = "none" | "scaleInFast" | "slideInFromBottom";

export type StudyDialogProps = Omit<
  ComponentProps<typeof Dialog.Root>,
  "children" | "size"
> & {
  trigger?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  variant?: StudyDialogVariant;
  size?: StudyDialogSize;
  animationVariant?: StudyDialogAnimation;
  showCloseButton?: boolean;
  closeLabel?: string;
  contentProps?: BoxProps;
};

const sizeStyles: Record<StudyDialogSize, BoxProps> = {
  sm: {
    maxW: "420px",
  },

  md: {
    maxW: "560px",
  },

  lg: {
    maxW: "720px",
  },

  xl: {
    maxW: "920px",
  },
};

const variantStyles: Record<StudyDialogVariant, BoxProps> = {
  default: {
    borderColor: "borderStrong",
  },

  danger: {
    borderColor: "red.200",
  },
};

const animationStyles: Record<StudyDialogAnimation, BoxProps> = {
  none: {},

  scaleInFast: {
    animation: "scaleInFast",
    transformOrigin: "center",
  },

  slideInFromBottom: {
    animation: "slideInFromBottom",
    transformOrigin: "bottom",
  },
};

export function StudyDialog({
  trigger,
  title,
  description,
  children,
  footer,
  variant = "default",
  size = "md",
  animationVariant = "scaleInFast",
  showCloseButton = true,
  closeLabel = "Close dialog",
  contentProps,
  ...rootProps
}: StudyDialogProps) {
  return (
    <Dialog.Root {...rootProps}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}

      <Portal>
        <Dialog.Backdrop bg="blackAlpha.600" />

        <Dialog.Positioner px={4}>
          <Dialog.Content
            w="full"
            bg="surfaceBg"
            color="textMain"
            rounded="card"
            borderWidth="1px"
            shadow="panel"
            overflow="hidden"
            {...sizeStyles[size]}
            {...variantStyles[variant]}
            {...animationStyles[animationVariant]}
            {...contentProps}
          >
            <Dialog.Header
              display="flex"
              alignItems="start"
              justifyContent="space-between"
              gap={4}
              px={5}
              py={4}
              borderBottomWidth="1px"
              borderColor="borderSubtle"
            >
              <div>
                <Dialog.Title
                  fontSize="lg"
                  fontWeight="semibold"
                  lineHeight="1.3"
                >
                  {title}
                </Dialog.Title>

                {description && (
                  <Dialog.Description asChild>
                    <StudyText variant="muted" mt={1}>
                      {description}
                    </StudyText>
                  </Dialog.Description>
                )}
              </div>

              {showCloseButton && (
                <Dialog.CloseTrigger asChild>
                  <StudyIconButton
                    aria-label={closeLabel}
                    variant="ghost"
                    size="sm"
                    flexShrink={0}
                  >
                    <LuX />
                  </StudyIconButton>
                </Dialog.CloseTrigger>
              )}
            </Dialog.Header>

            <Dialog.Body px={5} py={5}>
              {children}
            </Dialog.Body>

            {footer && (
              <Dialog.Footer
                px={5}
                py={4}
                borderTopWidth="1px"
                borderColor="borderSubtle"
              >
                {footer}
              </Dialog.Footer>
            )}
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
