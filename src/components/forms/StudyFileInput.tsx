import { Box, HStack, Input, Stack, type BoxProps } from "@chakra-ui/react";
import type { ChangeEvent } from "react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

import {
  StudyButton,
  StudyChip,
  StudyDivider,
  StudyText,
} from "@/components/ui";
import { getFileKind, getFileNameParts } from "@/utils/fileUtils";

type StudyFileInputProps = Omit<BoxProps, "onChange"> & {
  label?: string;
  accept?: string;
  disabled?: boolean;
  selectedFiles?: File[];
  maxFiles?: number;
  helperText?: string;
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
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const hasReachedMaxFiles = selectedFiles.length >= maxFiles;
  const isInputDisabled = disabled || hasReachedMaxFiles;

  function handleClick() {
    if (isInputDisabled) return;
    inputRef.current?.click();
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const pickedFiles = Array.from(event.target.files ?? []);
    const availableSlots = Math.max(maxFiles - selectedFiles.length, 0);
    const filesToAdd = pickedFiles.slice(0, availableSlots);

    onChange([...selectedFiles, ...filesToAdd]);

    event.target.value = "";
  }

  function handleRemove(fileIndex: number) {
    onChange(selectedFiles.filter((_, index) => index !== fileIndex));
  }

  return (
    <Box
      w="full"
      rounded="card"
      borderWidth="1px"
      borderColor="borderSubtle"
      bg="surfaceBg"
      p={2}
      {...props}
    >
      <Input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={maxFiles > 1}
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
            {label ?? t("common.files.selectFiles")}
          </StudyButton>

          <StudyText variant="subtle">
            {t("common.files.selectedCount", {
              selectedCount: selectedFiles.length,
              maxFiles,
            })}
          </StudyText>
        </Stack>

        <StudyDivider orientation="vertical" />

        <Box
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
            <Box
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
                    removeLabel={t("common.files.removeFile", {
                      fileName: file.name,
                    })}
                    onRemove={() => handleRemove(index)}
                    w="185px"
                    maxW="185px"
                    minW={0}
                    px={2}
                    py={1}
                  >
                    <HStack gap={2} minW={0} w="full">
                      <Box
                        flexShrink={0}
                        minW="32px"
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
            </Box>
          ) : (
            <StudyText variant="subtle">
              {t("common.files.noFileSelected")}
            </StudyText>
          )}
        </Box>
      </HStack>
    </Box>
  );
}