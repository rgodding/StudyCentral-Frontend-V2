import { StudyDialog } from "@/components/ui";
import type { Guid } from "@/types/api";

import { UploadResourceFilesForm } from "./UploadResourceFilesForm";

type UploadResourceFilesDialogProps = {
  folderId: Guid | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => Promise<void> | void;
};

const uploadResourceFilesDialogText = {
  title: "Add files",
  description: "Upload files to the current folder.",
};

export function UploadResourceFilesDialog({
  folderId,
  open,
  onOpenChange,
  onSuccess,
}: UploadResourceFilesDialogProps) {
  return (
    <StudyDialog
      open={open}
      onOpenChange={(details) => onOpenChange(details.open)}
      title={uploadResourceFilesDialogText.title}
      description={uploadResourceFilesDialogText.description}
      size="md"
      headerSeparator="belowTitle"
    >
      <UploadResourceFilesForm
        folderId={folderId}
        onSuccess={async () => {
          onOpenChange(false);
          await onSuccess?.();
        }}
      />
    </StudyDialog>
  );
}