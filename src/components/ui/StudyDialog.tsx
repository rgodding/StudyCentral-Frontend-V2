import { Dialog, Portal, type BoxProps } from "@chakra-ui/react";
import type { ComponentProps, ReactNode } from "react";
import { LuX } from "react-icons/lu";

import { StudyDivider } from "./StudyDivider";
import { StudyIconButton } from "./StudyIconButton";
import { StudyText } from "./StudyText";

export type StudyDialogVariant = "default" | "danger";
export type StudyDialogSize = "sm" | "md" | "lg" | "xl";
export type StudyDialogAnimation = "none" | "scaleInFast" | "slideInFromBottom";
export type StudyDialogSeparator = "none" | "bottom" | "belowTitle";

export type StudyDialogRootProps = Omit<
  ComponentProps<typeof Dialog.Root>,
  "children" | "size"
> & {
  children: ReactNode;
};

export type StudyDialogTriggerProps = {
  children: ReactNode;
};

export type StudyDialogProps = {
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  variant?: StudyDialogVariant;
  size?: StudyDialogSize;
  animationVariant?: StudyDialogAnimation;
  showCloseButton?: boolean;
  closeLabel?: string;
  headerSeparator?: StudyDialogSeparator;
  contentProps?: BoxProps;
};

const sizeStyles: Record<StudyDialogSize, BoxProps> = {
  sm: { maxW: "420px" },
  md: { maxW: "560px" },
  lg: { maxW: "720px" },
  xl: { maxW: "920px" },
};

const variantStyles: Record<StudyDialogVariant, BoxProps> = {
  default: { borderColor: "borderStrong" },
  danger: { borderColor: "red.200" },
};

const animationStyles: Record<StudyDialogAnimation, BoxProps> = {
  none: {
    animation: "none",
  },

  scaleInFast: {
    animation: "scaleInFast",
    transformOrigin: "center",
  },

  slideInFromBottom: {
    animation: "slideInFromBottom",
    transformOrigin: "bottom",
  },
};

export function StudyDialogRoot({
  children,
  ...rootProps
}: StudyDialogRootProps) {
  return <Dialog.Root {...rootProps}>{children}</Dialog.Root>;
}

export function StudyDialogTrigger({ children }: StudyDialogTriggerProps) {
  return <Dialog.Trigger asChild>{children}</Dialog.Trigger>;
}

export function StudyDialog({
  title,
  description,
  children,
  footer,
  variant = "default",
  size = "md",
  animationVariant = "scaleInFast",
  showCloseButton = true,
  closeLabel = "Close dialog",
  headerSeparator = "none",
  contentProps,
}: StudyDialogProps) {
  const hasBottomHeaderSeparator = headerSeparator === "bottom";
  const hasBelowTitleSeparator = headerSeparator === "belowTitle";

  return (
    <Portal>
      <Dialog.Backdrop
        bg="blackAlpha.600"
        animation="none"
        transitionDuration="0ms"
      />

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
            pt={4}
            pb={hasBelowTitleSeparator ? 0 : 4}
            borderBottomWidth={hasBottomHeaderSeparator ? "1px" : "0"}
            borderColor="borderSubtle"
          >
            <div style={{ width: "100%" }}>
              <Dialog.Title
                fontSize="lg"
                fontWeight="semibold"
                lineHeight="1.3"
              >
                {title}
              </Dialog.Title>

              {hasBelowTitleSeparator && (
                <StudyDivider mt={3} borderColor="borderStrong" />
              )}

              {description && (
                <Dialog.Description asChild>
                  <StudyText variant="muted" mt={2}>
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

          <Dialog.Body px={5} pt={hasBelowTitleSeparator ? 4 : 5} pb={5}>
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
  );
}