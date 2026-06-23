import { Box, Stack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { LuClipboardList } from "react-icons/lu";
import { useParams } from "react-router-dom";

import { studentApi } from "@/api/studentApi";
import { teacherApi } from "@/api/teacherApi";
import { CreateAssignmentAction } from "@/components/courses/assignmentList/CreateAssignmentAction";
import { CreateAssignmentDialog } from "@/components/courses/assignmentList/CreateAssignmentDialog";
import { StudentAssignmentList } from "@/components/courses/assignmentList/StudentAssignmentList";
import { TeacherAssignmentList } from "@/components/courses/assignmentList/TeacherAssignmentList";
import { EmptyState, ErrorState, LoadingState } from "@/components/feedback";
import { Section } from "@/components/layout";
import { useAuth } from "@/hooks";

export function CourseAssignmentsPage() {
  const { courseId } = useParams();
  const { user } = useAuth();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const isTeacher = user?.role === "Teacher";

  const teacherAssignmentsQuery = useQuery({
    queryKey: ["teacher-course-assignments", courseId],
    enabled: Boolean(user && isTeacher && courseId),
    queryFn: () => {
      if (!courseId) {
        throw new Error("Course id is missing.");
      }

      return teacherApi.assignments.getAssignmentsByCourseId(courseId);
    },
  });

  const studentAssignmentsQuery = useQuery({
    queryKey: ["student-course-assignments", courseId],
    enabled: Boolean(user && !isTeacher && courseId),
    queryFn: () => {
      if (!courseId) {
        throw new Error("Course id is missing.");
      }

      return studentApi.assignments.getAssignmentsByCourseId(courseId);
    },
  });

  const handleCreateOpenChange = async (open: boolean) => {
    setIsCreateOpen(open);

    if (!open) {
      await teacherAssignmentsQuery.refetch();
    }
  };

  if (!courseId) {
    return <ErrorState title="Course id is missing." />;
  }

  if (teacherAssignmentsQuery.isLoading || studentAssignmentsQuery.isLoading) {
    return <LoadingState text="Loading assignments..." />;
  }

  if (teacherAssignmentsQuery.isError || studentAssignmentsQuery.isError) {
    return <ErrorState title="Could not load assignments." />;
  }

  const teacherAssignments = teacherAssignmentsQuery.data ?? [];
  const studentAssignments = studentAssignmentsQuery.data ?? [];

  return (
    <>
      <Stack gap={6}>
        <Section
          title="Assignments"
          headerIcon={<LuClipboardList />}
          actions={
            isTeacher ? (
              <CreateAssignmentAction onClick={() => setIsCreateOpen(true)} />
            ) : undefined
          }
        >
          {isTeacher ? (
            teacherAssignments.length > 0 ? (
              <TeacherAssignmentList assignments={teacherAssignments} />
            ) : (
              <AssignmentsEmptyState />
            )
          ) : studentAssignments.length > 0 ? (
            <StudentAssignmentList assignments={studentAssignments} filter="active" />
          ) : (
            <AssignmentsEmptyState />
          )}
        </Section>
      </Stack>

      {isTeacher && (
        <CreateAssignmentDialog
          courseId={courseId}
          open={isCreateOpen}
          onOpenChange={handleCreateOpenChange}
        />
      )}
    </>
  );
}

function AssignmentsEmptyState() {
  return (
    <Box>
      <EmptyState
        icon={<LuClipboardList />}
        title="No assignments yet"
        description="Assignments for this course will appear here."
      />
    </Box>
  );
}