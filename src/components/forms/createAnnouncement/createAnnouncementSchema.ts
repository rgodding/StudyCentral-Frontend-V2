import { z } from "zod";

export const createAnnouncementSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Title is required.")
    .max(100, "Title cannot exceed 100 characters."),

  content: z
    .string()
    .trim()
    .min(1, "Content is required.")
    .max(5000, "Content cannot exceed 5000 characters."),
});

export type CreateAnnouncementFormData = z.infer<
  typeof createAnnouncementSchema
>;