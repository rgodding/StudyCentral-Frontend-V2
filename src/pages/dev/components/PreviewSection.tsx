import { Stack, type BoxProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

import { StudyBox, StudyHeading, StudyText } from "@/components/ui";

export type PreviewSectionProps = BoxProps & {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
};

export function PreviewSection({
  id,
  title,
  description,
  children,
  ...props
}: PreviewSectionProps) {
  return (
    <StudyBox
      as="section"
      id={id}
      variant="plain"
      scrollMarginTop="32px"
      {...props}
    >
      <Stack gap={4}>
        <Stack gap={1}>
          <StudyHeading variant="section">{title}</StudyHeading>

          {description && (
            <StudyText variant="muted" maxW="3xl">
              {description}
            </StudyText>
          )}
        </Stack>

        {children}
      </Stack>
    </StudyBox>
  );
}