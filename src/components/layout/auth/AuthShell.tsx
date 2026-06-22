import { HStack, Link, Stack, Text } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";

import {
  ColorModeToggle,
  LanguageToggle,
  StudyBox,
  StudyCard
} from "@/components/ui";

type AuthShellProps = {
  children: ReactNode;
  footerText: string;
  footerLinkText: string;
  footerLinkTo: string;
};

export function AuthShell({
  children,
  footerText,
  footerLinkText,
  footerLinkTo,
}: AuthShellProps) {
  return (
    <StudyBox
      variant="plain"
      minH="100vh"
      bg="appBg"
      color="textMain"
      animationVariant="fadeInFast"
    >
      <StudyBox
        variant="plain"
        maxW="480px"
        mx="auto"
        px={4}
        py={{ base: 6, md: 10 }}
      >
        <HStack justify="flex-end" gap={2} mb={8}>
          <ColorModeToggle />
          <LanguageToggle />
        </HStack>

        <Stack gap={6}>
          <StudyCard>{children}</StudyCard>

          <HStack justify="center" gap={2} fontSize="sm">
            <Text color="textMuted">{footerText}</Text>

            <Link asChild color="accent" fontWeight="semibold">
              <RouterLink to={footerLinkTo}>{footerLinkText}</RouterLink>
            </Link>
          </HStack>
        </Stack>
      </StudyBox>
    </StudyBox>
  );
}
