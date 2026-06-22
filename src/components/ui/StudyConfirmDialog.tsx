import { Dialog } from "@chakra-ui/react";
import type { ReactNode } from "react";

import { StudyButton } from "./StudyButton";
import { StudyDialog, type StudyDialogProps } from "./StudyDialog";

export type StudyConfirmDialogVariant = "danger" | "default";

export type StudyConfirmDialogProps = Omit<
  StudyDialogProps,
  "children" | "footer" | "variant"
> & {
  children?: ReactNode;
  variant?: StudyConfirmDialogVariant;
  confirmLabel?: string;
  cancelLabel?: string;
  isConfirming?: boolean;
  onConfirm: () => void | Promise<void>;
};

export function StudyConfirmDialog({
  children,
  variant = "danger",
  confirmLabel,
  cancelLabel = "Cancel",
  isConfirming = false,
  onConfirm,
  showCloseButton = true,
  ...props
}: StudyConfirmDialogProps) {
  const resolvedConfirmLabel =
    confirmLabel ?? (variant === "danger" ? "Delete" : "Confirm");

  return (
    <StudyDialog
      variant={variant === "danger" ? "danger" : "default"}
      size="sm"
      showCloseButton={showCloseButton}
      footer={
        <>
          <Dialog.CloseTrigger asChild>
            <StudyButton variant="secondary" size="sm">
              {cancelLabel}
            </StudyButton>
          </Dialog.CloseTrigger>

          <StudyButton
            variant={variant === "danger" ? "danger" : "primary"}
            size="sm"
            loading={isConfirming}
            onClick={onConfirm}
          >
            {resolvedConfirmLabel}
          </StudyButton>
        </>
      }
      {...props}
    >
      {children}
    </StudyDialog>
  );
}