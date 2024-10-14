import { ofetch } from "ofetch";

import { endpoints } from "../../../config/urls";
import { projectsSchema, validateProject } from "../helpers/validate";
import type { ProjectProps } from "../types/types";

const url = endpoints.projects;

const remove = async (id: string) => {
  try {
    await ofetch(`${url}/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const create = async (data: Pick<ProjectProps, "title" | "company" | "description" | "url" | "categories" | "website" | "userId" | "email" | "createdAt">) => {
  try {
    const createdProject = await ofetch(url, {
      method: "POST",
      body: data,
    });

    return createdProject;
  } catch (error) {
    console.error(error);
  }
};

const list = async () => {
  try {
    const projects = await ofetch(url, {
      credentials: "include",
    });
    // console.log(habitsSchema.safeParse(habits.data));
    return validateProject(projects.data);
  } catch (error) {
    console.error(error);
  }
};


export default { remove, create, list };

  