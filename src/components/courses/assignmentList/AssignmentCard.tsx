import { HStack, Stack } from "@chakra-ui/react";

import {
  StudyBadge,
  StudyCard,
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
};

const assignmentCardText = {
  untitled: "Untitled assignment",
};

export function AssignmentCard({
  assignment,
  statusMeta,
}: AssignmentCardProps) {
  return (
    <StudyCard size="sm">
      <Stack gap={2}>
        <HStack justify="space-between" align="start" gap={3}>
          <StudyHeading variant="card" fontSize="sm" lineClamp={2}>
            {assignment.name?.trim() || assignmentCardText.untitled}
          </StudyHeading>
        </HStack>

        <HStack align="center" justify="space-between" gap={4}>
          <StudyText variant="subtle">
            {formatAssignmentDeadline(assignment.deadline)}
          </StudyText>

          <StudyBadge variant={statusMeta.badgeVariant} flexShrink={0} size="xs">
            {statusMeta.label}
          </StudyBadge>
        </HStack>
      </Stack>
    </StudyCard>
  );
}