import { Flex, Stack, type FlexProps } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { IconContext } from "react-icons";

import { StudyHeading } from "./StudyHeading";
import { StudyText } from "./StudyText";

type StudySectionHeaderProps = Omit<FlexProps, "title"> & {
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  actions?: ReactNode;
};

export function StudySectionHeader({
  title,
  description,
  icon,
  actions,
  ...props
}: StudySectionHeaderProps) {
  return (
    <Flex align="start" justify="space-between" gap={4} minW={0} {...props}>
      <Flex align="center" gap={2} minW={0}>
        {icon != null && (
          <IconContext.Provider value={{ size: "20px" }}>
            {icon}
          </IconContext.Provider>
        )}

        <Stack gap={1} minW={0}>
          {title != null && (
            <StudyHeading variant="section" size="md">
              {title}
            </StudyHeading>
          )}

          {description != null && (
            <StudyText variant="muted" fontSize="sm">
              {description}
            </StudyText>
          )}
        </Stack>
      </Flex>

      {actions}
    </Flex>
  );
}