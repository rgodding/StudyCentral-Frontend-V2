import { Stack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { teacherApi } from "@/api/teacherApi";
import { StudyField, StudyFileInput, StudyInput } from "@/components/forms";
import { StudyButton, StudyText } from "@/components/ui";
import type { Guid } from "@/types/api";

import {
  uploadResourceFilesSchema,
  type UploadResourceFilesFormData,
} from "./uploadResourceFilesSchema";

type UploadResourceFilesFormProps = {
  folderId: Guid | null;
  onSuccess?: () => Promise<void> | void;
};

const uploadResourceFilesFormText = {
  fileLabel: "Select files",
  fileHelper: "Upload files to the current folder.",
  altTextLabel: "Alt text",
  altTextPlaceholder: "Optional description for uploaded files",
  submit: "Add files",
  noFolderSelected:
    "Open a folder before adding files. The current backend upload route requires a folder id.",
  noFilesSelected: "Select at least one file.",
  uploadFailed: "Could not upload files.",
};

const defaultValues: UploadResourceFilesFormData = {
  altText: "",
};

export function UploadResourceFilesForm({
  folderId,
  onSuccess,
}: UploadResourceFilesFormProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UploadResourceFilesFormData>({
    resolver: zodResolver(uploadResourceFilesSchema),
    defaultValues,
  });

  const uploadFilesMutation = useMutation({
    mutationFn: async (data: UploadResourceFilesFormData) => {
      if (!folderId) {
        throw new Error(uploadResourceFilesFormText.noFolderSelected);
      }

      if (selectedFiles.length === 0) {
        throw new Error(uploadResourceFilesFormText.noFilesSelected);
      }

      const altText = data.altText?.trim() || undefined;

      await Promise.all(
        selectedFiles.map((file) =>
          teacherApi.studyFolders.uploadFile(folderId, file, altText),
        ),
      );
    },

    onSuccess: async () => {
      reset(defaultValues);
      setSelectedFiles([]);
      setFileError(null);
      await onSuccess?.();
    },

    onError: (error) => {
      if (error instanceof Error) {
        setFileError(error.message);
        return;
      }

      setFileError(uploadResourceFilesFormText.uploadFailed);
    },
  });

  function onSubmit(data: UploadResourceFilesFormData) {
    setFileError(null);

    if (selectedFiles.length === 0) {
      setFileError(uploadResourceFilesFormText.noFilesSelected);
      return;
    }

    uploadFilesMutation.mutate(data);
  }

  if (!folderId) {
    return (
      <StudyText variant="muted">
        {uploadResourceFilesFormText.noFolderSelected}
      </StudyText>
    );
  }

  return (
    <Stack as="form" gap={4} onSubmit={handleSubmit(onSubmit)}>
      <StudyFileInput
        label={uploadResourceFilesFormText.fileLabel}
        helperText={uploadResourceFilesFormText.fileHelper}
        selectedFiles={selectedFiles}
        maxFiles={10}
        disabled={uploadFilesMutation.isPending}
        onChange={setSelectedFiles}
      />

      {fileError && (
        <StudyText color="dangerText" fontSize="sm">
          {fileError}
        </StudyText>
      )}

      <StudyField
        label={uploadResourceFilesFormText.altTextLabel}
        errorText={errors.altText?.message}
      >
        <StudyInput
          placeholder={uploadResourceFilesFormText.altTextPlaceholder}
          disabled={uploadFilesMutation.isPending}
          {...register("altText")}
        />
      </StudyField>

      <StudyButton
        type="submit"
        variant="primary"
        loading={uploadFilesMutation.isPending}
        alignSelf="flex-end"
      >
        {uploadResourceFilesFormText.submit}
      </StudyButton>
    </Stack>
  );
}