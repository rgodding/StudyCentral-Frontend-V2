import { apiClient } from "@/api/axiosClient";
import { apiRoutes } from "@/config/apiRoutes";

function getAbsoluteApiUrl(path: string) {
  return `${apiClient.defaults.baseURL}${path}`;
}

export const fileApi = {
  // Gets file blob from /download endpoint
  downloadFile: async (fileId: string): Promise<Blob> => {
    const response = await apiClient.get<Blob>(
      apiRoutes.files.download(fileId),
      {
        responseType: "blob",
      },
    );

    return response.data;
  },

  // Gets file blob from /preview endpoint
  previewFile: async (fileId: string): Promise<Blob> => {
    const response = await apiClient.get<Blob>(
      apiRoutes.files.preview(fileId),
      {
        responseType: "blob",
      },
    );

    return response.data;
  },
  // Gets URL to /download endpoint
  getDownloadUrl: (fileId: string): string => {
    return getAbsoluteApiUrl(apiRoutes.files.download(fileId));
  },

  // Gets URL to /preview endpoint
  getPreviewUrl: (fileId: string): string => {
    return getAbsoluteApiUrl(apiRoutes.files.preview(fileId));
  },
};