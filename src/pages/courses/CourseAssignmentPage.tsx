import { Stack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { LuClipboardList } from "react-icons/lu";
import { useParams } from "react-router-dom";

import { studentApi } from "@/api/studentApi";
import { teacherApi } from "@/api/teacherApi";
import {
  CreateAssignmentAction,
  CreateAssignmentDialog,
  StudentAssignmentList,
  TeacherAssignmentList,
} from "@/components/courses";
import { ErrorState } from "@/components/feedback/ErrorState";
import { LoadingState } from "@/components/feedback/LoadingState";
import { StudySectionHeader } from "@/components/ui";
import { useAuth } from "@/hooks/auth/useAuth";
import type { AssignmentDto, Guid, StudentAssignmentDto } from "@/types/api";

const courseAssignmentsPageText = {
  title: "Assignments",
  loading: "Loading assignments...",
  errorTitle: "Could not load assignments.",
  notLoggedIn: "User is not logged in.",
  missingCourseId: "Course id is missing.",
  unsupportedRole: "Unsupported role.",
};

export function CourseAssignmentsPage() {
  const { courseId } = useParams<{ courseId: Guid }>();
  const { user } = useAuth();

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const canCreateAssignment = user?.role === "Teacher";

  const {
    data: assignments = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["course-assignments", user?.role, courseId],
    enabled: Boolean(user && courseId),
    queryFn: () => {
      if (!user) throw new Error(courseAssignmentsPageText.notLoggedIn);
      if (!courseId) throw new Error(courseAssignmentsPageText.missingCourseId);

      switch (user.role) {
        case "Teacher":
          return teacherApi.assignments.getAssignmentsByCourseId(courseId);
        case "Student":
          return studentApi.assignments.getAssignmentsByCourseId(courseId);
        default:
          throw new Error(courseAssignmentsPageText.unsupportedRole);
      }
    },
  });

  if (isLoading) {
    return <LoadingState text={courseAssignmentsPageText.loading} />;
  }

  if (isError) {
    return <ErrorState title={courseAssignmentsPageText.errorTitle} />;
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
    <Stack gap={6}>
      <StudySectionHeader
        title={courseAssignmentsPageText.title}
        titleSize="header"
        icon={<LuClipboardList />}
        actions={
          canCreateAssignment ? (
            <CreateAssignmentAction onClick={() => setIsCreateOpen(true)} />
          ) : undefined
        }
      />

      {assignmentList}

      {courseId && (
        <CreateAssignmentDialog
          courseId={courseId}
          open={isCreateOpen}
          onOpenChange={setIsCreateOpen}
        />
      )}
    </Stack>
  );
}
