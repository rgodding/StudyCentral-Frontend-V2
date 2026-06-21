import { Textarea, type TextareaProps } from "@chakra-ui/react";

type StudyTextareaProps = TextareaProps;

export function StudyTextarea(props: StudyTextareaProps) {
  return (
    <Textarea
      bg="surfaceBg"
      color="textMain"
      borderColor="borderSubtle"
      rounded="button"
      minH="120px"
      resize="vertical"
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
      {...props}
    />
  );
}
