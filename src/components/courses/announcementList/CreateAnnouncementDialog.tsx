
import { CreateAnnouncementForm } from "@/components/forms/createAnnouncement";
import { StudyDialog, StudyDialogRoot } from "@/components/ui";
import type { Guid } from "@/types/api";

type CreateAnnouncementDialogProps = {
  courseId: Guid;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const createAnnouncementDialogText = {
  title: "Create announcement",
  description: "Create a new announcement for this course.",
  cancelLabel: "Cancel",
};

export function CreateAnnouncementDialog({
  courseId,
  open,
  onOpenChange,
}: CreateAnnouncementDialogProps) {
  return (
    <StudyDialogRoot
      open={open}
      onOpenChange={(details) => onOpenChange(details.open)}
    >
      <StudyDialog
        title={createAnnouncementDialogText.title}
        description={createAnnouncementDialogText.description}
        size="md"
        headerSeparator="belowTitle"
      >
        <CreateAnnouncementForm
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
