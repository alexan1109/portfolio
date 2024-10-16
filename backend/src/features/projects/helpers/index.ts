import { z } from "zod";
import { CreateProjectDto, DbProject } from "../types";

const projectBaseSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  company: z.string(),
  description: z.string(),
  url: z.string(),
  website: z.string(),
  userId: z.string().uuid(),
  email: z.string(),

});

const dateFieldsSchema = z.object({
  createdAt: z.coerce.date(),
});

export const projectSchema = projectBaseSchema.extend({
  ...dateFieldsSchema.shape,
  //streak: streakSchema,
});

export const dbProjectSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  company: z.string(),
  description: z.string(),
  url: z.string(),
  website: z.string(),
  user_id: z.string().uuid(),
  email: z.string(),
  createdAt: z.string(),

});

export const createProjectDtoSchema = projectBaseSchema.pick({
  title: true,
  company: true,
  description: true,
  url: true,
  website: true,
  userId: true,
  email: true,
});


export type Project = z.infer<typeof projectSchema>;
export type DbHabit = z.infer<typeof dbProjectSchema>;
export type CreateHabitDto = z.infer<typeof createProjectDtoSchema>;

export const validateProject = (data: unknown): Project => projectSchema.parse(data);

export const validateDbProject = (data: unknown): DbProject =>
  dbProjectSchema.parse(data);

export const validateCreateProjectDto = (data: unknown): CreateProjectDto =>
  createProjectDtoSchema.parse(data);

export const dbProjectToProject = (dbProject: DbHabit): Project => {
  const project: Project = {
    ...dbProject,
    createdAt: new Date(dbProject.createdAt),
    userId: dbProject.user_id,
  };
  return validateProject(project);
};

export const projectToDbProject = (project: Project): DbProject => {
  const dbProject: DbProject = {
    id: project.id,
    title: project.title,
    company: project.company,
    description: project.description,
    url: project.url,
    website: project.website,
    userId: project.userId,
    email: project.email,
    createdAt: project.createdAt.toISOString(),
  };
  return validateDbProject(dbProject);
};