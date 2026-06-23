import { z } from "zod";

export const createAnnouncementSchema = z.object({
  name: z
    .string()
    .min(1, "Title is required.")
    .max(100, "Title must be at most 100 characters."),

  content: z
    .string()
    .min(1, "Content is required.")
    .max(5000, "Content must be at most 5000 characters."),

  courseId: z.string().min(1, "Course id is required."),
});

export type CreateAnnouncementFormValues = z.input<
  typeof createAnnouncementSchema
>;

export type CreateAnnouncementSubmitValues = z.output<
  typeof createAnnouncementSchema
>;