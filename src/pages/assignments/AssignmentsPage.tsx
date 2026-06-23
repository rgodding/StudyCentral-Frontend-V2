import { Box, NativeSelect, Stack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { LuClipboardList } from "react-icons/lu";

import { studentApi } from "@/api/studentApi";
import { teacherApi } from "@/api/teacherApi";
import { CreateAssignmentAction } from "@/components/courses/assignmentList/CreateAssignmentAction";
import { CreateAssignmentForm } from "@/components/forms/createAssignment";
import { StudentAssignmentList } from "@/components/courses/assignmentList/StudentAssignmentList";
import { TeacherAssignmentList } from "@/components/courses/assignmentList/TeacherAssignmentList";
import { EmptyState, ErrorState, LoadingState } from "@/components/feedback";
import { Section } from "@/components/layout";
import { StudyDialog, StudyText } from "@/components/ui";
import { useAuth } from "@/hooks";
import type { Guid } from "@/types/api";

export function AssignmentsPage() {
  const { user } = useAuth();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<Guid | "">("");

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

  const teacherCoursesQuery = useQuery({
    queryKey: ["teacher-courses-for-assignment-create"],
    enabled: Boolean(user && isTeacher && isCreateOpen),
    queryFn: () => teacherApi.courses.getCourses(),
  });

  const isLoading =
    teacherAssignmentsQuery.isLoading || studentAssignmentsQuery.isLoading;

  const isError =
    teacherAssignmentsQuery.isError || studentAssignmentsQuery.isError;

  const handleCreateOpenChange = async (open: boolean) => {
    setIsCreateOpen(open);

    if (open) {
      return;
    }

    setSelectedCourseId("");
    await teacherAssignmentsQuery.refetch();
  };

  if (isLoading) {
    return <LoadingState text="Loading assignments..." />;
  }

  if (isError) {
    return <ErrorState title="Could not load assignments." />;
  }

  const teacherCourses = teacherCoursesQuery.data ?? [];

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

      {isTeacher && (
        <StudyDialog
          open={isCreateOpen}
          onOpenChange={(details) => handleCreateOpenChange(details.open)}
          title="Create assignment"
          description="Choose a course and create a new assignment."
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
                  <CreateAssignmentForm
                    courseId={selectedCourseId}
                    onSuccess={() => {
                      setIsCreateOpen(false);
                      setSelectedCourseId("");
                    }}
                  />
                ) : (
                  <StudyText variant="muted">
                    Select a course before creating an assignment.
                  </StudyText>
                )}
              </>
            ) : (
              <EmptyState
                icon={<LuClipboardList />}
                title="No courses available"
                description="You need a course before creating assignments."
              />
            )}
          </Stack>
        </StudyDialog>
      )}
    </>
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
