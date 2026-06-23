import { z } from "zod";

export const createAssignmentSchema = z.object({
  name: z
    .string()
    .min(1, "Title is required.")
    .max(100, "Title must be at most 100 characters."),

  description: z
    .string()
    .max(2000, "Description must be at most 2000 characters.")
    .optional(),

  deadline: z
    .string()
    .optional()
    .refine(
      (value) => !value || !Number.isNaN(Date.parse(value)),
      "Deadline must be a valid date.",
    ),

  courseId: z.string().min(1, "Course id is required."),
});

export const createAssignmentSubmitSchema = createAssignmentSchema.transform(
  (values) => ({
    name: values.name,
    description: values.description?.trim() || null,
    deadline: values.deadline?.trim() || null,
    courseId: values.courseId,
  }),
);

export type CreateAssignmentFormValues = z.input<
  typeof createAssignmentSchema
>;

export type CreateAssignmentSubmitValues = z.output<
  typeof createAssignmentSubmitSchema
>;