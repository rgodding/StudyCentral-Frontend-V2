import { HStack } from "@chakra-ui/react";
import { LuFolderPlus, LuRefreshCw, LuUpload } from "react-icons/lu";

import {
  StudyButton,
  StudyIconButton,
  StudySearchInput,
  StudyTooltip,
} from "@/components/ui";

type CourseResourceToolbarProps = {
  searchValue: string;
  canManageResources?: boolean;
  isRefreshing?: boolean;
  onSearchChange: (value: string) => void;
  onRefresh?: () => void;
  onCreateFolder?: () => void;
  onUploadFile?: () => void;
};

const courseResourceToolbarText = {
  searchPlaceholder: "Search resources...",
  clearSearch: "Clear search",
  refresh: "Refresh resources",
  createFolder: "Create folder",
  uploadFile: "Upload file",
};

export function CourseResourceToolbar({
  searchValue,
  canManageResources = false,
  isRefreshing = false,
  onSearchChange,
  onRefresh,
  onCreateFolder,
  onUploadFile,
}: CourseResourceToolbarProps) {
  return (
    <HStack gap={3} justify="space-between" align="center">
      <StudySearchInput
        value={searchValue}
        placeholder={courseResourceToolbarText.searchPlaceholder}
        clearLabel={courseResourceToolbarText.clearSearch}
        onClear={() => onSearchChange("")}
        onChange={(event) => onSearchChange(event.target.value)}
        wrapperProps={{
          flex: "1",
          minW: "220px",
        }}
      />

      <HStack gap={2} flexShrink={0}>
        {onRefresh && (
          <StudyTooltip content={courseResourceToolbarText.refresh}>
            <StudyIconButton
              aria-label={courseResourceToolbarText.refresh}
              variant="secondary"
              size="sm"
              disabled={isRefreshing}
              onClick={onRefresh}
            >
              <LuRefreshCw />
            </StudyIconButton>
          </StudyTooltip>
        )}

        {canManageResources && onCreateFolder && (
          <StudyButton variant="secondary" size="sm" onClick={onCreateFolder}>
            <HStack as="span" gap={2}>
              <LuFolderPlus />
              <span>{courseResourceToolbarText.createFolder}</span>
            </HStack>
          </StudyButton>
        )}

        {canManageResources && onUploadFile && (
          <StudyButton size="sm" onClick={onUploadFile}>
            <HStack as="span" gap={2}>
              <LuUpload />
              <span>{courseResourceToolbarText.uploadFile}</span>
            </HStack>
          </StudyButton>
        )}
      </HStack>
    </HStack>
  );
}