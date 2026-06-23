import { useMutation, useQueryClient } from "@tanstack/react-query";

import { teacherApi } from "@/api/teacherApi";
import type { AssignmentDto, CreateAssignmentDto } from "@/types/api";

export type CreateAssignmentInput = CreateAssignmentDto & {
  files: File[];
};

export function useCreateAssignment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      files,
      ...dto
    }: CreateAssignmentInput): Promise<AssignmentDto> => {
      const assignment = await teacherApi.assignments.createAssignment(dto);

      await Promise.all(
        files.map((file) => teacherApi.assignments.uploadFile(assignment.id, file)),
      );

      return assignment;
    },

    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["teacher-assignments"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["teacher-course-assignments", variables.courseId],
        }),
      ]);
    },
  });
}