import { Input, type InputProps } from "@chakra-ui/react";

export type StudyInputProps = InputProps;

export function StudyInput(props: StudyInputProps) {
  return (
    <Input
      w="full"
      bg="surfaceBg"
      color="textMain"
      caretColor="accent"
      borderWidth="1.5px"
      borderColor="borderStrong"
      rounded="button"
      transitionProperty="border-color, box-shadow, background-color, color"
      transitionDuration="fast"
      _placeholder={{
        color: "textSubtle",
      }}
      _hover={{
        borderColor: "accent",
      }}
      _focus={{
        borderColor: "accent",
        boxShadow: "0 0 0 2px var(--chakra-colors-accent)",
      }}
      _invalid={{
        borderColor: "dangerText",
        boxShadow: "0 0 0 2px var(--chakra-colors-dangerText)",
      }}
      _disabled={{
        cursor: "not-allowed",
        opacity: 0.65,
        bg: "panelBgSubtle",
        color: "textSubtle",
        borderColor: "borderSubtle",
      }}
      _readOnly={{
        bg: "panelBgSubtle",
        color: "textMuted",
        borderColor: "borderStrong",
      }}
      {...props}
    />
  );
}