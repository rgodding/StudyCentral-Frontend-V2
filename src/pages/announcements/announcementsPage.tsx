import { Box, Stack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { LuMegaphone } from "react-icons/lu";

import { studentApi } from "@/api/studentApi";
import { teacherApi } from "@/api/teacherApi";
import { AnnouncementList } from "@/components/courses/announcementList/AnnouncementList";
import { EmptyState, ErrorState, LoadingState } from "@/components/feedback";
import { Section } from "@/components/layout";
import { useAuth } from "@/hooks";

export function AnnouncementsPage() {
  const { user } = useAuth();

  const isTeacher = user?.role === "Teacher";
  const isStudent = user?.role === "Student";

  const teacherAnnouncementsQuery = useQuery({
    queryKey: ["teacher-announcements"],
    enabled: Boolean(user && isTeacher),
    queryFn: () => teacherApi.announcements.getAnnouncements(),
  });

  const studentAnnouncementsQuery = useQuery({
    queryKey: ["student-announcements"],
    enabled: Boolean(user && isStudent),
    queryFn: () => studentApi.announcements.getAnnouncements(),
  });

  const isLoading =
    teacherAnnouncementsQuery.isLoading || studentAnnouncementsQuery.isLoading;

  const isError =
    teacherAnnouncementsQuery.isError || studentAnnouncementsQuery.isError;

  if (isLoading) {
    return <LoadingState text="Loading announcements..." />;
  }

  if (isError) {
    return <ErrorState title="Could not load announcements." />;
  }

  const announcements = isTeacher
    ? (teacherAnnouncementsQuery.data ?? [])
    : (studentAnnouncementsQuery.data ?? []);

  return (
    <Stack gap={6}>
      <Section title="Announcements" headerIcon={<LuMegaphone />}>
        {announcements.length > 0 ? (
          <AnnouncementList announcements={announcements} />
        ) : (
          <Box>
            <EmptyState
              icon={<LuMegaphone />}
              title="No announcements yet"
              description="Announcements will appear here."
            />
          </Box>
        )}
      </Section>
    </Stack>
  );
}