import { Box, Input, Stack, type BoxProps } from "@chakra-ui/react";
import type { ChangeEvent } from "react";
import { useRef } from "react";

import { StudyButton } from "@/components/ui/StudyButton";
import { StudyText } from "@/components/ui/StudyText";

type StudyFileInputProps = Omit<BoxProps, "onChange"> & {
  label?: string;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  selectedFiles?: File[];
  onChange: (files: File[]) => void;
};

export function StudyFileInput({
  label = "Choose file",
  accept,
  multiple = false,
  disabled = false,
  selectedFiles = [],
  onChange,
  ...props
}: StudyFileInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleClick() {
    if (disabled) return;
    inputRef.current?.click();
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    onChange(files);
  }

  return (
    <Box
      w="full"
      rounded="card"
      borderWidth="1px"
      borderColor="borderSubtle"
      bg="surfaceBg"
      p={4}
      {...props}
    >
      <Stack gap={3}>
        <Box>
          <Input
            ref={inputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            disabled={disabled}
            display="none"
            onChange={handleChange}
          />

          <StudyButton
            type="button"
            variant="secondary"
            disabled={disabled}
            onClick={handleClick}
          >
            {label}
          </StudyButton>
        </Box>

        {selectedFiles.length > 0 ? (
          <Stack gap={1}>
            {selectedFiles.map((file) => (
              <StudyText key={`${file.name}-${file.size}`} variant="muted">
                {file.name}
              </StudyText>
            ))}
          </Stack>
        ) : (
          <StudyText variant="subtle">No file selected.</StudyText>
        )}
      </Stack>
    </Box>
  );
}
