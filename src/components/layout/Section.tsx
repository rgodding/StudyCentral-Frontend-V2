import { HStack, Stack, type BoxProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

import { StudyBox, StudyHeading, StudyText } from "@/components/ui";

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
  const hasHeader =
    title != null || description != null || actions != null;

  return (
    <StudyBox variant="panel" p={{ base: 4, md: 5 }} {...props}>
      {hasHeader && (
        <Stack
          direction={{ base: "column", md: "row" }}
          align={{ base: "stretch", md: "start" }}
          justify="space-between"
          gap={4}
          mb={4}
        >
          <Stack gap={1} minW={0}>
            {title != null && <StudyHeading size="sm">{title}</StudyHeading>}

            {description != null && (
              <StudyText color="textMuted" fontSize="sm">
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
      )}

      {children}
    </StudyBox>
  );
}