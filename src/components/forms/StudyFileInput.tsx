import { HStack, Input, Stack, type BoxProps } from "@chakra-ui/react";
import type { ChangeEvent, ReactNode } from "react";
import { useRef } from "react";

import {
  StudyBox,
  StudyButton,
  StudyChip,
  StudyDivider,
  StudyText,
} from "@/components/ui";
import { getFileKind, getFileNameParts } from "@/utils/fileUtils";

export type StudyFileInputProps = Omit<BoxProps, "onChange"> & {
  label?: ReactNode;
  accept?: string;
  disabled?: boolean;
  selectedFiles?: File[];
  maxFiles?: number;
  helperText?: ReactNode;
  onChange: (files: File[]) => void;
};

export function StudyFileInput({
  label,
  accept,
  disabled = false,
  selectedFiles = [],
  helperText,
  maxFiles = 1,
  onChange,
  ...props
}: StudyFileInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const resolvedMaxFiles = Math.max(maxFiles, 1);
  const hasReachedMaxFiles = selectedFiles.length >= resolvedMaxFiles;
  const isInputDisabled = disabled || hasReachedMaxFiles;

  function handleClick() {
    if (isInputDisabled) {
      return;
    }

    inputRef.current?.click();
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const pickedFiles = Array.from(event.target.files ?? []);
    const availableSlots = Math.max(resolvedMaxFiles - selectedFiles.length, 0);
    const filesToAdd = pickedFiles.slice(0, availableSlots);

    if (filesToAdd.length > 0) {
      onChange([...selectedFiles, ...filesToAdd]);
    }

    event.target.value = "";
  }

  function handleRemove(fileIndex: number) {
    onChange(selectedFiles.filter((_, index) => index !== fileIndex));
  }

  return (
    <StudyBox
      variant="surface"
      w="full"
      rounded="card"
      borderWidth="1px"
      borderColor="borderSubtle"
      p={2}
      {...props}
    >
      <Input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={resolvedMaxFiles > 1}
        disabled={isInputDisabled}
        display="none"
        onChange={handleChange}
      />

      <HStack align="stretch" gap={3}>
        <Stack gap={2} flexShrink={0} maxW="180px" justify="center" pr={2}>
          {helperText && (
            <StudyText variant="subtle" lineClamp={1}>
              {helperText}
            </StudyText>
          )}

          <StudyButton
            type="button"
            variant="secondary"
            size="sm"
            disabled={isInputDisabled}
            onClick={handleClick}
          >
            {label ?? "Select files"}
          </StudyButton>

          <StudyText variant="subtle">
            {selectedFiles.length}/{resolvedMaxFiles} selected
          </StudyText>
        </Stack>

        <StudyDivider orientation="vertical" />

        <StudyBox
          variant="plain"
          flex="1"
          minW={0}
          maxH="88px"
          overflowY="auto"
          overflowX="hidden"
          pr={1}
          display="flex"
          alignItems="center"
        >
          {selectedFiles.length > 0 ? (
            <StudyBox
              variant="plain"
              display="grid"
              gridTemplateColumns="repeat(auto-fill, minmax(185px, max-content))"
              gap={1}
              alignItems="center"
              w="full"
            >
              {selectedFiles.map((file, index) => {
                const { base, extension } = getFileNameParts(file.name, 14);
                const fileKind = getFileKind(file);

                return (
                  <StudyChip
                    key={`${file.name}-${file.size}-${index}`}
                    removable
                    variant="subtle"
                    size="sm"
                    removeLabel={`Remove ${file.name}`}
                    onRemove={() => handleRemove(index)}
                    w="185px"
                    maxW="185px"
                    minW={0}
                  >
                    <HStack gap={2} minW={0} w="full">
                      <StudyBox
                        variant="subtle"
                        flexShrink={0}
                        minW="32px"
                        px={1.5}
                        py={0.5}
                        rounded="sm"
                        color="textSubtle"
                        fontSize="10px"
                        fontWeight="semibold"
                        textAlign="center"
                        lineHeight="1.2"
                      >
                        {fileKind}
                      </StudyBox>

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
                          <StudyText
                            variant="muted"
                            flexShrink={0}
                            fontSize="xs"
                          >
                            {extension}
                          </StudyText>
                        )}
                      </HStack>
                    </HStack>
                  </StudyChip>
                );
              })}
            </StudyBox>
          ) : (
            <StudyText variant="subtle">No file selected.</StudyText>
          )}
        </StudyBox>
      </HStack>
    </StudyBox>
  );
}