import { chakra, type HTMLChakraProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

export type StudyActionCardVariant = "default" | "subtle";

export type StudyActionCardProps = Omit<
  HTMLChakraProps<"button">,
  "children" | "onClick"
> & {
  children: ReactNode;
  onClick: () => void;
  variant?: StudyActionCardVariant;
};

const variantStyles: Record<
  StudyActionCardVariant,
  HTMLChakraProps<"button">
> = {
  default: {
    bg: "panelBg",
    borderColor: "borderStrong",
  },

  subtle: {
    bg: "panelBgSubtle",
    borderColor: "borderStrong",
  },
};

export function StudyActionCard({
  children,
  onClick,
  variant = "default",
  ...props
}: StudyActionCardProps) {
  return (
    <chakra.button
      type="button"
      w="full"
      display="block"
      textAlign="left"
      color="textMain"
      rounded="card"
      borderWidth="1px"
      shadow="card"
      p={4}
      cursor="pointer"
      transitionProperty="background-color, border-color, box-shadow"
      transitionDuration="fast"
      _hover={{
        bg: "panelBgSubtle",
        borderColor: "accentMuted",
      }}
      _focusVisible={{
        outline: "2px solid",
        outlineColor: "accent",
        outlineOffset: "2px",
      }}
      {...variantStyles[variant]}
      {...props}
      onClick={onClick}
    >
      {children}
    </chakra.button>
  );
}
