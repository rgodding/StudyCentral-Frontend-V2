import { Box, Grid, type GridProps } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import { Navbar } from "@/components/layout/navbar";
import { StudyBox } from "@/components/ui";
import { appLayoutConfig } from "./appLayoutConfig";

type AppShellProps = GridProps & {
  children: ReactNode;
  subNavbar?: ReactNode;
};

const subNavbarAnimationMs = 250;

export function AppShell({ children, subNavbar, ...props }: AppShellProps) {
  const [renderedSubNavbar, setRenderedSubNavbar] = useState(subNavbar);
  const [isSubNavbarLeaving, setIsSubNavbarLeaving] = useState(false);

  const hasIncomingSubNavbar = Boolean(subNavbar);
  const hasRenderedSubNavbar = Boolean(renderedSubNavbar);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (subNavbar) {
      setRenderedSubNavbar(subNavbar);
      setIsSubNavbarLeaving(false);
      return;
    }

    if (!renderedSubNavbar) {
      return;
    }

    setIsSubNavbarLeaving(true);

    const timeoutId = window.setTimeout(() => {
      setRenderedSubNavbar(undefined);
      setIsSubNavbarLeaving(false);
    }, subNavbarAnimationMs);

    return () => window.clearTimeout(timeoutId);
  }, [subNavbar, renderedSubNavbar]);
  /* eslint-enable react-hooks/set-state-in-effect */

  return (
    <Grid
      h="100vh"
      overflow="hidden"
      bg="appBg"
      color="textMain"
      gridTemplateRows={
        hasRenderedSubNavbar
          ? `${appLayoutConfig.navbarHeight} ${appLayoutConfig.subNavbarHeight} minmax(0, 1fr)`
          : `${appLayoutConfig.navbarHeight} minmax(0, 1fr)`
      }
      {...props}
    >
      <Navbar height="full" />

      {hasRenderedSubNavbar && (
        <StudyBox
          variant="nav"
          animationVariant={
            isSubNavbarLeaving ? "slideOutToTopFast" : "slideDownFast"
          }
          borderBottomWidth="1px"
          minH={0}
          overflow="hidden"
          position="relative"
          zIndex="base"
        >
          {hasIncomingSubNavbar ? subNavbar : renderedSubNavbar}
        </StudyBox>
      )}

      <Box
        as="main"
        h="full"
        minH={0}
        overflowY="auto"
        overflowX="hidden"
        bg="appBg"
        css={{
          scrollbarGutter: "stable",
        }}
      >
        {children}
      </Box>
    </Grid>
  );
}
