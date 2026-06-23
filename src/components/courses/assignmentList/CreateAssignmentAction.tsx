import { LuPlus } from "react-icons/lu";

import { StudyIconButton, StudyTooltip } from "@/components/ui";

type CreateAssignmentActionProps = {
  onClick: () => void;
};

const createAssignmentActionText = {
  label: "Create assignment",
};

export function CreateAssignmentAction({ onClick }: CreateAssignmentActionProps) {
  return (
    <StudyTooltip content={createAssignmentActionText.label}>
      <StudyIconButton
        aria-label={createAssignmentActionText.label}
        variant="primary"
        size="sm"
        onClick={onClick}
      >
        <LuPlus />
      </StudyIconButton>
    </StudyTooltip>
  );
}