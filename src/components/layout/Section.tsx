import { Stack, type StackProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

import {
  StudyBox,
  StudySectionHeader,
  type StudySectionHeaderTitleSize,
} from "@/components/ui";

type SectionVariant = "plain" | "card" | "subtle";

type SectionProps = StackProps & {
  title?: ReactNode;
  description?: ReactNode;
  headerIcon?: ReactNode;
  actions?: ReactNode;
  variant?: SectionVariant;
  titleSize?: StudySectionHeaderTitleSize;
  children: ReactNode;
};

const sectionVariantStyles: Record<
  Exclude<SectionVariant, "plain">,
  Parameters<typeof StudyBox>[0]
> = {
  card: {
    variant: "panel",
  },

  subtle: {
    variant: "subtle",
  },
};

export function Section({
  title,
  description,
  headerIcon,
  actions,
  variant = "plain",
  titleSize = "md",
  children,
  ...props
}: SectionProps) {
  const hasHeader =
    title != null ||
    description != null ||
    headerIcon != null ||
    actions != null;

  const content = (
    <Stack gap={4} h="full" minH={0} minW={0} {...props}>
      {hasHeader && (
        <StudySectionHeader
          title={title}
          description={description}
          icon={headerIcon}
          actions={actions}
          titleSize={titleSize}
        />
      )}

      {children}
    </Stack>
  );

  if (variant === "plain") {
    return content;
  }

  return (
    <StudyBox h="full" {...sectionVariantStyles[variant]}>
      {content}
    </StudyBox>
  );
}