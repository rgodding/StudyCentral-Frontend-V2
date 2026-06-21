import { apiBaseRoutes } from "./apiBaseRoutes";

export const imageApiRoutes = {
  byBlobName: (blobName: string) => `${apiBaseRoutes.image}/${blobName}`,
} as const;