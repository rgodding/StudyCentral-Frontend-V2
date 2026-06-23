import { Box, NativeSelect, Stack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { LuClipboardList } from "react-icons/lu";

import { studentApi } from "@/api/studentApi";
import { teacherApi } from "@/api/teacherApi";
import { CreateAssignmentAction } from "@/components/courses/assignmentList/CreateAssignmentAction";
import { StudentAssignmentList } from "@/components/courses/assignmentList/StudentAssignmentList";
import { TeacherAssignmentList } from "@/components/courses/assignmentList/TeacherAssignmentList";
import { EmptyState, ErrorState, LoadingState } from "@/components/feedback";
import { CreateAssignmentForm } from "@/components/forms/createAssignment";
import { Section } from "@/components/layout";
import { StudyDialog, StudySegmentedControl, StudyText } from "@/components/ui";
import { useAuth } from "@/hooks";
import type { Guid } from "@/types/api";

type AssignmentFilter = "active" | "completed";

const assignmentsPageText = {
  title: "Assignments",
  createTitle: "Create assignment",
  createDescription: "Choose a course and create a new assignment.",
  loadingAssignments: "Loading assignments...",
  loadingCourses: "Loading courses...",
  loadAssignmentsError: "Could not load assignments.",
  loadCoursesError: "Could not load courses.",
  selectCourse: "Select course",
  selectCourseBeforeCreate: "Select a course before creating an assignment.",
  noCoursesTitle: "No courses available",
  noCoursesDescription: "You need a course before creating assignments.",
  noAssignmentsTitle: "No assignments yet",
  noAssignmentsDescription: "Assignments will appear here.",
  active: "Active",
  completed: "Completed",
};

export function AssignmentsPage() {
  const { user } = useAuth();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<Guid | "">("");
  const [studentAssignmentFilter, setStudentAssignmentFilter] =
    useState<AssignmentFilter>("active");

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

  async function handleCreateOpenChange(open: boolean) {
    setIsCreateOpen(open);

    if (open) {
      return;
    }

    setSelectedCourseId("");
    await teacherAssignmentsQuery.refetch();
  }

  async function handleCreateSuccess() {
    setIsCreateOpen(false);
    setSelectedCourseId("");
    await teacherAssignmentsQuery.refetch();
  }

  if (isLoading) {
    return <LoadingState text={assignmentsPageText.loadingAssignments} />;
  }

  if (isError) {
    return <ErrorState title={assignmentsPageText.loadAssignmentsError} />;
  }

  const teacherCourses = teacherCoursesQuery.data ?? [];

  return (
    <>
      <Stack gap={6}>
        <Section
          title={assignmentsPageText.title}
          headerIcon={<LuClipboardList />}
          actions={
            isTeacher ? (
              <CreateAssignmentAction onClick={() => setIsCreateOpen(true)} />
            ) : (
              <StudySegmentedControl
                value={studentAssignmentFilter}
                onValueChange={(details) =>
                  setStudentAssignmentFilter(details.value as AssignmentFilter)
                }
                controlVariant="subtle"
                controlSize="xs"
                items={[
                  {
                    value: "active",
                    label: assignmentsPageText.active,
                  },
                  {
                    value: "completed",
                    label: assignmentsPageText.completed,
                  },
                ]}
              />
            )
          }
        >
          {isTeacher ? (
            <TeacherAssignmentsContent
              assignments={teacherAssignmentsQuery.data ?? []}
            />
          ) : (
            <StudentAssignmentsContent
              assignments={studentAssignmentsQuery.data ?? []}
              filter={studentAssignmentFilter}
            />
          )}
        </Section>
      </Stack>

      {isTeacher && (
        <StudyDialog
          open={isCreateOpen}
          onOpenChange={(details) => void handleCreateOpenChange(details.open)}
          title={assignmentsPageText.createTitle}
          description={assignmentsPageText.createDescription}
          size="md"
          headerSeparator="belowTitle"
        >
          <Stack gap={4}>
            {teacherCoursesQuery.isLoading ? (
              <LoadingState text={assignmentsPageText.loadingCourses} />
            ) : teacherCoursesQuery.isError ? (
              <ErrorState title={assignmentsPageText.loadCoursesError} />
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
                    <option value="">{assignmentsPageText.selectCourse}</option>

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
                    onSuccess={handleCreateSuccess}
                  />
                ) : (
                  <StudyText variant="muted">
                    {assignmentsPageText.selectCourseBeforeCreate}
                  </StudyText>
                )}
              </>
            ) : (
              <EmptyState
                icon={<LuClipboardList />}
                title={assignmentsPageText.noCoursesTitle}
                description={assignmentsPageText.noCoursesDescription}
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
  filter: AssignmentFilter;
};

function StudentAssignmentsContent({
  assignments,
  filter,
}: StudentAssignmentsContentProps) {
  if (assignments.length === 0) {
    return <AssignmentsEmptyState />;
  }

  return <StudentAssignmentList assignments={assignments} filter={filter} />;
}

function AssignmentsEmptyState() {
  return (
    <Box>
      <EmptyState
        icon={<LuClipboardList />}
        title={assignmentsPageText.noAssignmentsTitle}
        description={assignmentsPageText.noAssignmentsDescription}
      />
    </Box>
  );
}