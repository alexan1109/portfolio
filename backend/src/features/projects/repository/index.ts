import { db, type DB } from "../../../db/db";
import type { Project, DbProject } from "../types";
import { buildQuery, parsePaginationParams } from "../utils/filter";
import { fromDb, toDb } from "../mappers";
import type { Result } from "../../../types";
import { ResultHandler } from "../../../lib/result";

export const createProjectRepository = (db: DB) => {
  const exist = async (id: string): Promise<boolean> => {
    const query = db.prepare(
      "SELECT COUNT(*) as count FROM projects WHERE id = ?"
    );
    const data = query.get(id) as { count: number };
    return data.count > 0;
  };

  const getById = async (
    id: string,
    userId: string
  ): Promise<Result<Project>> => {
    try {
      const project = await exist(id);
      if (!project) return ResultHandler.failure("Project not found", "NOT_FOUND");
      const query = db.prepare(
        "SELECT * FROM projects WHERE id = ? AND user_id = ?"
      );
      const data = query.get(id, userId) as DbProject;
      // ? Zod validate as habit
      return ResultHandler.success(fromDb(data));
    } catch (error) {
      return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR");
    }
  };

  const list = async (): Promise<Result<Project[]>> => {
    try {
      const query = db.prepare("SELECT * FROM projects");

      const data = query.all() as DbProject[];
      return ResultHandler.success(data.map((project) => fromDb(project)));
    } catch (error) {
      return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR");
    }
  };

  const listByUser = async (
    userId: string,
    queryParams?: Record<string, string>
  ): Promise<Result<Project[]>> => {
    try {
      const { query: q, filters } = buildQuery(
        ["createdAt"],
        queryParams,
        "SELECT * FROM PROJECTS WHERE user_id = ?"
      );

      const pagination = parsePaginationParams(queryParams);

      const query = db.prepare(q);
      const data = query.all(userId) as DbProject[];
      const projects = data.map((project) => fromDb(project));

      if (pagination) {
        const { page, pageSize, offset } = pagination;

        const countQuery = buildQuery(
          ["*"],
          filters,
          "SELECT COUNT(*) as total from PROJECTS WHERE user_id = ?"
        );

        const { total } = db.prepare(countQuery.query).get(userId) as {
          total: number;
        };

        const totalPages = Math.ceil(total / pageSize);
        const hasNextPage = page < totalPages;
        const hasPreviousPage = page > 1;

        return ResultHandler.success(projects, {
          page,
          offset,
          pages: totalPages,
          hasNextPage,
          hasPreviousPage,
        });
      }

      return ResultHandler.success(projects);
    } catch (error) {
      return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR");
    }
  };

  const create = async (data: Project): Promise<Result<string>> => {
    try {
      const project = toDb(data);

      const query = db.prepare(`
        INSERT INTO projects (id, title, company, description, url, website, userId, email, createdAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      query.run(
        project.id,
        project.title,
        project.company,
        project.description,
        project.url,
        project.website,
        project.user_Id,
        project.email,
        project.createdAt,
      );
      return ResultHandler.success(project.id);
    } catch (error) {
      return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR");
    }
  };

  return { create, list, getById, listByUser };
};

export const projectRepository = createProjectRepository(db);

export type ProjectRepository = ReturnType<typeof createProjectRepository>;