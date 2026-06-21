import { apiClient } from "@/api/axiosClient";
import { apiRoutes } from "@/config/apiRoutes";

export const fileApi = {
  getDownloadUrl: (fileId: string): string => {
    return `${apiClient.defaults.baseURL}${apiRoutes.files.download(fileId)}`;
  },

  getPreviewUrl: (fileId: string): string => {
    return `${apiClient.defaults.baseURL}${apiRoutes.files.preview(fileId)}`;
  },

  getImageUrl: (blobName: string): string => {
    return `${apiClient.defaults.baseURL}${apiRoutes.images.byBlobName(blobName)}`;
  },
};