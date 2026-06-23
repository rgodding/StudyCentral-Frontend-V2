import { Box, NativeSelect, Stack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { LuMegaphone } from "react-icons/lu";

import { studentApi } from "@/api/studentApi";
import { teacherApi } from "@/api/teacherApi";
import { AnnouncementList } from "@/components/courses/announcementList/AnnouncementList";
import { CreateAnnouncementAction } from "@/components/courses/announcementList/CreateAnnouncementAction";
import { CreateAnnouncementForm } from "@/components/forms/createAnnouncement";
import { EmptyState, ErrorState, LoadingState } from "@/components/feedback";
import { Section } from "@/components/layout";
import { StudyDialog, StudyText } from "@/components/ui";
import { useAuth } from "@/hooks";
import type { Guid } from "@/types/api";

export function AnnouncementsPage() {
  const { user } = useAuth();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<Guid | "">("");

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

  const teacherCoursesQuery = useQuery({
    queryKey: ["teacher-courses-for-announcement-create"],
    enabled: Boolean(user && isTeacher && isCreateOpen),
    queryFn: () => teacherApi.courses.getCourses(),
  });

  const isLoading =
    teacherAnnouncementsQuery.isLoading || studentAnnouncementsQuery.isLoading;

  const isError =
    teacherAnnouncementsQuery.isError || studentAnnouncementsQuery.isError;

  const handleCreateOpenChange = async (open: boolean) => {
    setIsCreateOpen(open);

    if (open) {
      return;
    }

    setSelectedCourseId("");
    await teacherAnnouncementsQuery.refetch();
  };

  if (isLoading) {
    return <LoadingState text="Loading announcements..." />;
  }

  if (isError) {
    return <ErrorState title="Could not load announcements." />;
  }

  const announcements = isTeacher
    ? (teacherAnnouncementsQuery.data ?? [])
    : (studentAnnouncementsQuery.data ?? []);

  const teacherCourses = teacherCoursesQuery.data ?? [];

  return (
    <>
      <Stack gap={6}>
        <Section
          title="Announcements"
          headerIcon={<LuMegaphone />}
          actions={
            isTeacher ? (
              <CreateAnnouncementAction onClick={() => setIsCreateOpen(true)} />
            ) : undefined
          }
        >
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

      {isTeacher && (
        <StudyDialog
          open={isCreateOpen}
          onOpenChange={(details) => handleCreateOpenChange(details.open)}
          title="Create announcement"
          description="Choose a course and create a new announcement."
          size="md"
          headerSeparator="belowTitle"
        >
          <Stack gap={4}>
            {teacherCoursesQuery.isLoading ? (
              <LoadingState text="Loading courses..." />
            ) : teacherCoursesQuery.isError ? (
              <ErrorState title="Could not load courses." />
            ) : teacherCourses.length > 0 ? (
              <>
                <NativeSelect.Root>
                  <NativeSelect.Field
                    value={selectedCourseId}
                    onChange={(event) =>
                      setSelectedCourseId(event.currentTarget.value as Guid)
                    }
                    h="40px"
                    rounded="button"
                    bg="surfaceBg"
                    color="textMain"
                    borderColor="borderSubtle"
                    cursor="pointer"
                  >
                    <option value="">Select course</option>

                    {teacherCourses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.name}
                      </option>
                    ))}
                  </NativeSelect.Field>
                </NativeSelect.Root>

                {selectedCourseId ? (
                  <CreateAnnouncementForm
                    courseId={selectedCourseId}
                    onSuccess={async () => {
                      setIsCreateOpen(false);
                      setSelectedCourseId("");
                      await teacherAnnouncementsQuery.refetch();
                    }}
                  />
                ) : (
                  <StudyText variant="muted">
                    Select a course before creating an announcement.
                  </StudyText>
                )}
              </>
            ) : (
              <EmptyState
                icon={<LuMegaphone />}
                title="No courses available"
                description="You need a course before creating announcements."
              />
            )}
          </Stack>
        </StudyDialog>
      )}
    </>
  );
}
