import { Box, HStack, Input, Stack, type BoxProps } from "@chakra-ui/react";
import type { ChangeEvent } from "react";
import { useRef } from "react";
import { LuPaperclip } from "react-icons/lu";

import {
  StudyButton,
  StudyChip,
  StudyDivider,
  StudyIconButton,
  StudyText,
} from "@/components/ui";
import { getFileKind, getFileNameParts } from "@/utils/fileUtils";

type StudyFilePickerProps = Omit<BoxProps, "onChange"> & {
  files: File[];
  onFilesChange: (files: File[]) => void;
  label?: string;
  helperText?: string;
  accept?: string;
  maxFiles?: number;
  disabled?: boolean;
};

export function StudyFilePicker({
  files,
  onFilesChange,
  label = "Add files",
  helperText,
  accept,
  maxFiles = 10,
  disabled = false,
  ...props
}: StudyFilePickerProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const hasReachedMaxFiles = files.length >= maxFiles;
  const isDisabled = disabled || hasReachedMaxFiles;

  function handleOpenFilePicker() {
    if (isDisabled) {
      return;
    }

    inputRef.current?.click();
  }

  function handleFilesChange(event: ChangeEvent<HTMLInputElement>) {
    const pickedFiles = Array.from(event.target.files ?? []);
    const availableSlots = Math.max(maxFiles - files.length, 0);
    const filesToAdd = pickedFiles.slice(0, availableSlots);

    onFilesChange([...files, ...filesToAdd]);

    event.target.value = "";
  }

  function handleRemoveFile(indexToRemove: number) {
    onFilesChange(files.filter((_, index) => index !== indexToRemove));
  }

  return (
    <Box
      w="full"
      rounded="card"
      borderWidth="1px"
      borderColor="borderSubtle"
      bg="surfaceBg"
      p={3}
      {...props}
    >
      <Input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={maxFiles > 1}
        display="none"
        disabled={isDisabled}
        onChange={handleFilesChange}
      />

      <Stack gap={3}>
        <HStack justify="space-between" gap={3}>
          <Stack gap={0.5} minW={0}>
            <StudyText variant="label">Files</StudyText>

            {helperText && (
              <StudyText variant="subtle" fontSize="xs">
                {helperText}
              </StudyText>
            )}
          </Stack>

          <StudyButton
            type="button"
            variant="secondary"
            size="sm"
            disabled={isDisabled}
            onClick={handleOpenFilePicker}
          >
            <LuPaperclip />
            {label}
          </StudyButton>
        </HStack>

        <StudyDivider />

        {files.length > 0 ? (
          <Box
            display="grid"
            gridTemplateColumns="repeat(auto-fill, minmax(190px, 1fr))"
            gap={2}
            maxH="140px"
            overflowY="auto"
            pr={1}
          >
            {files.map((file, index) => {
              const { base, extension } = getFileNameParts(file.name, 16);
              const fileKind = getFileKind(file);

              return (
                <StudyChip
                  key={`${file.name}-${file.size}-${index}`}
                  variant="subtle"
                  px={2}
                  py={1.5}
                  minW={0}
                >
                  <HStack gap={2} minW={0} w="full">
                    <Box
                      flexShrink={0}
                      minW="34px"
                      px={1.5}
                      py={0.5}
                      rounded="sm"
                      bg="panelBgSubtle"
                      borderWidth="1px"
                      borderColor="borderSubtle"
                      color="textSubtle"
                      fontSize="10px"
                      fontWeight="semibold"
                      textAlign="center"
                      lineHeight="1.2"
                    >
                      {fileKind}
                    </Box>

                    <HStack gap={0} minW={0} flex="1">
                      <StudyText
                        variant="muted"
                        truncate
                        minW={0}
                        fontSize="xs"
                      >
                        {base}
                      </StudyText>

                      {extension && (
                        <StudyText variant="muted" flexShrink={0} fontSize="xs">
                          {extension}
                        </StudyText>
                      )}
                    </HStack>

                    <StudyIconButton
                      aria-label={`Remove ${file.name}`}
                      variant="danger"
                      size="xs"
                      flexShrink={0}
                      onClick={() => handleRemoveFile(index)}
                    >
                      ×
                    </StudyIconButton>
                  </HStack>
                </StudyChip>
              );
            })}
          </Box>
        ) : (
          <StudyText variant="subtle" fontSize="sm">
            No files selected.
          </StudyText>
        )}

        <StudyText variant="subtle" fontSize="xs">
          {files.length}/{maxFiles} selected
        </StudyText>
      </Stack>
    </Box>
  );
}