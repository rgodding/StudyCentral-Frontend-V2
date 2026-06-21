import { fileApi } from "@/api/fileApi";

type PreviewTarget = "_blank" | "_self";

export function useFilePreview() {
  function openFilePreview(fileId: string, target: PreviewTarget = "_blank") {
    const previewUrl = fileApi.getPreviewUrl(fileId);

    window.open(previewUrl, target, "noopener,noreferrer");
  }

  return { openFilePreview };
}