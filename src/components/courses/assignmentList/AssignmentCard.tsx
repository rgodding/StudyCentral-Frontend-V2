import { HStack, Stack } from "@chakra-ui/react";

import {
  StudyActionCard,
  StudyBadge,
  StudyHeading,
  StudyText,
  type StudyBadgeVariant,
} from "@/components/ui";
import type { AssignmentDto } from "@/types/api";
import { formatAssignmentDeadline } from "@/utils/assignments";

type AssignmentCardStatusMeta = {
  label: string;
  badgeVariant: StudyBadgeVariant;
};

type AssignmentCardProps = {
  assignment: Pick<AssignmentDto, "name" | "deadline">;
  statusMeta: AssignmentCardStatusMeta;
  onClick: () => void;
};

const assignmentCardText = {
  untitled: "Untitled assignment",
};

export function AssignmentCard({
  assignment,
  statusMeta,
  onClick,
}: AssignmentCardProps) {
  return (
    <StudyActionCard onClick={onClick} p={3}>
      <Stack gap={2}>
        <StudyHeading variant="card" fontSize="sm" lineClamp={2}>
          {assignment.name?.trim() || assignmentCardText.untitled}
        </StudyHeading>

        <HStack align="center" justify="space-between" gap={4}>
          <StudyText variant="subtle" fontSize="xs">
            {formatAssignmentDeadline(assignment.deadline)}
          </StudyText>

          <StudyBadge
            variant={statusMeta.badgeVariant}
            size="xs"
            flexShrink={0}
          >
            {statusMeta.label}
          </StudyBadge>
        </HStack>
      </Stack>
    </StudyActionCard>
  );
}
