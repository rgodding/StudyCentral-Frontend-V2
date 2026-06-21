import { Grid, type GridProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

type ContentGridProps = GridProps & {
  children: ReactNode;
};

export function ContentGrid({ children, ...props }: ContentGridProps) {
  return (
    <Grid
      gap={{ base: 4, md: 6 }}
      templateColumns={{
        base: "1fr",
        lg: "minmax(0, 2fr) minmax(320px, 1fr)",
      }}
      alignItems="start"
      {...props}
    >
      {children}
    </Grid>
  );
}
