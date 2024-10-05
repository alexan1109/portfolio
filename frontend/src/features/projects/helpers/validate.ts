import { z } from "zod";

export { projectSchema, projectsSchema };

const projectSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  company: z.string(),
  description: z.string(),
  url: z.string(),
  categories: z.array(z.string()),
  website: z.string(),
  createdAt: z.string(),
  updatedAt: z.string().datetime(),
});

const projectsSchema = z.array(projectSchema);

export function validateProject(data: unknown) {
  return projectSchema.safeParse(data);
}