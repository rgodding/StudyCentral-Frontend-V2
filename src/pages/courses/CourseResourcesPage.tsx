import { Stack } from "@chakra-ui/react";
import { LuFolderOpen } from "react-icons/lu";

import { CourseResourceBrowser } from "@/components/courses";
import { ErrorState, LoadingState } from "@/components/feedback";
import { StudySectionHeader } from "@/components/ui";
import { useCourseResources, useFileDownload, useRequiredParam } from "@/hooks";
import type { Guid } from "@/types/api";
import type { CourseResourceRow } from "@/utils/resources/buildCourseResourceRows";

const courseResourcesPageText = {
  title: "Resources",
  loading: "Loading resources...",
  errorTitle: "Could not load resources.",
};

export function CourseResourcesPage() {
  const courseId = useRequiredParam("courseId") as Guid;
  const { downloadFile } = useFileDownload();

  const {
    data: content,
    isLoading,
    isError,
    isFetching,
    refetch,
    canManageResources,
  } = useCourseResources(courseId);

  function handleDownloadFile(row: CourseResourceRow) {
    if (!row.file) {
      return;
    }

    void downloadFile(row.file.id, row.file.fileName ?? undefined);
  }

  if (isLoading) {
    return <LoadingState text={courseResourcesPageText.loading} />;
  }

  if (isError || !content) {
    return <ErrorState title={courseResourcesPageText.errorTitle} />;
  }

  return (
    <Stack gap={6}>
      <StudySectionHeader
        title={courseResourcesPageText.title}
        titleSize="header"
        icon={<LuFolderOpen />}
      />

      <CourseResourceBrowser
        folders={content.folders}
        files={content.files}
        canManageResources={canManageResources}
        isRefreshing={isFetching}
        onRefresh={() => void refetch()}
        onDownloadFile={handleDownloadFile}
      />
    </Stack>
  );
}