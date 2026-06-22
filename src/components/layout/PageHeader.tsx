import { HStack, Stack, type BoxProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

import { StudyBox, StudyHeading, StudyText } from "@/components/ui";

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
      <Stack
        direction={{ base: "column", md: "row" }}
        align={{ base: "stretch", md: "start" }}
        justify="space-between"
        gap={4}
      >
        <Stack gap={2} minW={0}>
          {eyebrow != null && (
            <StudyText
              fontSize="xs"
              fontWeight="semibold"
              color="textSubtle"
              textTransform="uppercase"
              letterSpacing="wide"
            >
              {eyebrow}
            </StudyText>
          )}

          <StudyHeading size="lg">{title}</StudyHeading>

          {description != null && (
            <StudyText color="textMuted" maxW="3xl">
              {description}
            </StudyText>
          )}
        </Stack>

        {actions != null && (
          <HStack gap={2} flexShrink={0}>
            {actions}
          </HStack>
        )}
      </Stack>
    </StudyBox>
  );
}