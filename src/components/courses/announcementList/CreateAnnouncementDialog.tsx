import { CreateAnnouncementForm } from "@/components/forms/createAnnouncement";
import { StudyDialog } from "@/components/ui";
import type { Guid } from "@/types/api";

type CreateAnnouncementDialogProps = {
  courseId: Guid;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const createAnnouncementDialogText = {
  title: "Create announcement",
  description: "Create a new announcement for this course.",
};

export function CreateAnnouncementDialog({
  courseId,
  open,
  onOpenChange,
}: CreateAnnouncementDialogProps) {
  return (
    <StudyDialog
      open={open}
      onOpenChange={(details) => onOpenChange(details.open)}
      title={createAnnouncementDialogText.title}
      description={createAnnouncementDialogText.description}
      size="md"
      headerSeparator="belowTitle"
    >
      <CreateAnnouncementForm
        courseId={courseId}
        onSuccess={() => {
          onOpenChange(false);
        }}
      />
    </StudyDialog>
  );
}
