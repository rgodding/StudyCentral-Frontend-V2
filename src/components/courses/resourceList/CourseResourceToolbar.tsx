import { HStack } from "@chakra-ui/react";
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

function getToolbarTitle(
  title: string | undefined,
  viewMode: CourseResourceViewMode,
) {
  if (title) {
    return title;
  }

  if (viewMode === "full") {
    return courseResourceToolbarText.fullListView;
  }

  if (viewMode === "tree") {
    return courseResourceToolbarText.treeView;
  }

  return undefined;
}

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
  const toolbarTitle = getToolbarTitle(title, viewMode);
  const isSplitView = viewMode === "split";

  return (
    <HStack gap={3} align="center" justify="space-between" w="full" wrap="wrap">
      <StudySearchInput
        value={searchValue}
        placeholder={courseResourceToolbarText.searchPlaceholder}
        clearLabel={courseResourceToolbarText.clearSearch}
        onClear={() => onSearchChange("")}
        onChange={(event) => onSearchChange(event.target.value)}
        wrapperProps={{
          flex: isSplitView ? "1 1 240px" : "0 0 360px",
          minW: isSplitView ? "220px" : "320px",
          maxW: isSplitView ? "full" : "360px",
        }}
      />

<HStack gap={3} flexShrink={0} ml="auto">
  {toolbarTitle && (
    <StudyText
      variant="label"
      size="md"
      color="textMain"
      fontWeight="bold"
      letterSpacing="-0.01em"
      whiteSpace="nowrap"
    >
      {toolbarTitle}
    </StudyText>
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
  </HStack>
  );
}