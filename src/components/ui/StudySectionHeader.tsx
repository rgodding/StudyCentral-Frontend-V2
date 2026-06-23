import { Flex, Stack, type FlexProps } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { IconContext } from "react-icons";

import { StudyHeading } from "./StudyHeading";
import { StudyText } from "./StudyText";

export type StudySectionHeaderTitleSize = "sm" | "md" | "lg" | "xl" | "header";

export type StudySectionHeaderProps = Omit<FlexProps, "title"> & {
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  actions?: ReactNode;
  titleSize?: StudySectionHeaderTitleSize;
};

type StudySectionHeaderTitleStyle = {
  headingVariant: "card" | "section" | "page";
  headingSize: "sm" | "md" | "lg" | "xl";
  iconSize: string;
};

const titleSizeStyles: Record<
  StudySectionHeaderTitleSize,
  StudySectionHeaderTitleStyle
> = {
  sm: {
    headingVariant: "card",
    headingSize: "sm",
    iconSize: "18px",
  },

  md: {
    headingVariant: "section",
    headingSize: "md",
    iconSize: "20px",
  },

  lg: {
    headingVariant: "section",
    headingSize: "lg",
    iconSize: "22px",
  },

  xl: {
    headingVariant: "section",
    headingSize: "xl",
    iconSize: "24px",
  },

  header: {
    headingVariant: "section",
    headingSize: "xl",
    iconSize: "36px",
  },
};
export function StudySectionHeader({
  title,
  description,
  icon,
  actions,
  titleSize = "md",
  ...props
}: StudySectionHeaderProps) {
  const titleStyle = titleSizeStyles[titleSize];

  return (
    <Flex align="center" justify="space-between" gap={4} minW={0} {...props}>
      <Flex align="center" gap={2} minW={0} flex="1">
        {icon != null && (
          <IconContext.Provider value={{ size: titleStyle.iconSize }}>
            {icon}
          </IconContext.Provider>
        )}

        <Stack gap={0} minW={0}>
          {title != null && (
            <StudyHeading
              variant={titleStyle.headingVariant}
              size={titleStyle.headingSize}
              lineHeight="1.15"
            >
              {title}
            </StudyHeading>
          )}

          {description != null && (
            <StudyText variant="muted" fontSize="sm" lineHeight="1.3">
              {description}
            </StudyText>
          )}
        </Stack>
      </Flex>

      {actions != null && (
        <Flex align="center" flexShrink={0}>
          {actions}
        </Flex>
      )}
    </Flex>
  );
}