
import { CreateAssignmentForm } from "@/components/forms/createAssignment";
import {
  StudyDialog,
  StudyDialogRoot
} from "@/components/ui";
import type { Guid } from "@/types/api";

type CreateAssignmentDialogProps = {
  courseId: Guid;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const createAssignmentDialogText = {
  title: "Create assignment",
  description: "Create a new assignment for this course.",
  cancelLabel: "Cancel",
};

export function CreateAssignmentDialog({
  courseId,
  open,
  onOpenChange,
}: CreateAssignmentDialogProps) {
  return (
    <StudyDialogRoot
      open={open}
      onOpenChange={(details) => onOpenChange(details.open)}
    >
      <StudyDialog
        title={createAssignmentDialogText.title}
        description={createAssignmentDialogText.description}
        size="md"
        headerSeparator="belowTitle"
      >
        <CreateAssignmentForm
          courseId={courseId}
          onSubmit={(values) => {
            console.log(values);
            onOpenChange(false);
          }}
        />
      </StudyDialog>
    </StudyDialogRoot>
  );
}