import { z } from "zod";

export const createResourceFolderSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Folder name is required.")
    .max(100, "Folder name cannot exceed 100 characters."),
});

export type CreateResourceFolderFormData = z.infer<
  typeof createResourceFolderSchema
>;