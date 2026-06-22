import { Grid, GridItem, type GridProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

type CourseOverviewGridProps = GridProps & {
  announcements: ReactNode;
  overview: ReactNode;
  assignments: ReactNode;
};

export function CourseOverviewGrid({
  announcements,
  overview,
  assignments,
  ...props
}: CourseOverviewGridProps) {
  return (
    <Grid
      gap={4}
      templateColumns={{
        base: "1fr",
        lg: "minmax(0, 2fr) minmax(280px, 0.9fr)",
      }}
      templateRows={{
        base: "auto",
        lg: "auto minmax(0, 1fr)",
      }}
      alignItems="stretch"
      {...props}
    >
      <GridItem minW={0} minH={0} gridRow={{ lg: "1 / span 2" }}>
        {announcements}
      </GridItem>

      <GridItem
        minW={0}
        minH={0}
        gridColumn={{ lg: "2" }}
        gridRow={{ lg: "1" }}
      >
        {overview}
      </GridItem>

      <GridItem
        minW={0}
        minH={0}
        gridColumn={{ lg: "2" }}
        gridRow={{ lg: "2" }}
      >
        {assignments}
      </GridItem>
    </Grid>
  );
}
