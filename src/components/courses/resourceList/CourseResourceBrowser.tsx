import { Grid, Stack } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { LuFolderOpen } from "react-icons/lu";

import { EmptyState } from "@/components/feedback";
import { StudyCard, StudyText } from "@/components/ui";
import type { StudyFileDto, StudyFolderDto } from "@/types/api";
import {
  buildCourseResourceRows,
  type CourseResourceRow as CourseResourceRowType,
} from "@/utils/resources/buildCourseResourceRows";

import { CourseResourcePreviewPanel } from "./CourseResourcePreviewPanel";
import { CourseResourceRow } from "./CourseResourceRow";
import { CourseResourceToolbar } from "./CourseResourceToolbar";

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
  resultCount: (count: number) =>
    count === 1 ? "1 resource" : `${count} resources`,
};

function matchesSearch(row: CourseResourceRowType, searchValue: string) {
  const normalizedSearch = searchValue.trim().toLowerCase();

  if (!normalizedSearch) {
    return true;
  }

  const searchableValues = [
    row.name,
    row.kind,
    row.file?.fileType,
    row.file?.contentType,
    row.file?.uploadedByName,
    row.folder?.courseName,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return searchableValues.includes(normalizedSearch);
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
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);

  const rows = useMemo(
    () =>
      buildCourseResourceRows({
        folders,
        files,
      }),
    [folders, files],
  );

  const filteredRows = useMemo(
    () => rows.filter((row) => matchesSearch(row, searchValue)),
    [rows, searchValue],
  );

  const selectedRow =
    filteredRows.find((row) => row.id === selectedRowId) ?? null;

  const hasResources = rows.length > 0;
  const hasSearchResults = filteredRows.length > 0;

  return (
    <Grid
      templateColumns={{
        base: "1fr",
        xl: "minmax(0, 1.35fr) minmax(320px, 0.85fr)",
      }}
      gap={4}
      alignItems="start"
    >
      <StudyCard h="full">
        <Stack gap={4}>
          <CourseResourceToolbar
            searchValue={searchValue}
            canManageResources={canManageResources}
            isRefreshing={isRefreshing}
            onSearchChange={setSearchValue}
            onRefresh={onRefresh}
            onCreateFolder={onCreateFolder}
            onUploadFile={onUploadFile}
          />

          {!hasResources ? (
            <EmptyState
              size="sm"
              icon={<LuFolderOpen />}
              title={courseResourceBrowserText.emptyTitle}
              description={courseResourceBrowserText.emptyDescription}
            />
          ) : !hasSearchResults ? (
            <EmptyState
              size="sm"
              icon={<LuFolderOpen />}
              title={courseResourceBrowserText.noSearchResultsTitle}
              description={courseResourceBrowserText.noSearchResultsDescription}
            />
          ) : (
            <Stack gap={3}>
              <StudyText variant="subtle" size="xs">
                {courseResourceBrowserText.resultCount(filteredRows.length)}
              </StudyText>

              <Stack gap={2}>
                {filteredRows.map((row) => (
                  <CourseResourceRow
                    key={`${row.kind}-${row.id}`}
                    row={row}
                    selected={row.id === selectedRow?.id}
                    onClick={(selectedRow) => setSelectedRowId(selectedRow.id)}
                  />
                ))}
              </Stack>
            </Stack>
          )}
        </Stack>
      </StudyCard>

      <CourseResourcePreviewPanel
        selectedRow={selectedRow}
        onDownloadFile={onDownloadFile}
      />
    </Grid>
  );
}