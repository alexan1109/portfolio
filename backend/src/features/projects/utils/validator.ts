import { Entries } from "../../../types";
import { createProject } from "../mappers";
import { Project } from "../types";

export const isValidProject = (data: Partial<Project>): boolean => {
    const project = createProject(data);
  
    return (Object.entries(project) as Entries<Partial<Project>>).every((entry) => {
      if (!entry) return false;
  
      const [key, value] = entry;
  
      switch (key) {
        case "title":
          return value && value.length > 3;
        // case "categories":
        //   return value && value.length > 0;
        case "userId":
          return !!value;
        default:
          return true;
      }
    });
  };