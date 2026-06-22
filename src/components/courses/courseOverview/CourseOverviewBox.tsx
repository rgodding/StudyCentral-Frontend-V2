import { Stack, type StackProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

import { StudyCard, StudyHeading } from "@/components/ui";

type CourseOverviewBoxProps = StackProps & {
  title: string;
  children: ReactNode;
};

export function CourseOverviewBox({
  title,
  children,
  ...props
}: CourseOverviewBoxProps) {
  return (
    <StudyCard h="full">
      <Stack gap={4} h="full" minH={0} {...props}>
        <StudyHeading variant="section">{title}</StudyHeading>

        {children}
      </Stack>
    </StudyCard>
  );
}