import { Separator, type SeparatorProps } from "@chakra-ui/react";

type StudyDividerProps = SeparatorProps;

export function StudyDivider(props: StudyDividerProps) {
  return <Separator borderColor="borderSubtle" {...props} />;
}
