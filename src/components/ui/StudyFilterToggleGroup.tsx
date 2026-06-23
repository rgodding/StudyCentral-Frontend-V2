import {
  HStack,
  chakra,
  type HTMLChakraProps,
  type StackProps,
} from "@chakra-ui/react";
import type { ReactNode } from "react";

export type StudyFilterToggleGroupSize = "xs" | "sm";

export type StudyFilterToggleItem = {
  value: string;
  label: ReactNode;
  disabled?: boolean;
};

export type StudyFilterToggleGroupProps = {
  values: string[];
  onValuesChange: (values: string[]) => void;
  items: StudyFilterToggleItem[];
  size?: StudyFilterToggleGroupSize;
  allowEmpty?: boolean;
  listProps?: StackProps;
  buttonProps?: Omit<HTMLChakraProps<"button">, "children" | "onClick" | "value">;
};

const buttonSizeStyles: Record<
  StudyFilterToggleGroupSize,
  HTMLChakraProps<"button">
> = {
  xs: {
    h: "22px",
    px: 2,
    fontSize: "xs",
  },

  sm: {
    h: "26px",
    px: 2.5,
    fontSize: "xs",
  },
};

export function StudyFilterToggleGroup({
  values,
  onValuesChange,
  items,
  size = "xs",
  allowEmpty = true,
  listProps,
  buttonProps,
}: StudyFilterToggleGroupProps) {
  function toggleValue(value: string) {
    const isSelected = values.includes(value);

    if (isSelected) {
      const nextValues = values.filter((currentValue) => currentValue !== value);

      if (!allowEmpty && nextValues.length === 0) {
        return;
      }

      onValuesChange(nextValues);
      return;
    }

    onValuesChange([...values, value]);
  }

  return (
    <HStack gap={1} wrap="wrap" {...listProps}>
      {items.map((item) => {
        const isSelected = values.includes(item.value);

        return (
          <chakra.button
            key={item.value}
            type="button"
            aria-pressed={isSelected}
            disabled={item.disabled}
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            rounded="button"
            borderWidth="1px"
            borderColor={isSelected ? "borderStrong" : "borderSubtle"}
            bg={isSelected ? "surfaceBg" : "panelBgSubtle"}
            color={isSelected ? "accent" : "textMuted"}
            fontWeight="semibold"
            lineHeight="1"
            cursor={item.disabled ? "not-allowed" : "pointer"}
            transitionProperty="background-color, border-color, color"
            transitionDuration="fast"
            _hover={{
              color: item.disabled ? undefined : "textMain",
              borderColor: item.disabled ? undefined : "borderStrong",
            }}
            _disabled={{
              opacity: 0.55,
              cursor: "not-allowed",
            }}
            _focusVisible={{
              outline: "2px solid",
              outlineColor: "accent",
              outlineOffset: "2px",
            }}
            {...buttonSizeStyles[size]}
            {...buttonProps}
            onClick={() => toggleValue(item.value)}
          >
            {item.label}
          </chakra.button>
        );
      })}
    </HStack>
  );
}