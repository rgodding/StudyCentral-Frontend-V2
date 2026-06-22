import { Collapsible, HStack, Stack, type StackProps } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { LuChevronRight } from "react-icons/lu";

import { StudyBadge } from "./StudyBadge";
import { StudyText } from "./StudyText";

export type StudyCollapseVariant = "plain" | "panel" | "subtle";
export type StudyCollapseSize = "sm" | "md";

type StudyCollapseProps = StackProps & {
  label: ReactNode;
  count?: number;
  defaultOpen?: boolean;
  variant?: StudyCollapseVariant;
  size?: StudyCollapseSize;
  children: ReactNode;
};

const variantStyles: Record<StudyCollapseVariant, StackProps> = {
  plain: {},

  panel: {
    borderWidth: "1px",
    borderColor: "borderSubtle",
    rounded: "card",
    bg: "panelBg",
    p: 3,
  },

  subtle: {
    borderWidth: "1px",
    borderColor: "borderSubtle",
    rounded: "card",
    bg: "panelBgSubtle",
    p: 3,
  },
};

const triggerSizeStyles: Record<StudyCollapseSize, StackProps> = {
  sm: {
    py: 1,
  },

  md: {
    py: 1.5,
  },
};

export function StudyCollapse({
  label,
  count,
  defaultOpen = true,
  variant = "plain",
  size = "md",
  children,
  ...props
}: StudyCollapseProps) {
  return (
    <Collapsible.Root defaultOpen={defaultOpen}>
      <Stack gap={2} {...variantStyles[variant]} {...props}>
        <Collapsible.Trigger asChild>
          <button
            type="button"
            style={{
              width: "100%",
              cursor: "pointer",
              background: "transparent",
              border: 0,
              padding: 0,
              color: "inherit",
              font: "inherit",
              textAlign: "left",
            }}
          >
            <HStack
              w="full"
              justify="space-between"
              textAlign="left"
              rounded="button"
              px={2}
              transitionProperty="background-color, color, transform"
              transitionDuration="fast"
              _hover={{
                bg: "activeBg",
                color: "textMain",
              }}
              _active={{
                transform: "translateY(1px)",
              }}
              {...triggerSizeStyles[size]}
            >
              <HStack gap={2} minW={0}>
                <StudyText fontWeight="semibold" truncate>
                  {label}
                </StudyText>

                {count != null && (
                  <StudyBadge variant="neutral" size="sm" flexShrink={0}>
                    {count}
                  </StudyBadge>
                )}
              </HStack>

              <Collapsible.Context>
                {(context) => (
                  <LuChevronRight
                    style={{
                      flexShrink: 0,
                      transition: "transform 150ms ease",
                      transform: context.open
                        ? "rotate(90deg)"
                        : "rotate(0deg)",
                    }}
                  />
                )}
              </Collapsible.Context>
            </HStack>
          </button>
        </Collapsible.Trigger>

        <Collapsible.Content>{children}</Collapsible.Content>
      </Stack>
    </Collapsible.Root>
  );
}