import { HStack, type StackProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

import { StudyBox, StudyText } from "@/components/ui";
import { SubNavbarItem } from "./SubNavbarItem";

export type SubNavbarNavigationItem = {
  label: ReactNode;
  to: string;
  exact?: boolean;
};

export type SubNavbarProps = Omit<StackProps, "children"> & {
  items: SubNavbarNavigationItem[];
  title?: ReactNode;
};

export function SubNavbar({ items, title, ...props }: SubNavbarProps) {
  return (
    <HStack
      as="nav"
      h="full"
      px={3}
      gap={3}
      overflowX="auto"
      overflowY="hidden"
      bg="navBg"
      {...props}
    >
      {title && (
        <>
          <StudyText
            variant="label"
            color="textMain"
            whiteSpace="nowrap"
            maxW="240px"
            truncate
          >
            {title}
          </StudyText>

          <StudyBox
            aria-hidden
            variant="plain"
            h="24px"
            w="1px"
            bg="borderStrong"
            flexShrink={0}
          />
        </>
      )}

      <HStack h="full" gap={1} flexShrink={0}>
        {items.map((item) => (
          <SubNavbarItem
            key={item.to}
            label={item.label}
            to={item.to}
            exact={item.exact}
          />
        ))}
      </HStack>
    </HStack>
  );
}