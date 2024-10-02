import { ofetch } from "ofetch";

import { endpoints } from "../../../config/urls";
import { projectsSchema } from "../helpers/validate";
import type { ProjectType } from "../types/types";

const url = endpoints.projects;

const remove = async (id: number) => {
  try {
    await ofetch(`${url}/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const create = async (data: Pick<ProjectType, "title">) => {
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
    const projects = await ofetch(url);
    // console.log(habitsSchema.safeParse(habits.data));
    return projectsSchema.parse(projects.data);
  } catch (error) {
    console.error(error);
  }
};

export default { remove, create, list };

  