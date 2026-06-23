import { Box, HStack } from "@chakra-ui/react";
import type { ReactNode } from "react";
import {
  LuFolderPlus,
  LuLayoutList,
  LuPanelLeft,
  LuRefreshCw,
  LuRows3,
  LuUpload,
} from "react-icons/lu";

import {
  StudyButton,
  StudyIconButton,
  StudySearchInput,
  StudyText,
  StudyTooltip,
} from "@/components/ui";
import type { CourseResourceViewMode } from "@/utils/resources";

type CourseResourceToolbarProps = {
  title?: string;
  searchValue: string;
  viewMode: CourseResourceViewMode;
  canManageResources?: boolean;
  isRefreshing?: boolean;
  onSearchChange: (value: string) => void;
  onViewModeChange: (viewMode: CourseResourceViewMode) => void;
  onRefresh?: () => void;
  onCreateFolder?: () => void;
  onUploadFile?: () => void;
};

type ViewModeItem = {
  value: CourseResourceViewMode;
  label: string;
  icon: ReactNode;
};

const courseResourceToolbarText = {
  searchPlaceholder: "Search folders and files",
  clearSearch: "Clear search",
  splitView: "Split view",
  fullListView: "Full list view",
  treeView: "Tree view",
  refresh: "Refresh resources",
  createFolder: "Create folder",
  uploadFile: "Upload file",
};

const viewModeItems: ViewModeItem[] = [
  {
    value: "split",
    label: courseResourceToolbarText.splitView,
    icon: <LuPanelLeft />,
  },
  {
    value: "full",
    label: courseResourceToolbarText.fullListView,
    icon: <LuLayoutList />,
  },
  {
    value: "tree",
    label: courseResourceToolbarText.treeView,
    icon: <LuRows3 />,
  },
];

export function CourseResourceToolbar({
  title,
  searchValue,
  viewMode,
  canManageResources = false,
  isRefreshing = false,
  onSearchChange,
  onViewModeChange,
  onRefresh,
  onCreateFolder,
  onUploadFile,
}: CourseResourceToolbarProps) {
  return (
    <HStack gap={3} align="center" justify="space-between" w="full" wrap="wrap">
      <StudySearchInput
        value={searchValue}
        placeholder={courseResourceToolbarText.searchPlaceholder}
        clearLabel={courseResourceToolbarText.clearSearch}
        onClear={() => onSearchChange("")}
        onChange={(event) => onSearchChange(event.target.value)}
        wrapperProps={{
          flex: title ? "0 1 360px" : "1 1 240px",
          minW: "220px",
          maxW: title ? "360px" : "full",
        }}
      />

      {title && (
        <Box flex="1" minW="180px" textAlign="center">
          <StudyText
            variant="label"
            size="sm"
            color="textMain"
            fontWeight="semibold"
          >
            {title}
          </StudyText>
        </Box>
      )}

      <HStack gap={2} flexShrink={0}>
        {viewModeItems.map((item) => {
          const active = item.value === viewMode;

          return (
            <StudyTooltip key={item.value} content={item.label}>
              <StudyIconButton
                aria-label={item.label}
                variant={active ? "primary" : "secondary"}
                size="sm"
                onClick={() => onViewModeChange(item.value)}
              >
                {item.icon}
              </StudyIconButton>
            </StudyTooltip>
          );
        })}

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