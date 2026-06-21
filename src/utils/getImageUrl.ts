export function getImageUrl(blobName?: string | null) {
  if (!blobName) return undefined;

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  return `${baseUrl}/api/Image/${blobName}`;
}