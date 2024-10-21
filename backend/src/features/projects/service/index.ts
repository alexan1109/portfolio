import type { Result } from "../../../types";
import { projectRepository, type ProjectRepository } from "../repository";
import type { CreateProjectDto, Project } from "../types";
import { ResultHandler } from "../../../lib/result";
import { createProject } from "../mappers";
import { isValidProject } from "../utils/validator";

export const createProjectService = (
  projectRepository: ProjectRepository,
) => {
  const getById = async (
    id: string,
    user_id: string
  ): Promise<Result<Project | undefined>> => {
    return projectRepository.getById(id, user_id);
  };

  const list = async (): Promise<Result<Project[]>> => {
    return projectRepository.list();
  };

  const listByUser = async (
    userId: string,
    query?: Record<string, string>
  ): Promise<Result<Project[]>> => {
    return projectRepository.listByUser(userId, query);
  };

  const create = async (data: CreateProjectDto): Promise<Result<string>> => {
    const project = createProject(data);

    if (!isValidProject(project)) {
      return ResultHandler.failure("Invalid project data", "BAD_REQUEST");
    }
    return projectRepository.create(project);
  };

  return {
    list,
    create,
    getById,
    listByUser,
  };
};

export const projectService = createProjectService(projectRepository);

export type ProjectService = ReturnType<typeof createProjectService>;