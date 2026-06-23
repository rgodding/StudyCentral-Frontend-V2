import { Box, Stack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { LuMegaphone } from "react-icons/lu";
import { useParams } from "react-router-dom";

import { studentApi } from "@/api/studentApi";
import { teacherApi } from "@/api/teacherApi";
import { AnnouncementList } from "@/components/courses/announcementList/AnnouncementList";
import { CreateAnnouncementAction } from "@/components/courses/announcementList/CreateAnnouncementAction";
import { CreateAnnouncementDialog } from "@/components/courses/announcementList/CreateAnnouncementDialog";
import { EmptyState, ErrorState, LoadingState } from "@/components/feedback";
import { Section } from "@/components/layout";
import { useAuth } from "@/hooks";

export function CourseAnnouncementsPage() {
  const { courseId } = useParams();
  const { user } = useAuth();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const isTeacher = user?.role === "Teacher";

  const {
    data: announcements = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["course-announcements", user?.role, courseId],
    enabled: Boolean(user && courseId),
    queryFn: () => {
      if (!courseId) {
        throw new Error("Course id is missing.");
      }

      return isTeacher
        ? teacherApi.announcements.getAnnouncementsByCourseId(courseId)
        : studentApi.announcements.getAnnouncementsByCourseId(courseId);
    },
  });

  const handleCreateOpenChange = async (open: boolean) => {
    setIsCreateOpen(open);

    if (!open) {
      await refetch();
    }
  };

  if (!courseId) {
    return <ErrorState title="Course id is missing." />;
  }

  if (isLoading) {
    return <LoadingState text="Loading announcements..." />;
  }

  if (isError) {
    return <ErrorState title="Could not load announcements." />;
  }

  return (
    <>
      <Stack gap={6}>
        <Section
          title="Announcements"
          headerIcon={<LuMegaphone />}
          actions={
            isTeacher ? (
              <CreateAnnouncementAction
                onClick={() => setIsCreateOpen(true)}
              />
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
                description="Announcements for this course will appear here."
              />
            </Box>
          )}
        </Section>
      </Stack>

      {isTeacher && (
        <CreateAnnouncementDialog
          courseId={courseId}
          open={isCreateOpen}
          onOpenChange={handleCreateOpenChange}
        />
      )}
    </>
  );
}