import { Textarea, type TextareaProps } from "@chakra-ui/react";

export type StudyTextareaProps = TextareaProps;

export function StudyTextarea(props: StudyTextareaProps) {
  return (
    <Textarea
      w="full"
      bg="surfaceBg"
      color="textMain"
      caretColor="accent"
      borderWidth="1px"
      borderColor="borderSubtle"
      rounded="button"
      minH="120px"
      resize="vertical"
      transitionProperty="border-color, box-shadow, background-color, color"
      transitionDuration="fast"
      _placeholder={{
        color: "textSubtle",
      }}
      _hover={{
        borderColor: "borderStrong",
      }}
      _focus={{
        borderColor: "accent",
        boxShadow: "0 0 0 1px var(--chakra-colors-accent)",
      }}
      _invalid={{
        borderColor: "dangerText",
        boxShadow: "0 0 0 1px var(--chakra-colors-dangerText)",
      }}
      _disabled={{
        cursor: "not-allowed",
        opacity: 0.65,
        bg: "panelBgSubtle",
        color: "textSubtle",
        borderColor: "borderSubtle",
        resize: "none",
      }}
      _readOnly={{
        bg: "panelBgSubtle",
        color: "textMuted",
        borderColor: "borderSubtle",
      }}
      {...props}
    />
  );
}