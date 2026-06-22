import { Grid, Stack, type BoxProps } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { StudyBox, StudyCard, StudyLink, StudyText } from "@/components/ui";

export type PreviewNavItem = {
  id: string;
  label: string;
};

export type PreviewLayoutProps = BoxProps & {
  title: string;
  description?: string;
  sidebarTitle?: string;
  navItems: PreviewNavItem[];
  children: ReactNode;
};

const navItemHeight = 36;
const scrollSpyOffset = 140;

export function PreviewLayout({
  navItems,
  children,
  sidebarTitle = "Sections",
  ...props
}: PreviewLayoutProps) {
  const animationFrameRef = useRef<number | null>(null);

  const [scrollSpy, setScrollSpy] = useState({
    activeSectionId: navItems[0]?.id ?? "",
    indicatorTop: 0,
  });

  const updateScrollSpy = useCallback(() => {
    const sectionElements = navItems
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (sectionElements.length === 0) {
      return;
    }

    const sectionPositions = sectionElements.map(
      (element) => element.getBoundingClientRect().top - scrollSpyOffset,
    );

    let progressIndex = 0;

    if (sectionPositions[0] >= 0) {
      progressIndex = 0;
    } else if (sectionPositions[sectionPositions.length - 1] <= 0) {
      progressIndex = sectionPositions.length - 1;
    } else {
      for (let index = 0; index < sectionPositions.length - 1; index += 1) {
        const currentTop = sectionPositions[index];
        const nextTop = sectionPositions[index + 1];

        if (currentTop <= 0 && nextTop >= 0) {
          const distanceBetweenSections = nextTop - currentTop;
          const progressBetweenSections =
            distanceBetweenSections === 0
              ? 0
              : Math.abs(currentTop) / distanceBetweenSections;

          progressIndex = index + progressBetweenSections;
          break;
        }
      }
    }

    const activeIndex = Math.min(
      Math.max(Math.round(progressIndex), 0),
      navItems.length - 1,
    );

    setScrollSpy({
      activeSectionId: navItems[activeIndex]?.id ?? "",
      indicatorTop: progressIndex * navItemHeight,
    });
  }, [navItems]);

  useEffect(() => {
    function handleScroll() {
      if (animationFrameRef.current !== null) {
        return;
      }

      animationFrameRef.current = window.requestAnimationFrame(() => {
        updateScrollSpy();
        animationFrameRef.current = null;
      });
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    updateScrollSpy();

    document.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleScroll);

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [updateScrollSpy]);

  return (
    <StudyBox
      variant="plain"
      w="full"
      css={{
        scrollBehavior: "smooth",
      }}
      {...props}
    >
      <Stack gap={{ base: 5, md: 6 }}>
        <Grid
          templateColumns={{ base: "1fr", lg: "240px minmax(0, 1fr)" }}
          gap={{ base: 5, lg: 8 }}
          alignItems="start"
        >
          <StudyCard
            as="aside"
            variant="subtle"
            size="sm"
            position={{ base: "static", lg: "sticky" }}
            top={{ lg: 2 }}
            h="fit-content"
          >
            <Stack h="full" gap={3}>
              <StudyText
                variant="label"
                size="xs"
                color="textSubtle"
                textTransform="uppercase"
                letterSpacing="wide"
              >
                {sidebarTitle}
              </StudyText>

              <StudyBox variant="plain" position="relative" pr={1}>
                <StudyBox
                  variant="plain"
                  position="absolute"
                  left="0"
                  top="0"
                  w="2px"
                  h={`${navItemHeight}px`}
                  bg="accent"
                  rounded="full"
                  transform={`translateY(${scrollSpy.indicatorTop}px)`}
                  zIndex="base"
                />

                <Stack gap={0} pl={3}>
                  {navItems.map((item) => {
                    const isActive = scrollSpy.activeSectionId === item.id;

                    return (
                      <StudyLink
                        key={item.id}
                        href={`#${item.id}`}
                        linkVariant="nav"
                        size="sm"
                        h={`${navItemHeight}px`}
                        display="flex"
                        alignItems="center"
                        px={2}
                        rounded="button"
                        aria-current={isActive ? "true" : undefined}
                        bg={isActive ? "activeBg" : "transparent"}
                        color={isActive ? "accent" : "textMuted"}
                        fontWeight={isActive ? "semibold" : "medium"}
                        flexShrink={0}
                        _hover={{
                          bg: "activeBg",
                          color: isActive ? "accent" : "textMain",
                          textDecoration: "none",
                        }}
                      >
                        {item.label}
                      </StudyLink>
                    );
                  })}
                </Stack>
              </StudyBox>
            </Stack>
          </StudyCard>

          <Stack gap={{ base: 6, md: 8 }} minW={0}>
            {children}
          </Stack>
        </Grid>
      </Stack>
    </StudyBox>
  );
}
