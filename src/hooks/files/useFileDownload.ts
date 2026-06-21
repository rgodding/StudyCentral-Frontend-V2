import { fileApi } from "@/api/fileApi";

export function useFileDownload() {
  async function downloadFile(fileId: string, fileName?: string) {
    const blob = await fileApi.downloadFile(fileId);

    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = fileName || "download";
    document.body.appendChild(anchor);
    anchor.click();

    anchor.remove();
    window.URL.revokeObjectURL(url);
  }

  return { downloadFile };
}