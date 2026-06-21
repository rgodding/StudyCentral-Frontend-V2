import { apiClient } from "@/api/axiosClient";
import { apiRoutes } from "@/config/apiRoutes";

function getAbsoluteApiUrl(path: string) {
  return `${apiClient.defaults.baseURL}${path}`;
}

export const imageApi = {
  getImage: async (blobName: string): Promise<Blob> => {
    const response = await apiClient.get<Blob>(
      apiRoutes.images.byBlobName(blobName),
      {
        responseType: "blob",
      },
    );

    return response.data;
  },

  getImageUrl: (blobName: string): string => {
    return getAbsoluteApiUrl(apiRoutes.images.byBlobName(blobName));
  },
};