import { Box, Grid, type GridProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

import { appLayoutConfig } from "./appLayoutConfig";
import { Navbar } from "@/components/layout/navbar/Navbar";

type AppShellProps = GridProps & {
  children: ReactNode;
  subNavbar?: ReactNode;
};

export function AppShell({ children, subNavbar, ...props }: AppShellProps) {
  const hasSubNavbar = Boolean(subNavbar);

  return (
    <Grid
      h="100vh"
      overflow="hidden"
      bg="appBg"
      color="textMain"
      gridTemplateRows={
        hasSubNavbar
          ? `${appLayoutConfig.navbarHeight} ${appLayoutConfig.subNavbarHeight} minmax(0, 1fr)`
          : `${appLayoutConfig.navbarHeight} minmax(0, 1fr)`
      }
      {...props}
    >
      <Navbar height="full" />

      {hasSubNavbar && (
        <Box
          bg="navBg"
          borderBottomWidth="1px"
          borderColor="borderSubtle"
          minH={0}
        >
          {subNavbar}
        </Box>
      )}

      <Box
        as="main"
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