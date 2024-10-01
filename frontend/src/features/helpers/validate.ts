import { z } from "zod";

export { projectSchema, projectsSchema };

const projectSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  company: z.string(),
  description: z.string(),
  url: z.string(),
  createdAt: z.string().datetime(),
});

const projectsSchema = z.array(projectSchema);