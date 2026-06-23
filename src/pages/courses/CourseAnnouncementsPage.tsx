import { Stack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { LuMegaphone } from "react-icons/lu";
import { useParams } from "react-router-dom";

import { studentApi } from "@/api/studentApi";
import { teacherApi } from "@/api/teacherApi";
import {
  AnnouncementList,
  CreateAnnouncementAction,
  CreateAnnouncementDialog,
} from "@/components/courses";
import { ErrorState } from "@/components/feedback/ErrorState";
import { LoadingState } from "@/components/feedback/LoadingState";
import { StudySectionHeader } from "@/components/ui";
import { useAuth } from "@/hooks/auth/useAuth";
import type { Guid } from "@/types/api";

const courseAnnouncementsPageText = {
  title: "Announcements",
  loading: "Loading announcements...",
  errorTitle: "Could not load announcements.",
  notLoggedIn: "User is not logged in.",
  missingCourseId: "Course id is missing.",
  unsupportedRole: "Unsupported role.",
};

export function CourseAnnouncementsPage() {
  const { courseId } = useParams<{ courseId: Guid }>();
  const { user } = useAuth();

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const canCreateAnnouncement = user?.role === "Teacher";

  const {
    data: announcements = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["course-announcements", user?.role, courseId],
    enabled: Boolean(user && courseId),
    queryFn: () => {
      if (!user) throw new Error(courseAnnouncementsPageText.notLoggedIn);
      if (!courseId)
        throw new Error(courseAnnouncementsPageText.missingCourseId);

      switch (user.role) {
        case "Teacher":
          return teacherApi.announcements.getAnnouncementsByCourseId(courseId);
        case "Student":
          return studentApi.announcements.getAnnouncementsByCourseId(courseId);
        default:
          throw new Error(courseAnnouncementsPageText.unsupportedRole);
      }
    },
  });

  if (isLoading) {
    return <LoadingState text={courseAnnouncementsPageText.loading} />;
  }

  if (isError) {
    return <ErrorState title={courseAnnouncementsPageText.errorTitle} />;
  }
  return (
    <Stack gap={6}>
      <StudySectionHeader
        title={courseAnnouncementsPageText.title}
        titleSize="header"
        icon={<LuMegaphone />}
        actions={
          canCreateAnnouncement ? (
            <CreateAnnouncementAction onClick={() => setIsCreateOpen(true)} />
          ) : undefined
        }
      />

      <AnnouncementList announcements={announcements} />

      {courseId && (
        <CreateAnnouncementDialog
          courseId={courseId}
          open={isCreateOpen}
          onOpenChange={setIsCreateOpen}
        />
      )}
    </Stack>
  );
}
