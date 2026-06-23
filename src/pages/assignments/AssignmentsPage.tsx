import { Box, Stack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { LuClipboardList } from "react-icons/lu";

import { studentApi } from "@/api/studentApi";
import { teacherApi } from "@/api/teacherApi";
import { StudentAssignmentList } from "@/components/courses/assignmentList/StudentAssignmentList";
import { TeacherAssignmentList } from "@/components/courses/assignmentList/TeacherAssignmentList";
import { EmptyState, ErrorState, LoadingState } from "@/components/feedback";
import { Section } from "@/components/layout";
import { useAuth } from "@/hooks";

export function AssignmentsPage() {
  const { user } = useAuth();

  const isTeacher = user?.role === "Teacher";
  const isStudent = user?.role === "Student";

  const teacherAssignmentsQuery = useQuery({
    queryKey: ["teacher-assignments"],
    enabled: Boolean(user && isTeacher),
    queryFn: () => teacherApi.assignments.getAssignments(),
  });

  const studentAssignmentsQuery = useQuery({
    queryKey: ["student-assignments"],
    enabled: Boolean(user && isStudent),
    queryFn: () => studentApi.assignments.getAssignments(),
  });

  const isLoading =
    teacherAssignmentsQuery.isLoading || studentAssignmentsQuery.isLoading;

  const isError =
    teacherAssignmentsQuery.isError || studentAssignmentsQuery.isError;

  if (isLoading) {
    return <LoadingState text="Loading assignments..." />;
  }

  if (isError) {
    return <ErrorState title="Could not load assignments." />;
  }

  return (
    <Stack gap={6}>
      <Section title="Assignments" headerIcon={<LuClipboardList />}>
        {isTeacher ? (
          <TeacherAssignmentsContent
            assignments={teacherAssignmentsQuery.data ?? []}
          />
        ) : (
          <StudentAssignmentsContent
            assignments={studentAssignmentsQuery.data ?? []}
          />
        )}
      </Section>
    </Stack>
  );
}

type TeacherAssignmentsContentProps = {
  assignments: Awaited<
    ReturnType<typeof teacherApi.assignments.getAssignments>
  >;
};

function TeacherAssignmentsContent({
  assignments,
}: TeacherAssignmentsContentProps) {
  if (assignments.length === 0) {
    return <AssignmentsEmptyState />;
  }

  return <TeacherAssignmentList assignments={assignments} />;
}

type StudentAssignmentsContentProps = {
  assignments: Awaited<
    ReturnType<typeof studentApi.assignments.getAssignments>
  >;
};

function StudentAssignmentsContent({
  assignments,
}: StudentAssignmentsContentProps) {
  if (assignments.length === 0) {
    return <AssignmentsEmptyState />;
  }

  return <StudentAssignmentList assignments={assignments} />;
}

function AssignmentsEmptyState() {
  return (
    <Box>
      <EmptyState
        icon={<LuClipboardList />}
        title="No assignments yet"
        description="Assignments will appear here."
      />
    </Box>
  );
}