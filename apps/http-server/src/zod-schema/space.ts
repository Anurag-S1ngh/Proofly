import { z } from "zod";

export const createSpaceSchema = z.object({
  testimonialTitle: z.string({
    required_error: "Title is required",
  }),
  testimonialDescription: z.string({
    required_error: "Description is required",
  }),
  question: z.string({
    required_error: "Question is required",
  }),
  projectName: z.string({
    required_error: "Project name is required",
  }),
});
