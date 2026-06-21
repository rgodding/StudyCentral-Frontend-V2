import { imageApi } from "@/api/imageApi";

export function useImageUrl(blobName?: string | null) {
  if (!blobName) return undefined;

  return imageApi.getImageUrl(blobName);
}