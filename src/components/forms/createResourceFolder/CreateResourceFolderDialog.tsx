import { StudyDialog } from "@/components/ui";
import type { Guid } from "@/types/api";

import { CreateResourceFolderForm } from "./CreateResourceFolderForm";

type CreateResourceFolderDialogProps = {
  courseId: Guid;
  parentFolderId: Guid | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => Promise<void> | void;
};

const createResourceFolderDialogText = {
  title: "Create folder",
  description: "Create a new folder in the current location.",
};

export function CreateResourceFolderDialog({
  courseId,
  parentFolderId,
  open,
  onOpenChange,
  onSuccess,
}: CreateResourceFolderDialogProps) {
  return (
    <StudyDialog
      open={open}
      onOpenChange={(details) => onOpenChange(details.open)}
      title={createResourceFolderDialogText.title}
      description={createResourceFolderDialogText.description}
      size="md"
      headerSeparator="belowTitle"
    >
      <CreateResourceFolderForm
        courseId={courseId}
        parentFolderId={parentFolderId}
        onSuccess={async () => {
          onOpenChange(false);
          await onSuccess?.();
        }}
      />
    </StudyDialog>
  );
}