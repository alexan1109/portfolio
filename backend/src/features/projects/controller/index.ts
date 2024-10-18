import { Hono } from "hono";
import { projectService, type ProjectService } from "../service";
import { errorResponse } from "../../../lib/error";

import type { HonoEnv } from "../../../index";
import type { Data } from "../../../types";
import type { User } from "../../users/types/users";

import { authenticate } from "../../users/utils/middleware";

export const createProjectController = (projectService: ProjectService) => {
  const app = new Hono<HonoEnv>();

  app.use(authenticate());

  app.get("/", async (c) => {
    const user = c.get("user") as User;
    const query = c.req.query();
    const result = await projectService.listByUser(user.id, query);

    if (!result.success)
      return errorResponse(c, result.error.code, result.error.message);
    return c.json(result);
  });

  app.get("/:id", async (c) => {
    const user = c.get("user") as User;
    const id = c.req.param("id");
    const result = await projectService.getById(id, user.id);
    if (!result.success)
      return errorResponse(c, result.error.code, result.error.message);
    return c.json(result);
  });

  app.post("/", async (c) => {
    const user = c.get("user") as User;
    const data = await c.req.json();
    const result = await projectService.create({
      ...data,
      userId: user.id,
    });
    if (!result.success)
      return errorResponse(c, result.error.code, result.error.message);
    return c.json<Data<string>>(result, { status: 201 });
  });

  return app;
};

export const projectController = createProjectController(projectService);