import { Stack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { teacherApi } from "@/api/teacherApi";
import { StudyField, StudyInput } from "@/components/forms";
import { StudyButton } from "@/components/ui";
import type { Guid } from "@/types/api";

import {
  createResourceFolderSchema,
  type CreateResourceFolderFormData,
} from "./createResourceFolderSchema";

type CreateResourceFolderFormProps = {
  courseId: Guid;
  parentFolderId: Guid | null;
  onSuccess?: () => Promise<void> | void;
};

const createResourceFolderFormText = {
  nameLabel: "Folder name",
  namePlaceholder: "Folder name",
  submit: "Create folder",
};

const defaultValues: CreateResourceFolderFormData = {
  name: "",
};

export function CreateResourceFolderForm({
  courseId,
  parentFolderId,
  onSuccess,
}: CreateResourceFolderFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateResourceFolderFormData>({
    resolver: zodResolver(createResourceFolderSchema),
    defaultValues,
  });

  const createFolderMutation = useMutation({
    mutationFn: (data: CreateResourceFolderFormData) =>
      teacherApi.studyFolders.createFolder({
        name: data.name.trim(),
        courseId,
        parentFolderId,
      }),

    onSuccess: async () => {
      reset(defaultValues);
      await onSuccess?.();
    },

    onError: (error) => {
      console.error(error);
    },
  });

  function onSubmit(data: CreateResourceFolderFormData) {
    createFolderMutation.mutate(data);
  }

  return (
    <Stack as="form" gap={4} onSubmit={handleSubmit(onSubmit)}>
      <StudyField
        label={createResourceFolderFormText.nameLabel}
        errorText={errors.name?.message}
        required
      >
        <StudyInput
          placeholder={createResourceFolderFormText.namePlaceholder}
          disabled={createFolderMutation.isPending}
          {...register("name")}
        />
      </StudyField>

      <StudyButton
        type="submit"
        variant="primary"
        loading={createFolderMutation.isPending}
        alignSelf="flex-end"
      >
        {createResourceFolderFormText.submit}
      </StudyButton>
    </Stack>
  );
}