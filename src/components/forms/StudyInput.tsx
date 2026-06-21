import { Input, type InputProps } from "@chakra-ui/react";

type StudyInputProps = InputProps;

export function StudyInput(props: StudyInputProps) {
  return (
    <Input
      bg="surfaceBg"
      color="textMain"
      borderColor="borderSubtle"
      rounded="button"
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
