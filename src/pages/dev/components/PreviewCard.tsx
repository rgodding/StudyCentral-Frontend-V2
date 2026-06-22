import { HStack, Stack, type BoxProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

import { StudyBadge, StudyCard, StudyHeading, StudyText } from "@/components/ui";

export type PreviewCardProps = BoxProps & {
  title: string;
  description?: string;
  tokenPath?: string;
  children: ReactNode;
};

export function PreviewCard({
  title,
  description,
  tokenPath,
  children,
  ...props
}: PreviewCardProps) {
  return (
    <StudyCard variant="default" size="md" {...props}>
      <Stack gap={4}>
        <HStack justify="space-between" align="start" gap={4}>
          <Stack gap={1} minW={0}>
            <StudyHeading variant="card">{title}</StudyHeading>

            {description && (
              <StudyText variant="muted" size="sm">
                {description}
              </StudyText>
            )}
          </Stack>

          {tokenPath && (
            <StudyBadge variant="accent" size="sm">
              {tokenPath}
            </StudyBadge>
          )}
        </HStack>

        {children}
      </Stack>
    </StudyCard>
  );
}