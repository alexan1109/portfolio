import { ofetch } from "ofetch";
import Projects from "../components/Projects";
import useProjects from "../hooks/useProjects";
import {useState, useEffect, FormEvent, useCallback} from 'react';
import type { Action, HandleMutation, ProjectType } from "../types/types"


function ProjectPage () {
  const { add, remove, status, get, data, error } = useProjects();
  const {projects = []} = data;

  const handleProjectMutation = (action: Action, data: Partial<ProjectType>) => {
    const {id, ...project} = data;

    switch (action) {
      case "add":
        add(project);
        break;
      case "remove":
        remove(id);
        break;
      default:
        break;
    }
  };

  if (status.loading) return <p>Laster ...</p>;
  if (status.error) return <p className="error">{error}</p>;

return (
  <>
    <Projects projects={projects} handleProjectMutation={handleProjectMutation} />
  </>
)
};



export default ProjectPage;

