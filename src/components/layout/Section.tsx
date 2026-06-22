import { HStack, Stack, Text, type BoxProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

import { StudyBox, StudyHeading } from "@/components/ui";

type SectionProps = BoxProps & {
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
};

export function Section({
  title,
  description,
  actions,
  children,
  ...props
}: SectionProps) {
  const hasHeader = title || description || actions;

  return (
    <StudyBox
      variant="panel"
      p={{ base: 4, md: 5 }}
      {...props}
    >
      {hasHeader && (
        <HStack align="start" justify="space-between" gap={4} mb={4}>
          <Stack gap={1} minW={0}>
            {title && <StudyHeading size="sm">{title}</StudyHeading>}

            {description && (
              <Text color="textMuted" fontSize="sm">
                {description}
              </Text>
            )}
          </Stack>

          {actions && (
            <HStack gap={2} flexShrink={0}>
              {actions}
            </HStack>
          )}
        </HStack>
      )}

      {children}
    </StudyBox>
  );
}