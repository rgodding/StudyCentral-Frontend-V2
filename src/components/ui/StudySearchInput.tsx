import {
  Box,
  HStack,
  Input,
  type BoxProps,
  type InputProps,
} from "@chakra-ui/react";
import { LuSearch, LuX } from "react-icons/lu";

import { StudyIconButton } from "./StudyIconButton";

export type StudySearchInputSize = "sm" | "md" | "lg";
export type StudySearchInputVariant = "default" | "subtle";

export type StudySearchInputProps = Omit<InputProps, "size" | "variant"> & {
  size?: StudySearchInputSize;
  variant?: StudySearchInputVariant;
  clearLabel?: string;
  onClear?: () => void;
  wrapperProps?: BoxProps;
};

const variantStyles: Record<StudySearchInputVariant, BoxProps> = {
  default: {
    bg: "surfaceBg",
    borderColor: "borderStrong",
  },

  subtle: {
    bg: "panelBgSubtle",
    borderColor: "borderSubtle",
  },
};

const sizeStyles: Record<
  StudySearchInputSize,
  {
    wrapper: BoxProps;
    input: InputProps;
    iconSize: string;
    clearButtonSize: "xs" | "sm";
  }
> = {
  sm: {
    wrapper: {
      h: "32px",
    },
    input: {
      fontSize: "sm",
      ps: "34px",
      pe: "34px",
    },
    iconSize: "16px",
    clearButtonSize: "xs",
  },

  md: {
    wrapper: {
      h: "40px",
    },
    input: {
      fontSize: "sm",
      ps: "40px",
      pe: "40px",
    },
    iconSize: "18px",
    clearButtonSize: "xs",
  },

  lg: {
    wrapper: {
      h: "48px",
    },
    input: {
      fontSize: "md",
      ps: "46px",
      pe: "46px",
    },
    iconSize: "20px",
    clearButtonSize: "sm",
  },
};

export function StudySearchInput({
  size = "md",
  variant = "default",
  value,
  clearLabel = "Clear search",
  onClear,
  wrapperProps,
  ...props
}: StudySearchInputProps) {
  const hasValue = typeof value === "string" && value.length > 0;
  const styles = sizeStyles[size];

  return (
    <Box
      position="relative"
      w="full"
      rounded="button"
      borderWidth="1px"
      transitionProperty="background-color, border-color, box-shadow"
      transitionDuration="fast"
      _focusWithin={{
        borderColor: "accent",
        boxShadow: "0 0 0 1px var(--chakra-colors-accent)",
      }}
      {...variantStyles[variant]}
      {...styles.wrapper}
      {...wrapperProps}
    >
      <HStack
        position="absolute"
        left="12px"
        top="50%"
        transform="translateY(-50%)"
        color="textSubtle"
        pointerEvents="none"
        zIndex="base"
      >
        <LuSearch size={styles.iconSize} />
      </HStack>

      <Input
        h="full"
        value={value}
        borderWidth="0"
        bg="transparent"
        color="textMain"
        rounded="button"
        outline="none"
        _placeholder={{
          color: "textSubtle",
        }}
        _focus={{
          boxShadow: "none",
          outline: "none",
        }}
        {...styles.input}
        {...props}
      />

      {hasValue && onClear && (
        <StudyIconButton
          aria-label={clearLabel}
          variant="ghost"
          size={styles.clearButtonSize}
          position="absolute"
          right="6px"
          top="50%"
          transform="translateY(-50%)"
          zIndex="base"
          onClick={onClear}
        >
          <LuX />
        </StudyIconButton>
      )}
    </Box>
  );
}
