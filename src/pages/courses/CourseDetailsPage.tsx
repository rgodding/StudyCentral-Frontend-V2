import { Stack } from "@chakra-ui/react";
import { LuBookOpen, LuClipboardList, LuMegaphone } from "react-icons/lu";
import { useParams } from "react-router-dom";

import {
  AnnouncementList,
  CourseOverviewGrid,
  CourseOverviewSummary,
  StudentAssignmentList,
  TeacherAssignmentList,
} from "@/components/courses";
import { EmptyState, ErrorState, LoadingState } from "@/components/feedback";
import { Section } from "@/components/layout";
import { useAuth } from "@/hooks";
import { useCourseOverview } from "@/hooks/courses/useCourseOverview";
import type { AssignmentDto, Guid, StudentAssignmentDto } from "@/types/api";

const courseDetailsPageText = {
  loading: "Loading course...",
  errorTitle: "Could not load course",
  errorDescription: "The selected course could not be loaded.",
  retryLabel: "Try again",
  notFoundTitle: "Course not found",
  notFoundDescription:
    "The selected course does not exist or is no longer available.",
  announcementsTitle: "Announcements",
  assignmentsTitle: "Assignments",
};

export function CourseDetailsPage() {
  const { courseId } = useParams<{ courseId: Guid }>();
  const { user } = useAuth();

  const { data, isLoading, isError, refetch } = useCourseOverview(courseId);

  const course = data?.course;
  const announcements = data?.announcements ?? [];
  const assignments = data?.assignments ?? [];

  if (isLoading) {
    return <LoadingState text={courseDetailsPageText.loading} />;
  }

  if (isError) {
    return (
      <ErrorState
        title={courseDetailsPageText.errorTitle}
        description={courseDetailsPageText.errorDescription}
        retryLabel={courseDetailsPageText.retryLabel}
        onRetry={() => void refetch()}
      />
    );
  }

  if (!course) {
    return (
      <EmptyState
        title={courseDetailsPageText.notFoundTitle}
        description={courseDetailsPageText.notFoundDescription}
        icon={<LuBookOpen />}
      />
    );
  }

  const assignmentList =
    user?.role === "Teacher" ? (
      <TeacherAssignmentList assignments={assignments as AssignmentDto[]} />
    ) : (
      <StudentAssignmentList
        assignments={assignments as StudentAssignmentDto[]}
      />
    );

  return (
    <Stack gap={4}>
      <CourseOverviewGrid
        announcements={
          <Section
            title={courseDetailsPageText.announcementsTitle}
            headerIcon={<LuMegaphone />}
            titleSize="sm"
            h="full"
          >
            <AnnouncementList announcements={announcements} />
          </Section>
        }
        overview={<CourseOverviewSummary course={course} />}
        assignments={
          <Section
            title={courseDetailsPageText.assignmentsTitle}
            headerIcon={<LuClipboardList />}
            titleSize="sm"
            h="full"
          >
            {assignmentList}
          </Section>
        }
      />
    </Stack>
  );
}
