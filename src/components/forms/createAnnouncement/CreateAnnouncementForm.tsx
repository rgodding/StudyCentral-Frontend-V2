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
import type { Guid } from "@/types/api";

import {
  createAnnouncementSchema,
  type CreateAnnouncementFormData,
} from "./createAnnouncementSchema";
import { StudyButton } from "@/components/ui";

type CreateAnnouncementFormProps = {
  courseId: Guid;
  onSuccess?: () => Promise<void> | void;
};

const defaultValues: CreateAnnouncementFormData = {
  name: "",
  content: "",
};

export function CreateAnnouncementForm({
  courseId,
  onSuccess,
}: CreateAnnouncementFormProps) {
  const queryClient = useQueryClient();
  const [files, setFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateAnnouncementFormData>({
    resolver: zodResolver(createAnnouncementSchema),
    defaultValues,
  });

  const createAnnouncementMutation = useMutation({
    mutationFn: async (data: CreateAnnouncementFormData) => {
      const announcement = await teacherApi.announcements.createAnnouncement({
        name: data.name.trim(),
        content: data.content.trim(),
        courseId,
      });

      await Promise.all(
        files.map((file) =>
          teacherApi.announcements.uploadFile(announcement.id, file),
        ),
      );

      return announcement;
    },

    onSuccess: async (announcement) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["teacher-announcements"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["course-announcements", "Teacher", courseId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["announcement-files", announcement.id],
        }),
      ]);

      reset(defaultValues);
      setFiles([]);

      await onSuccess?.();
    },
  });

  function onSubmit(data: CreateAnnouncementFormData) {
    createAnnouncementMutation.mutate(data);
  }

  return (
    <CreateAnnouncementFormContent
      register={register}
      errors={errors}
      files={files}
      isSubmitting={createAnnouncementMutation.isPending}
      onFilesChange={setFiles}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
}

type CreateAnnouncementFormContentProps = {
  register: ReturnType<typeof useForm<CreateAnnouncementFormData>>["register"];
  errors: ReturnType<typeof useForm<CreateAnnouncementFormData>>["formState"]["errors"];
  files: File[];
  isSubmitting: boolean;
  onFilesChange: (files: File[]) => void;
  onSubmit: () => void;
};

function CreateAnnouncementFormContent({
  register,
  errors,
  files,
  isSubmitting,
  onFilesChange,
  onSubmit,
}: CreateAnnouncementFormContentProps) {
  return (
    <Stack as="form" gap={4} onSubmit={onSubmit}>
      <StudyField label="Title" errorText={errors.name?.message} required>
        <StudyInput
          placeholder="Announcement title"
          disabled={isSubmitting}
          {...register("name")}
        />
      </StudyField>

      <StudyField label="Content" errorText={errors.content?.message} required>
        <StudyTextarea
          minH="180px"
          resize="vertical"
          placeholder="Write the announcement..."
          disabled={isSubmitting}
          {...register("content")}
        />
      </StudyField>

      <StudyFilePicker
        files={files}
        onFilesChange={onFilesChange}
        label="Add files"
        helperText="Optional announcement attachments."
        maxFiles={10}
        disabled={isSubmitting}
      />

      <StudyButton
        type="submit"
        variant="primary"
        loading={isSubmitting}
        alignSelf="flex-end"
      >
        Create announcement
      </StudyButton>
    </Stack>
  );
}