import type { Entries } from "../../../types";
import type { DbProject, Project } from "../types";

import { createId } from "../../../lib/id";

export const fromDb = (project: DbProject) => {
  return {
    id: project.id,
    title: project.title,
    company: project.company,
    description: project.description,
    url: project.url,
    website: project.website,
    userId: project.user_Id,
    email: project.email,
    createdAt: new Date(project.createdAt),
  };
};

export const createProject = (project: Partial<Project>): Project => {
  return {
    id: project.id ?? createId(),
    title: project.title ?? "",
    company: project.company ?? "",
    description: project.description ?? "",
    url: project.url ?? "",
    website: project.website ?? "",
    userId: project.userId ?? "",
    email: project.email ?? "",
    createdAt: project.createdAt ?? new Date(),
  };
};

export const toDb = (data: Project) => {
  const project = createProject(data);
  const entries = Object.entries(project) as Entries<Project>;
  const dbProject = {} as DbProject;

  for (const entry of entries) {
    if (!entry) continue;
    const [key, value] = entry;
    switch (key) {
      case "id":
        dbProject.id = value;
        break;
      case "title":
        dbProject.title = value;
        break;
      case "company":
        dbProject.company = value;
        break;
      case "description":
        dbProject.description = value;
        break;
        case "url":
        dbProject.url = value;
        break;
      case "website":
        dbProject.website = value;
        break;
        case "userId":
        dbProject.user_Id = value;
        break;
      case "email":
        dbProject.email = value;
        break;
      case "createdAt":
        dbProject.createdAt = value?.toISOString();
        break;
      default:
        break;
    }
  }
  return dbProject;
};