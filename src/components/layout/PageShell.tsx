import { Container, type BoxProps, type ContainerProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

import { StudyBox } from "@/components/ui";

type PageShellProps = BoxProps & {
  children: ReactNode;
  containerProps?: ContainerProps;
};

export function PageShell({
  children,
  containerProps,
  ...props
}: PageShellProps) {
  return (
    <StudyBox
      variant="plain"
      minH="100vh"
      bg="appBg"
      color="textMain"
      {...props}
    >
      <Container
        maxW="7xl"
        px={{ base: 4, md: 6 }}
        py={{ base: 6, md: 8 }}
        {...containerProps}
      >
        {children}
      </Container>
    </StudyBox>
  );
}