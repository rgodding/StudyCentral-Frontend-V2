import { Box, HStack, Stack, Text, type BoxProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

import { StudyHeading } from "@/components/ui/StudyHeading";

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
    <Box
      bg="panelBg"
      borderWidth="1px"
      borderColor="borderSubtle"
      rounded="card"
      shadow="card"
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
            <HStack flexShrink={0}>
              {actions}
            </HStack>
          )}
        </HStack>
      )}

      {children}
    </Box>
  );
}
