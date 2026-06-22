import { Code, type CodeProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

export type PreviewCodeProps = Omit<CodeProps, "children"> & {
  children: ReactNode;
};

export function PreviewCode({ children, ...props }: PreviewCodeProps) {
  return (
    <Code
      display="inline-flex"
      alignItems="center"
      maxW="full"
      px={2}
      py={1}
      rounded="button"
      bg="panelBgSubtle"
      color="textMuted"
      borderWidth="1px"
      borderColor="borderSubtle"
      fontSize="xs"
      fontWeight="medium"
      whiteSpace="nowrap"
      overflow="hidden"
      textOverflow="ellipsis"
      {...props}
    >
      {children}
    </Code>
  );
}