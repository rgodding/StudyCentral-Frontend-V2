import { HStack, Stack, Text, type BoxProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

import { StudyBox, StudyHeading } from "@/components/ui";

type PageHeaderProps = BoxProps & {
  title: ReactNode;
  description?: ReactNode;
  eyebrow?: ReactNode;
  actions?: ReactNode;
};

export function PageHeader({
  title,
  description,
  eyebrow,
  actions,
  ...props
}: PageHeaderProps) {
  return (
    <StudyBox variant="plain" mb={{ base: 6, md: 8 }} {...props}>
      <HStack align="start" justify="space-between" gap={4}>
        <Stack gap={2} minW={0}>
          {eyebrow && (
            <Text
              fontSize="xs"
              fontWeight="semibold"
              color="textSubtle"
              textTransform="uppercase"
              letterSpacing="wide"
            >
              {eyebrow}
            </Text>
          )}

          <StudyHeading size="lg">{title}</StudyHeading>

          {description && (
            <Text color="textMuted" maxW="3xl">
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
    </StudyBox>
  );
}