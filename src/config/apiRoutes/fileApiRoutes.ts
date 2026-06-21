import { apiBaseRoutes } from "./apiBaseRoutes";

export const fileApiRoutes = {
  download: (fileId: string) => `${apiBaseRoutes.file}/${fileId}/download`,

  preview: (fileId: string) => `${apiBaseRoutes.file}/${fileId}/preview`,
} as const;