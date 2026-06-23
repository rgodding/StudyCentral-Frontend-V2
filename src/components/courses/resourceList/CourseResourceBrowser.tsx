import { Box, Grid, HStack, Stack } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { LuFile, LuFolderOpen, LuMoveLeft } from "react-icons/lu";

import { EmptyState } from "@/components/feedback";
import { PageFrame } from "@/components/layout";
import { StudyButton, StudyCard, StudyText } from "@/components/ui";
import type { Guid, StudyFileDto, StudyFolderDto } from "@/types/api";
import {
  buildCourseFolderContentRows,
  buildCourseResourceRows,
  searchCourseResourceRows,
  type CourseResourceRow as CourseResourceRowType,
  type CourseResourceViewMode,
} from "@/utils/resources";

import { CourseResourceFilePreviewCard } from "./CourseResourceFilePreviewCard";
import { CourseResourceFullList } from "./CourseResourceFullList";
import { CourseResourcePreviewPanel } from "./CourseResourcePreviewPanel";
import { CourseResourceRow } from "./CourseResourceRow";
import { CourseResourceToolbar } from "./CourseResourceToolbar";
import { CourseResourceTreeList } from "./CourseResourceTreeList";

type CourseResourceBrowserProps = {
  folders: StudyFolderDto[];
  files: StudyFileDto[];
  canManageResources?: boolean;
  isRefreshing?: boolean;
  onRefresh?: () => void;
  onCreateFolder?: () => void;
  onUploadFile?: () => void;
  onDownloadFile?: (row: CourseResourceRowType) => void;
};

const courseResourceBrowserText = {
  emptyTitle: "No resources yet",
  emptyDescription: "Folders and files for this course will appear here.",
  noSearchResultsTitle: "No matching resources",
  noSearchResultsDescription: "Try searching for another folder or file.",
  back: "Back",
  resultCount: (count: number) =>
    count === 1 ? "1 resource" : `${count} resources`,
};

type FolderExpansionOverrides = Record<Guid, boolean>;

function getExpandedFolderIds(
  folders: StudyFolderDto[],
  folderExpansionOverrides: FolderExpansionOverrides,
) {
  return new Set<Guid>(
    folders
      .filter((folder) => folderExpansionOverrides[folder.id] === true)
      .map((folder) => folder.id),
  );
}
function flattenSearchRows(rows: CourseResourceRowType[]) {
  return rows.map((row) => ({
    ...row,
    depth: 0,
  }));
}

export function CourseResourceBrowser({
  folders,
  files,
  canManageResources = false,
  isRefreshing = false,
  onRefresh,
  onCreateFolder,
  onUploadFile,
  onDownloadFile,
}: CourseResourceBrowserProps) {
  const [searchValue, setSearchValue] = useState("");
  const [viewMode, setViewMode] = useState<CourseResourceViewMode>("split");
  const [selectedRowId, setSelectedRowId] = useState<Guid | null>(null);
  const [currentFolderId, setCurrentFolderId] = useState<Guid | null>(null);
  const [folderExpansionOverrides, setFolderExpansionOverrides] =
    useState<FolderExpansionOverrides>({});

  const expandedFolderIds = useMemo(
    () => getExpandedFolderIds(folders, folderExpansionOverrides),
    [folders, folderExpansionOverrides],
  );

  const visibleRows = useMemo(
    () =>
      buildCourseResourceRows({
        folders,
        files,
        expandedFolderIds,
      }),
    [folders, files, expandedFolderIds],
  );

  const allRows = useMemo(
    () =>
      buildCourseResourceRows({
        folders,
        files,
        expandedFolderIds: new Set(folders.map((folder) => folder.id)),
      }),
    [folders, files],
  );

  const fullListRows = useMemo(
    () =>
      buildCourseFolderContentRows({
        folders,
        files,
        parentFolderId: currentFolderId,
      }),
    [folders, files, currentFolderId],
  );

  const isSearching = searchValue.trim().length > 0;

  const searchAllRows = isSearching ? flattenSearchRows(allRows) : visibleRows;
  const searchFullListRows = isSearching
    ? flattenSearchRows(allRows)
    : fullListRows;

  const filteredVisibleRows = useMemo(
    () =>
      searchCourseResourceRows({
        rows: searchAllRows,
        searchValue,
      }),
    [searchAllRows, searchValue],
  );

  const filteredFullListRows = useMemo(
    () =>
      searchCourseResourceRows({
        rows: searchFullListRows,
        searchValue,
      }),
    [searchFullListRows, searchValue],
  );

  const selectedRow =
    allRows.find((row) => row.kind === "file" && row.id === selectedRowId) ??
    null;

  const hasResources = folders.length > 0 || files.length > 0;
  const hasVisibleSearchResults = filteredVisibleRows.length > 0;
  const hasFullListSearchResults = filteredFullListRows.length > 0;

  const isFullView = viewMode === "full";
  const isTreeView = viewMode === "tree";
  const isFullPagePreview = viewMode !== "split" && Boolean(selectedRow?.file);

  function handleToggleFolder(folderId: Guid) {
    setFolderExpansionOverrides((currentOverrides) => {
      const isCurrentlyExpanded = currentOverrides[folderId] === true;

      return {
        ...currentOverrides,
        [folderId]: !isCurrentlyExpanded,
      };
    });
  }

  function handleSelectRow(row: CourseResourceRowType) {
    if (row.kind !== "file") {
      return;
    }

    setSelectedRowId(row.id);
  }

  function handlePreviewFile(row: CourseResourceRowType) {
    if (row.kind !== "file") {
      return;
    }

    setSelectedRowId(row.id);
  }

  function handleCloseFullPagePreview() {
    setSelectedRowId(null);
  }

  function handleOpenFullListFolder(folderId: Guid) {
    setCurrentFolderId(folderId);
  }

  function handleBackFullListFolder() {
    if (!currentFolderId) {
      return;
    }

    const currentFolder = folders.find(
      (folder) => folder.id === currentFolderId,
    );

    setCurrentFolderId(currentFolder?.parentFolderId ?? null);
  }

  const toolbar = (
    <CourseResourceToolbar
      searchValue={searchValue}
      viewMode={viewMode}
      canManageResources={canManageResources}
      isRefreshing={isRefreshing}
      onSearchChange={setSearchValue}
      onViewModeChange={setViewMode}
      onRefresh={onRefresh}
      onCreateFolder={onCreateFolder}
      onUploadFile={onUploadFile}
    />
  );

  const emptyState = (
    <EmptyState
      size="sm"
      icon={<LuFolderOpen />}
      title={courseResourceBrowserText.emptyTitle}
      description={courseResourceBrowserText.emptyDescription}
    />
  );

  const noSearchResultsState = (
    <EmptyState
      size="sm"
      icon={<LuFolderOpen />}
      title={courseResourceBrowserText.noSearchResultsTitle}
      description={courseResourceBrowserText.noSearchResultsDescription}
    />
  );

  if (isFullPagePreview && selectedRow?.file) {
    return (
      <Box px={{ base: 4, md: 6 }} py={{ base: 4, md: 5 }}>
        <PageFrame frameWidth="large" variant="plain">
          <StudyCard h="full" p={0} overflow="hidden">
            <Stack gap={0}>
              <HStack
                gap={4}
                px={4}
                py={3}
                borderBottomWidth="1px"
                borderColor="borderSubtle"
              >
                <StudyButton
                  variant="ghost"
                  size="sm"
                  onClick={handleCloseFullPagePreview}
                >
                  <HStack as="span" gap={2}>
                    <LuMoveLeft />
                    <span>{courseResourceBrowserText.back}</span>
                  </HStack>
                </StudyButton>

                <Box h="24px" w="1px" bg="borderSubtle" flexShrink={0} />

                <HStack gap={3} minW={0}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    w="34px"
                    h="34px"
                    rounded="button"
                    borderWidth="1px"
                    borderColor="borderSubtle"
                    color="textMain"
                    flexShrink={0}
                  >
                    <LuFile />
                  </Box>

                  <Stack gap={0} minW={0}>
                    <StudyText fontWeight="semibold" truncate>
                      {selectedRow.file.fileName}
                    </StudyText>

                    <StudyText variant="muted" size="sm" truncate>
                      {selectedRow.file.contentType}
                    </StudyText>
                  </Stack>
                </HStack>
              </HStack>

              <CourseResourceFilePreviewCard
                file={selectedRow.file}
                showHeader={false}
                isFullPagePreview
                onDownloadFile={() => onDownloadFile?.(selectedRow)}
              />
            </Stack>
          </StudyCard>
        </PageFrame>
      </Box>
    );
  }

  if (isFullView) {
    return (
      <Box px={{ base: 4, md: 6 }} py={{ base: 4, md: 5 }}>
        <PageFrame frameWidth="large" variant="plain">
          <StudyCard h="full" p={0} overflow="hidden">
            <Stack gap={0}>
              <Stack
                gap={0}
                px={4}
                py={3}
                borderBottomWidth="1px"
                borderColor="borderSubtle"
              >
                {toolbar}
              </Stack>

              {!hasResources ? (
                <Stack p={4}>{emptyState}</Stack>
              ) : !hasFullListSearchResults ? (
                <Stack p={4}>{noSearchResultsState}</Stack>
              ) : (
                <CourseResourceFullList
                  rows={filteredFullListRows}
                  currentFolderId={currentFolderId}
                  onOpenFolder={handleOpenFullListFolder}
                  onBack={handleBackFullListFolder}
                  onPreviewFile={handlePreviewFile}
                  onDownloadFile={onDownloadFile}
                />
              )}
            </Stack>
          </StudyCard>
        </PageFrame>
      </Box>
    );
  }

  if (isTreeView) {
    return (
      <Box px={{ base: 4, md: 6 }} py={{ base: 4, md: 5 }}>
        <PageFrame frameWidth="large" variant="plain">
          <StudyCard h="full" p={0} overflow="hidden">
            <Stack gap={0}>
              <Stack
                gap={0}
                px={4}
                py={3}
                borderBottomWidth="1px"
                borderColor="borderSubtle"
              >
                {toolbar}
              </Stack>

              {!hasResources ? (
                <Stack p={4}>{emptyState}</Stack>
              ) : !hasVisibleSearchResults ? (
                <Stack p={4}>{noSearchResultsState}</Stack>
              ) : (
                <CourseResourceTreeList
                  rows={filteredVisibleRows}
                  onToggleFolder={handleToggleFolder}
                  onPreviewFile={handlePreviewFile}
                  onDownloadFile={onDownloadFile}
                />
              )}
            </Stack>
          </StudyCard>
        </PageFrame>
      </Box>
    );
  }

  const splitRows = (
    <>
      {!hasResources ? (
        emptyState
      ) : !hasVisibleSearchResults ? (
        noSearchResultsState
      ) : (
        <Stack gap={3}>
          <StudyText variant="subtle" size="xs">
            {courseResourceBrowserText.resultCount(filteredVisibleRows.length)}
          </StudyText>

          <Stack gap={2}>
            {filteredVisibleRows.map((row) => (
              <CourseResourceRow
                key={`${row.kind}-${row.id}`}
                row={row}
                selected={row.kind === "file" && row.id === selectedRow?.id}
                showExpandToggle
                onClick={handleSelectRow}
                onToggleFolder={handleToggleFolder}
              />
            ))}
          </Stack>
        </Stack>
      )}
    </>
  );

  return (
    <Box
      w="full"
      maxW="none"
      bg="panelBg"
      px={{ base: 4, md: 6 }}
      py={{ base: 4, md: 4 }}
    >
      <Grid
        w="full"
        maxW="none"
        h={{
          base: "auto",
          xl: "calc(100vh - 145px)",
        }}
        minH={{
          base: "auto",
          xl: "0",
        }}
        templateColumns={{
          base: "1fr",
          xl: "minmax(420px, 460px) minmax(0, 1fr)",
        }}
        gap={4}
        alignItems="stretch"
        overflow="hidden"
      >
        <StudyCard h="full" minH={0} overflow="hidden">
          <Stack h="full" minH={0} gap={4}>
            {toolbar}

            <Box flex="1" minH={0} overflowY="auto" pr={1}>
              {splitRows}
            </Box>
          </Stack>
        </StudyCard>

        <Box h="full" minH={0} overflow="hidden">
          <CourseResourcePreviewPanel
            selectedRow={selectedRow}
            onDownloadFile={onDownloadFile}
          />
        </Box>
      </Grid>
    </Box>
  );
}
