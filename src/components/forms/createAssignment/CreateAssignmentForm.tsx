import { Stack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { teacherApi } from "@/api/teacherApi";
import {
  StudyField,
  StudyFilePicker,
  StudyInput,
  StudyTextarea,
} from "@/components/forms";
import { StudyButton } from "@/components/ui";
import type { Guid } from "@/types/api";

import {
  createAssignmentSchema,
  type CreateAssignmentFormData,
} from "./createAssignmentSchema";

type CreateAssignmentFormProps = {
  courseId: Guid;
  onSuccess?: () => Promise<void> | void;
};

const defaultValues: CreateAssignmentFormData = {
  name: "",
  description: "",
  deadline: "",
};

function toIsoDateTime(value?: string) {
  if (!value) {
    return undefined;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return date.toISOString();
}

export function CreateAssignmentForm({
  courseId,
  onSuccess,
}: CreateAssignmentFormProps) {
  const queryClient = useQueryClient();
  const [files, setFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateAssignmentFormData>({
    resolver: zodResolver(createAssignmentSchema),
    defaultValues,
  });

  const createAssignmentMutation = useMutation({
    mutationFn: async (data: CreateAssignmentFormData) => {
      const assignment = await teacherApi.assignments.createAssignment({
        name: data.name.trim(),
        description: data.description?.trim() ?? "",
        deadline: toIsoDateTime(data.deadline),
        courseId,
      });

      if (files.length > 0) {
        await Promise.all(
          files.map((file) =>
            teacherApi.assignments.uploadFile(assignment.id, file),
          ),
        );
      }

      return assignment;
    },

    onSuccess: async (assignment) => {
      reset(defaultValues);
      setFiles([]);

      await onSuccess?.();

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["teacher-assignments"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["teacher-course-assignments", courseId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["assignment-files", assignment.id],
        }),
      ]);
    },

    onError: (error) => {
      console.error(error);
    },
  });

  function onSubmit(data: CreateAssignmentFormData) {
    createAssignmentMutation.mutate(data);
  }

  return (
    <CreateAssignmentFormContent
      register={register}
      errors={errors}
      files={files}
      isSubmitting={createAssignmentMutation.isPending}
      onFilesChange={setFiles}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
}

type CreateAssignmentFormContentProps = {
  register: ReturnType<typeof useForm<CreateAssignmentFormData>>["register"];
  errors: ReturnType<
    typeof useForm<CreateAssignmentFormData>
  >["formState"]["errors"];
  files: File[];
  isSubmitting: boolean;
  onFilesChange: (files: File[]) => void;
  onSubmit: () => void;
};

function CreateAssignmentFormContent({
  register,
  errors,
  files,
  isSubmitting,
  onFilesChange,
  onSubmit,
}: CreateAssignmentFormContentProps) {
  return (
    <Stack as="form" gap={4} onSubmit={onSubmit}>
      <StudyField label="Name" errorText={errors.name?.message} required>
        <StudyInput
          placeholder="Assignment name"
          disabled={isSubmitting}
          {...register("name")}
        />
      </StudyField>

      <StudyField label="Description" errorText={errors.description?.message}>
        <StudyTextarea
          minH="160px"
          resize="vertical"
          placeholder="Write the assignment description..."
          disabled={isSubmitting}
          {...register("description")}
        />
      </StudyField>

      <StudyField label="Deadline" errorText={errors.deadline?.message}>
        <StudyInput
          type="datetime-local"
          disabled={isSubmitting}
          {...register("deadline")}
        />
      </StudyField>

      <StudyFilePicker
        files={files}
        onFilesChange={onFilesChange}
        label="Add files"
        helperText="Optional assignment attachments."
        maxFiles={10}
        disabled={isSubmitting}
      />

      <StudyButton
        type="submit"
        variant="primary"
        loading={isSubmitting}
        alignSelf="flex-end"
      >
        Create assignment
      </StudyButton>
    </Stack>
  );
}