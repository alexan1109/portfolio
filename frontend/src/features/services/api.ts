import { ofetch } from "ofetch";
import { endpoints } from "@/src/config/urls/endpoints";
import {schema } from "@/services/api"
import { projectsSchema } from "../helpers/validate";
import type {Id } from "@/src/types/Id";

const url = endpoints.projects;

const remove = async (id: Id) => {
    try {
      await ofetch(`${endpoints}/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const list = async () => {
    try {
      const projects = await ofetch(url);
      console.log(projectsSchema.safeParse(projects.data)); 
      return projectsSchema.parse(projects.data);

    } catch (error) {
      console.error(error);
    }
  };

  