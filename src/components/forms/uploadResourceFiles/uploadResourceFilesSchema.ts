import { z } from "zod";

export const uploadResourceFilesSchema = z.object({
  altText: z
    .string()
    .trim()
    .max(250, "Alt text cannot exceed 250 characters.")
    .optional()
    .or(z.literal("")),
});

export type UploadResourceFilesFormData = z.infer<
  typeof uploadResourceFilesSchema
>;