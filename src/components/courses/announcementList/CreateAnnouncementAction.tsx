import { LuPlus } from "react-icons/lu";

import { StudyIconButton, StudyTooltip } from "@/components/ui";

type CreateAnnouncementActionProps = {
  onClick: () => void;
};

const createAnnouncementActionText = {
  label: "Create announcement",
};

export function CreateAnnouncementAction({
  onClick,
}: CreateAnnouncementActionProps) {
  return (
    <StudyTooltip content={createAnnouncementActionText.label}>
      <StudyIconButton
        aria-label={createAnnouncementActionText.label}
        variant="primary"
        size="sm"
        onClick={onClick}
      >
        <LuPlus />
      </StudyIconButton>
    </StudyTooltip>
  );
}