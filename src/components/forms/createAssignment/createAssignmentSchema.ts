import { z } from "zod";

export const createAssignmentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required.")
    .max(100, "Name cannot exceed 100 characters."),

  description: z
    .string()
    .trim()
    .max(2000, "Description cannot exceed 2000 characters.")
    .optional()
    .or(z.literal("")),

  deadline: z.string().optional().or(z.literal("")),
});

export type CreateAssignmentFormData = z.infer<typeof createAssignmentSchema>;