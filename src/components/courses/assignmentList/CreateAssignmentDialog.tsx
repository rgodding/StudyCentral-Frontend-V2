import { CreateAssignmentForm } from "@/components/forms/createAssignment";
import { StudyDialog } from "@/components/ui";
import type { Guid } from "@/types/api";

type CreateAssignmentDialogProps = {
  courseId: Guid;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => Promise<void> | void;
};

const createAssignmentDialogText = {
  title: "Create assignment",
  description: "Create a new assignment for this course.",
};

export function CreateAssignmentDialog({
  courseId,
  open,
  onOpenChange,
  onSuccess,
}: CreateAssignmentDialogProps) {
  return (
    <StudyDialog
      open={open}
      onOpenChange={(details) => onOpenChange(details.open)}
      title={createAssignmentDialogText.title}
      description={createAssignmentDialogText.description}
      size="md"
      headerSeparator="belowTitle"
    >
      <CreateAssignmentForm
        courseId={courseId}
        onSuccess={async () => {
          onOpenChange(false);
          await onSuccess?.();
        }}
      />
    </StudyDialog>
  );
}